import sendSuccessResponse from "../../../utils/success-handler";
import { NextFunction, Response, Request } from "express";
import QuestionBankModuleUtils from "./questionBankModule.utils";

export default class QuestionBankModuleController {

    static async createQuestionBankModule(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            const userId = user.id
            const data = await QuestionBankModuleUtils.saveQuestionBankModule({ ...req.body, userId: userId });
            if (data) sendSuccessResponse(req, res, { message: "Successfully stored" })
        } catch (error) {
            next(error)
        }
    }
}