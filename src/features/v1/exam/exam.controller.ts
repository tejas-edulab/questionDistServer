import { NextFunction, Request, Response } from 'express';
import ExamRepository from './exam.util';
import sendSuccessResponse from '../../../middlewares/success-handler';
import ExamSubjectRepository from './exam-subject.util'
import { examSchema } from './exam.validator';

export default class ExamController {

    public static async getExam(req: Request, res: Response, next: NextFunction) {
        try {
           const exams = await ExamRepository.fetchExam()
           sendSuccessResponse(req, res, {exams})
        } catch (error) {
            next(error);
        }
    }

    public static async assignedExam(req: Request, res: Response, next: NextFunction) {
        try {
           const exams = await ExamRepository.fetchAssignedExam()
           sendSuccessResponse(req, res, {exams})
        } catch (error) {
            next(error);
        }
    }

    public static async getSubject(req: Request, res: Response, next: NextFunction) {
        try {
            const {examId} = await examSchema.validateAsync(req.query)
            const subjects = await ExamSubjectRepository.fetchSubjects(examId);
            sendSuccessResponse(req,res,{subjects})
        } catch (error) {
            next(error);
        }
    }

} 