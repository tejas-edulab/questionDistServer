import { NextFunction, Response, Request } from "express";
import sendSuccessResponse from "../../../middlewares/success-handler";
import { IRoles } from "../user/user.types";
import UserRepository from "../user/user.util";
import ApiError from "../../../utils/api-error";
import ModeratorUtils from "./moderator.utils";
import UploadsRepository from "../upload/uploads.util";
import QuestionSetUtils from "../question_set/question_set/question_set.utils";

export interface IQuestionSetFiles {
  uploadPdf?: Express.Multer.File[];
}

export default class ModeratorController {
  static async getModerator(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      const roles = user.role;

      if (Array.isArray(roles)) {
        const isPaperSetter = roles.filter((obj: any) => obj.roleName === IRoles.PAPER_SETTER);
        if (isPaperSetter) {
          const data = await ModeratorUtils.getModeratorByUserIdAndExamId(user.id, Number(req.query.examId));
          sendSuccessResponse(req, res, data);
        } else {
          sendSuccessResponse(req, res, { message: "Yet to be implemented" });
        }
      }
    } catch (error) {
      next(error);
    }
  }

  static async uploadQuestionSetPDF(req: Request, res: Response, next: NextFunction) {
    try {

      const files = req.files as IQuestionSetFiles;

      const userId = req.user.id
      const body = req.body
      
      const newData = { ...body, userId: userId }

      let questionSetUploadPdf = null;
      if (files.uploadPdf !== undefined) {
        const quePaper = {
          ...files.uploadPdf[0],
          helperName: 'questionSetUploadPdf',
          uploadedFor: 'addQuestionSet',
          extension: files.uploadPdf[0].originalname.split('.')[1],
        };

        questionSetUploadPdf = await UploadsRepository.createUploads(quePaper);
        
      }

      newData.uploadPdf = questionSetUploadPdf.id

      await QuestionSetUtils.createQuestionSet(newData)
      sendSuccessResponse(req, res, { data: "Successfully Saved" })

    } catch (error) {
      return next(error);
    }
  }
}
