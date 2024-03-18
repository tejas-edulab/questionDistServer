import { NextFunction, Request, Response } from 'express';
import AssignPaperSetterUtils from './assignPaperetter.utils';

export default class AssignPaperSetterController {

    static async createAssignPaperSetter(req: Request, res: Response, next: NextFunction) {
        try {
            console.log("req.body", req.body);

            const subjects = req.body.subjectIds;

            // check if alredy assigned to the user
            const assignData = await AssignPaperSetterUtils.getAssignPaperSetterByUserIdAndExamId(req.body.userId, req.body.examId);

            if (assignData && assignData.length > 0) return res.status(400).json({ error: "Already assigned to the user, for the selected exam", data: null, message: null });

            if (subjects && subjects.length > 0) {
                const promises = subjects.map(async (subject: any) => {
                    const userId = req.body.userId;
                    const subjectId = subject.id;
                    const examId = req.body.examId;
                    const newData = { userId, subjectId, examId };
                    return await AssignPaperSetterUtils.saveAssignPaperSetter(newData);
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

    static async getAssignPaperSetterByUserIdAndExamId(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId;
            const examId = req.params.examId;
            const data = await AssignPaperSetterUtils.getAssignPaperSetterByUserIdAndExamId(Number(userId),Number(examId));
            res.status(200).json({
                message: 'Paper Setter assigned get successfully',
                data: data,
                error: null
            });
    
    }catch(err){
        next(err)
    }
}
    static async updateAssignPaperSetter(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;
            if (body.subjects.length > 0) {
                const promises = body.subjects.map(async (subject: any) => {
                    const userId = body.userId;
                    const subjectId = subject.id;
                    return await AssignPaperSetterUtils.updateAssignPaperSetter(userId, subjectId);
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