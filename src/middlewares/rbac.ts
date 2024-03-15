import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IRoles } from '../features/v1/user/user.types';
import keycloak from './keycloak';
import ApiError from '../utils/api-error';
import logger from '../utils/winston';
import UserRepository from '../features/v1/user/user.util';
import { User } from '../features/v1/user/user.model';

/**
 * Middleware for role-based access control (RBAC) using Keycloak.
 * Checks if user has proper keycloak token
 * If yes decodes the token
 * Get the userId attribute and roles from the token
 * From the userId it fetches the userDetails
 * Requires the user to have at least one of the specified roles.
 * If the user does not have the required roles, returns a 403 Forbidden response.
 * If an error occurs during protection or role checking, passes the error to the next error-handling middleware.
 *
 * @param roles - Array of roles required for access
 */


// Extend the Request interface to include the user property
declare module 'express' {
    interface Request {
        user?: User;
    }
}

const Rbac = (roles: IRoles[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Protect the route using Keycloak middleware
        await new Promise<void>((resolve, reject) => {
            keycloak.protect()(req, res, (err) => {
                if (err) {
                    reject(err); // Reject the promise with the error
                } else {
                    resolve(); // Resolve the promise if protection succeeds
                }
            });
        });

        
        // Extract the bearer token from the request headers
        const token = req.headers.authorization?.substring(7);
        if (!token) return next(ApiError.forbidden());

        // Decode the token and extract the user roles
        const userInfo = jwt.decode(token) as JwtPayload;

        // Get the client ID from environment variables (adjust as needed)
        const keycloakClientId = process.env.KEYCLOAK_CLIENTID;
        if (!keycloakClientId) throw Error('Environment: KEYCLOAK_CLIENTID is not defined');


        console.log(userInfo.resource_access)
        // Retrieve the user roles from the decoded token
        const userRoles = userInfo.resource_access[keycloakClientId].roles;

        // Get the User Info
        // if (!userInfo[keycloakClientId]) return next(ApiError.customError(500, 'UserId not assigned to this token.'));

        // Get userInfo
        const userId = userInfo.sub ? userInfo.sub : '';
        const user = await UserRepository.findUserByUserId(userId);

        // Adding it in req.user
        if (user) req.user = user;

        // Check if the user has any of the required roles
        const hasRole = roles.some((role) => userRoles.includes(role));

        if (hasRole) {
            return next(); // Continue to the next middleware
        }

        return next(ApiError.forbidden()); // User does not have the required roles
    } catch (error) {
        logger.error(error);
        return next(error); // Pass the error to the next error-handling middleware
    }
};

export default Rbac;
