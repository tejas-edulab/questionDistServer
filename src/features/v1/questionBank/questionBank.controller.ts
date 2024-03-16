import { NextFunction, Response,Request } from "express";
import QuestionBankUtils from "./questionBank.utils";
import sendSuccessResponse from "../../../middlewares/success-handler";

export default class QuestionBankController {

         static  async createQuestionBank(req:Request,res:Response,next:NextFunction){
            try{
                const userId = req.user.id
                const newData = req.body.map((value) =>({ ...value, userId }));
                const result=  await QuestionBankUtils.saveQuestionBank(newData)
                if(result) sendSuccessResponse(req,res,{message:"Successfully stored"})
            }catch(error){
                next(error)
            }
       
        }
}