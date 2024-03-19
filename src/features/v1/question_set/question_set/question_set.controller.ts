import { NextFunction, Request, Response } from 'express';
import QuestionSetUtils from './question_set.utils';
import sendSuccessResponse from '../../../../middlewares/success-handler';


export default class QuestionSetController {

    static async createQuestionSet(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body
            await QuestionSetUtils.createQuestionSet(body)
            sendSuccessResponse(req, res, { data: "Successfully Saved" })
        } catch (error) {
            next(error)
        }
    }

} 