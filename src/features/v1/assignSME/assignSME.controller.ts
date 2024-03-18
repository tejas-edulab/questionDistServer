import { NextFunction, Request, Response } from 'express';
import AssignMeUtils from './assignSME.utils';


export default class AssignSMEController {

    static async createAssignSME(req: Request, res: Response, next: NextFunction) {
        try {
            console.log("req.body", req.body);

            const subjects = req.body.subjectId;

            if (subjects && subjects.length > 0) {
                const promises = subjects.map(async (subject: any) => {
                    const userId = req.body.userId;
                    const subjectId = subject.id;
                    return await AssignMeUtils.saveAssignSME({ userId, subjectId });
                });

                await Promise.all(promises);

                // If all saves are successful, send a success response
                res.status(200).json({ message: "Assign SMEs operation completed successfully" });
            } else {
                // If no subjects are provided, send a bad request response
                res.status(400).json({ error: "No subjects provided for assignment" });
            }

        } catch (error) {
            // If there's an error, pass it to the error handling middleware
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

    static async getAssignSMEByUserId(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId;
            const data = await AssignMeUtils.getAssignSMEByUserId(Number(userId));

            res.status(200).json({
                message: 'SME assigned successfully',
                data: data[0],
                error: null
            });
        } catch (error) {
            next(error);
        }
    }

    static async updateAssignSME(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;
            if (body.subjectId.length > 0) {
                const promises = body.subjectId.map(async (subject: any) => {
                    const userId = body.userId;
                    const subjectId = subject.id;
                    return await AssignMeUtils.updateAssignSME(userId, subjectId);
                });

                await Promise.all(promises);

                // If all saves are successful, send a success response
                res.status(200).json({ message: "Assign SMEs operation completed successfully" });
            }
        } catch (error) {
            next(error);
        }
    }

} 