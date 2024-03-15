import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import logger from "../utils/winston";
import ActivityTrackerRepository from "../features/v1/actvity_tracker/activity_tracker.utils";

const activityLogger = async (req: Request, res: Response, next: NextFunction) => {
    
    // Check if the request method is not GET
    if (req.method !== 'GET') {
      const token = req.headers.authorization?.substring(7);
      const ip = req.ip || req.socket.remoteAddress || '-';
      const macAddress = '';
      const userInfo = token ? (jwt.decode(token) as JwtPayload) : null;
      const userId = userInfo?.sub || 'unauthenticated';
      const userEmail = userInfo?.email || null;
      const firstName = userInfo?.given_name || null;
      const lastName = userInfo?.family_name || null;
  
      res.on('finish', async () => {
        try {
          const activityData = {
            activity: res.statusMessage ? res.statusMessage.split(':')[0] : 'Unspecified Activity',
            description: res.statusMessage ? `${res.statusMessage.split(':')[1]} by ${userInfo?.email}` : 'No Description Available',
            ipAddress: ip,
            userId,
            url: req.originalUrl,
            status: res.statusCode,
            method: req.method,
            requestBody: JSON.stringify(req.body),
            macAddress,
            userEmail,
            firstName,
            lastName,
  
          };
          await ActivityTrackerRepository.logActivity(activityData);
        } catch (e) {
          logger.error(e);
        }
      });
    }
    return next();
  };
  
  export default activityLogger;