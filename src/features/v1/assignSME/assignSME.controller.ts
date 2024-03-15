import { NextFunction, Request, Response } from 'express';
import AssignMeUtils from './assignSME.utils';


export default class AssignSMEController {

    static async createAssignSME(req: Request, res: Response, next: NextFunction) {
        try {

            const data = await AssignMeUtils.saveAssignSME(req.body);
            res.status(201).json({
                message: 'SME assigned successfully',
                data,
                error: null
            });
        } catch (error) {
            next(error);
        }
    }

    static async getAssignSME(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await AssignMeUtils.getAssignSME();
            res.status(200).json({
                message: 'SME assigned successfully',
                data,
                error: null
            });
        } catch (error) {
            next(error);
        }
    }

} 