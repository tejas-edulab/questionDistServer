import { NextFunction, Response, Request } from "express";
import QuestionBankUtils from "./questionBank.utils";
import sendSuccessResponse from "../../../middlewares/success-handler";
import { IRoles } from "../user/user.types";

export default class QuestionBankController {

    static async createQuestionBank(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user.id
            const newData = req.body.map((value) => ({ ...value, userId }));
            const result = await QuestionBankUtils.saveQuestionBank(newData)
            if (result) sendSuccessResponse(req, res, { message: "Successfully stored" })
        } catch (error) {
            next(error)
        }

    }

    static async getQuestionBank(req: Request, res: Response, next: NextFunction) {
        try {
            const roles = req.user.role;
            if (roles.length === 1 && roles.includes(IRoles.SME)) {
                const data = await QuestionBankUtils.getQuestionBank(req.user.id);
                sendSuccessResponse(req, res, { data })
            } else {
                sendSuccessResponse(req, res, { message: "Yet to be implemented" })
            }
        } catch (error) {
            next(error)
        }
    }
}