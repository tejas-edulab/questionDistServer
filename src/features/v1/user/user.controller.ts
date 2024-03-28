import { NextFunction, Request, Response } from "express";
import UserRepository from "./user.util";
import sendSuccessResponse from "../../../middlewares/success-handler";
import { getSingleUserSchema } from "./user.validator";
import ApiError from "../../../utils/api-error";

export default class UserController {
  static async getMultiUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserRepository.fetchMultiUser();
      sendSuccessResponse(req, res, { users });
    } catch (err) {
      next(err);
    }
  }

  static async getSingleUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = await getSingleUserSchema.validateAsync(req.query);
      const user = await UserRepository.fetchSingleUserById(id);
      if (!user) return next(ApiError.notFound());
      sendSuccessResponse(req, res, { user });
    } catch (e) {
      next(e);
    }
  }

  static async getMyInfo(req: Request, res: Response, next: NextFunction) {
    try {
      res.send(req.user);
    } catch (error) {
      next(error);
    }
  }

  // public static async getEvaluator(req:Request,res:Response,next:NextFunction){
  //     try{
  //         const result = await UserRepository.fetchEvaluatorByRole(IRoles.EVALUATOR)
  //         sendSuccessResponse(req,res,{result})
  //     }catch(error){
  //         next(error)
  //     }
  // }
}
