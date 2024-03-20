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
            const newData = req.body.map((value) => ({ ...value, userId, modifiedBy: userId }))
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
            if (Array.isArray(roles)) {
                const checkRole = roles.filter((obj: any) => obj.roleName === IRoles.SME || obj.roleName === IRoles.SUPER_ADMIN);
                console.log("checkRole", checkRole);

                if (checkRole && checkRole.length > 0) {
                    // check if role includes SUPER_ADMIN
                    if (checkRole.some((obj: any) => obj.roleName === IRoles.SUPER_ADMIN)) {
                        const data = await QuestionBankUtils.getAllQuestionBank();
                        sendSuccessResponse(req, res, { data });
                    } else {
                        const data = await QuestionBankUtils.getQuestionBank(id);
                        sendSuccessResponse(req, res, { data });
                    }
                } else {
                    sendSuccessResponse(req, res, { data: [] });
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
            const user = req.user;
            const data = await QuestionBankUtils.getQuestionBankBySubject(Number(id), Number(user.id));
            sendSuccessResponse(req, res, { data });
        } catch (error) {
            next(error)
        }
    }

    static async deleteQuestionBankById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            await QuestionBankUtils.deleteQuestionBankById(Number(id))
            sendSuccessResponse(req, res, { message: "deleted successfully" })
        } catch (error) {
            next(error)
        }
    }

    static async getQuestionBankBySubject(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const data = await QuestionBankUtils.getQuestionBankBySubjectId(Number(id));
            sendSuccessResponse(req, res, { data });
        } catch (error) {
            next(error)
        }
    }
}