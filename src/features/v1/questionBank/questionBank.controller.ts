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
            const role = await UserRoleRepository.getUserRoleById(id)
            const parseRole = JSON.parse(role.userRoles)
            const isSME = parseRole.filter((obj)=> obj.roleName === 'SME')
         
            if(isSME && isSME.length === 1){
                const data = await QuestionBankUtils.getQuestionBank(id);
                sendSuccessResponse(req, res, { data })
            }else{
                sendSuccessResponse(req, res, { message: "Yet to be implemented" })
            }
            
        } catch (error) {
            next(error)
        }
    }
}