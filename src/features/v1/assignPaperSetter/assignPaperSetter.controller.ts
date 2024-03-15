import { NextFunction, Request, Response } from 'express';
import AssignPaperSetterUtils from './assignPaperetter.utils';

export default class AssignPaperSetterController {

    static async createAssignPaperSetter(req: Request, res: Response, next: NextFunction) {
        try {

            const data = await AssignPaperSetterUtils.saveAssignPaperSetter(req.body);
            res.status(201).json({
                message: 'SME assigned successfully',
                data,
                error: null
            });
        } catch (error) {
            next(error);
        }
    }

    static async getAssignPaperSetter(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await AssignPaperSetterUtils.getAssignPaperSetter();
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