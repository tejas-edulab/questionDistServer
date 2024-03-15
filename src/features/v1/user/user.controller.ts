import { NextFunction, Request, Response } from 'express';
import logger from '../../../utils/winston';
import UserRepository from './user.util';
import ApiError from '../../../utils/api-error';
import sendSuccessResponse from '../../../middlewares/success-handler';
import { IRoles } from './user.types';


export default class UserController {

    public static async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            res.send('Hello World');
        } catch (error) {
            next(error);
        }
    }

    public static async getMyInfo(req: Request, res: Response, next: NextFunction) {
        try {
            res.send(req.user);

        } catch (error) {
            next(error);
        }
    }

    public static async getEvaluator(req:Request,res:Response,next:NextFunction){
        try{
            const result = await UserRepository.fetchEvaluatorByRole(IRoles.EVALUATOR)
            sendSuccessResponse(req,res,{result})
        }catch(error){
            next(error)
        }
    }

}