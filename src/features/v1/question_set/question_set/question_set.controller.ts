import { NextFunction, Request, Response } from 'express';
import QuestionSetUtils from './question_set.utils';
import sendSuccessResponse from '../../../../middlewares/success-handler';
import { IRoles } from '../../user/user.types';


export default class QuestionSetController {

    static async createQuestionSet(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user.id
            const body = req.body
            const newData = { ...body, userId: userId }
            await QuestionSetUtils.createQuestionSet(newData)
            sendSuccessResponse(req, res, { data: "Successfully Saved" })
        } catch (error) {
            next(error)
        }
    }

    static async getQuestionSet(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.user.id
            const roles = req.user.role

            if (Array.isArray(roles)) {
                const checkRole = roles.filter((obj: any) => obj.roleName === IRoles.PAPER_SETTER || obj.roleName === IRoles.SUPER_ADMIN || IRoles.COE_HEAD);
                console.log("checkRole", checkRole);

                if (checkRole && checkRole.length > 0) {
                    // check if role includes SUPER_ADMIN
                    if (checkRole.some((obj: any) => obj.roleName === IRoles.SUPER_ADMIN || obj.roleName === IRoles.COE_HEAD)) {
                        const data = await QuestionSetUtils.getQuestionSet();
                        sendSuccessResponse(req, res, { data });
                    } else {
                        console.log("req.query", req.query.examId, req.query.subjectId);

                        const data = await QuestionSetUtils.getQuestionSetByUserIdExamAndSubjectId(Number(id), Number(req.query.examId), Number(req.query.subjectId));
                        sendSuccessResponse(req, res, { data });
                    }
                } else {
                    sendSuccessResponse(req, res, { data: [] });
                }
            } else {
                sendSuccessResponse(req, res, { data: [] });

            }
            const data = await QuestionSetUtils.getQuestionSet()
            sendSuccessResponse(req, res, { data })
        } catch (error) {
            next(error)
        }
    }

    static async getQuestionSetById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const data = await QuestionSetUtils.getQuestionSetById(Number(id));
            sendSuccessResponse(req, res, { data });
        } catch (error) {
            next(error)
        }
    }
} 