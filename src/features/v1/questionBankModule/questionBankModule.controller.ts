import sendSuccessResponse from "../../../utils/success-handler";
import { NextFunction, Response, Request } from "express";
import QuestionBankModuleUtils from "./questionBankModule.utils";
import { IRoles } from "../user/user.types";

export default class QuestionBankModuleController {

    static async createQuestionBankModule(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            const userId = user.id
            console.log("req.body", req.body);

            const data = await QuestionBankModuleUtils.saveQuestionBankModule({ ...req.body, userId: userId, minMarks: Number(req.body.minMarks), maxMarks: Number(req.body.maxMarks) })
            if (data) sendSuccessResponse(req, res, { message: "Successfully stored" })
        } catch (error) {
            next(error)
        }
    }

    static async getQuestionBankModule(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            const roles = user.role;

            console.log("req.body", user);

            if (Array.isArray(roles)) {
                const checkRoles = roles.filter((obj: any) => obj.roleName === IRoles.SUPER_ADMIN || obj.roleName === IRoles.COE_HEAD, IRoles.COE_STAFF);

                if (checkRoles && checkRoles.length > 0) {
                    const data = await QuestionBankModuleUtils.getAllQuestionBankModule(Number(req.query.subjectId));
                    sendSuccessResponse(req, res, { data });
                } else {
                    console.log("req.query", req.query.subjectId);

                    const data = await QuestionBankModuleUtils.getQuestionBankModuleByUserId(user.id, Number(req.query.subjectId))
                    sendSuccessResponse(req, res, { data });
                }
            } else {
                sendSuccessResponse(req, res, { data: [] });
            }

        } catch (error) {
            next(error)
        }
    }
}