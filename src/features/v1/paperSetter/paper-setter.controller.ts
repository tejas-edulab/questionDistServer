import { NextFunction, Response, Request } from "express";
import sendSuccessResponse from "../../../middlewares/success-handler";
import { IRoles } from "../user/user.types";
import UserRepository from "../user/user.util";
import ApiError from "../../../utils/api-error";
import PaperSetterUtils from "./paper-setter.utils";

export default class PaperSetterController {
  static async getPaperSetter(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      const roles = user.role;

      if (Array.isArray(roles)) {
        const isPaperSetter = roles.filter((obj: any) => obj.roleName === IRoles.PAPER_SETTER);
        if (isPaperSetter) {
          const data = await PaperSetterUtils.getPaperSetterByUserIdAndExamId(user.id, Number(req.query.examId));
          sendSuccessResponse(req, res, data);
        } else {
          sendSuccessResponse(req, res, { message: "Yet to be implemented" });
        }
      }
    } catch (error) {
      next(error);
    }
  }
}
