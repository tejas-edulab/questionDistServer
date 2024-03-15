import { NextFunction, Request, Response } from 'express';
import AssignModeratorUtils from './assignModerator.utils';


export default class AssignModeratorController {

    static async createAssignModerator(req: Request, res: Response, next: NextFunction) {
        try {

            const data = await AssignModeratorUtils.saveAssignModerator(req.body);
            res.status(201).json({
                message: 'Moderator assigned successfully',
                data,
                error: null
            });
        } catch (error) {
            next(error);
        }
    }

    static async getAssignModerator(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await AssignModeratorUtils.getAssignModerator();
            res.status(200).json({
                message: 'Moderator assigned successfully',
                data,
                error: null
            });
        } catch (error) {
            next(error);
        }
    }

} 