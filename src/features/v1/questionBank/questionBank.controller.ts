import { NextFunction, Response, Request } from "express";
import QuestionBankUtils from "./questionBank.utils";
import sendSuccessResponse from "../../../middlewares/success-handler";
import { IRoles } from "../user/user.types";
import UserRepository from "../user/user.util";
import ApiError from "../../../utils/api-error";
import SubjectRepository from "../subject/subject.util";
import UserRoleRepository from "../userRole/user-role.utils";

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
            const id = req.user.id
            const roles = req.user.role
            console.log(roles)
            if (Array.isArray(roles)) {
                const isSME = roles.filter((obj: any) => obj.roleName === IRoles.SME);
                if (isSME && roles.length === 1) {
                    const data = await QuestionBankUtils.getQuestionBank(id);
                    sendSuccessResponse(req, res, { data });
                } else {
                    sendSuccessResponse(req, res, { message: "Yet to be implemented" });
                }
            } else {
                sendSuccessResponse(req, res, { message: "Roles not found or invalid" });
            }

        } catch (error) {
            next(error)
        }
    }

    static async getQuestionBankById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const data = await QuestionBankUtils.getQuestionBankBySubject(Number(id));
            sendSuccessResponse(req, res, { data });
        } catch (error) {
            next(error)
        }
    }
}