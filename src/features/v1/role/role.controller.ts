import sendSuccessResponse from "../../../utils/success-handler";
import RoleRepositories from "./role.util";
import { NextFunction, Response,Request } from "express";

export default class RoleController {

         static  async fetchRole(req:Request,res:Response,next:NextFunction){
            try{
                const roles = await RoleRepositories.fetchRoles()
                sendSuccessResponse(req,res,{roles})
            }catch(error){
                next(error)
            }
        }
}