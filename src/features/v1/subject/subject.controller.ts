import sendSuccessResponse from "../../../utils/success-handler";
import { NextFunction, Response, Request } from "express";
import SubjectRepository from "./subject.util";

export default class SubjectController {

    static async getAllSubjects(req: Request, res: Response, next: NextFunction) {
        try {
            const subjects = await SubjectRepository.fetchAllSubjects();
            sendSuccessResponse(req, res, { subjects })
        } catch (error) {
            next(error)
        }
    }

    static async getSubjectById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.subjectId
            const subject = await SubjectRepository.fetchSubjectById(Number(id));
            sendSuccessResponse(req, res, { subject })
        } catch (error) {
            next(error)
        }
    }


}