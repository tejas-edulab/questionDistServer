import { NextFunction, Request, Response } from 'express';
import AssignModeratorUtils from './assignModerator.utils';


export default class AssignModeratorController {

    static async createAssignModerator(req: Request, res: Response, next: NextFunction) {
        try {

            console.log("req.body", req.body);

            const subjects = req.body.subjectIds;

            // check if alredy assigned to the user
            const assignData = await AssignModeratorUtils.getAssignedModeratorByUserIdAndExamId(req.body.userId, req.body.examId);

            if (assignData && assignData.length > 0) return res.status(400).json({ error: "Already assigned to the user, for the selected exam", data: null, message: null });

            if (subjects && subjects.length > 0) {
                const promises = subjects.map(async (subject: any) => {
                    const userId = req.body.userId;
                    const subjectId = subject.id;
                    const examId = req.body.examId;
                    const newData = { userId, subjectId, examId };
                    return await AssignModeratorUtils.saveAssignModerator(newData);
                });

                await Promise.all(promises);

                // If all saves are successful, send a success response
                res.status(200).json({ message: "Assign Paper Setter operation completed successfully", data: promises, error: null });
            } else {
                // If no subjects are provided, send a bad request response
                res.status(400).json({ error: "No subjects provided for assignment", data: null, message: null });
            }

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

    static async updateAssignModerator(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;
            const backup = []
            try {
                if (body.subjectIds.length > 0) {
                    const promises = body.subjectIds.map(async (subject: any) => {
                        const userId = body.userId;
                        const subjectId = subject.id;
                        const examId = body.examId
                        const newData = { userId, subjectId, examId };
                        await AssignModeratorUtils.deleteAssignModerator(userId, examId);
                        return await AssignModeratorUtils.saveAssignModerator(newData);

                    });

                    await Promise.all(promises);

                    // If all saves are successful, send a success response
                    res.status(200).json({ message: "Assign Moderator operation completed successfully" });
                }
            } catch (err) {
                backup.push(backup)
            }
        } catch (error) {
            next(error);
        }

    }

    static async getAssignModeratorByUserIdAndExamId(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId;
            const examId = req.params.examId;
            const data = await AssignModeratorUtils.getAssignModeratorByUserIdAndExamId(Number(userId), Number(examId));
            res.status(200).json({
                message: 'Paper Setter assigned get successfully',
                data: data[0],
                error: null
            });

        } catch (err) {
            next(err)
        }
    }

} 