import express, { NextFunction, Request, Response } from 'express';
import { getUploadByUploadIdSchema } from './upload.validator';
import UploadsRepository from './uploads.util';
import ApiError from '../../../utils/api-error';
import fs from 'fs'
import { getImageLocation } from '../../../helpers/common.helpers';

export default class UploadController {
    public static async getUploadByUploadId(req:Request,res:Response,next:NextFunction){
        try{
            const { uploadId } = await getUploadByUploadIdSchema.validateAsync(req.query)
            const result = await UploadsRepository.fetchUploadsById(uploadId)
            if(!result) return next(ApiError.notFound())
            const {filename ,destination} = result
            const filePath  = getImageLocation(destination,filename)
            const  pathSegments  = filePath.split('\\')
            const normalizedPath  = pathSegments.join('//')
            const fileExtension  = normalizedPath.split('.')[1]
            const allowedExtensions = ['pdf', 'jpeg', 'jpg', 'png', 'avif', 'jfif'];
            if(!allowedExtensions.includes(fileExtension )) return next(ApiError.customError(422,`Your Extension is Invalid Must be Pdf And Imges`))
            fs.access(normalizedPath, fs.constants.R_OK, (err) => {
                if (err) {
                    if (err.code === 'ENOENT') return next(ApiError.customError(404, 'File not found'));
                 }
                const stream = fs.createReadStream(normalizedPath)
                return stream.pipe(res)
            });
    }catch(error){
            return next(error)
        }
    }
}