import { NextFunction, Request, Response } from 'express';
import QuestionSetUtils from './question_set.utils';
import sendSuccessResponse from '../../../../middlewares/success-handler';


export default class QuestionSetController {

    static async createQuestionSet(req: Request, res: Response, next: NextFunction) {        
        try {
            const userId = req.user.id
            const body = req.body
            const newData = {...body,userId: userId}
            await QuestionSetUtils.createQuestionSet(newData)
            sendSuccessResponse(req, res, { data: "Successfully Saved" })
        } catch (error) {
            next(error)
        }
    }

} 