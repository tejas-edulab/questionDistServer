import { Router } from 'express';
import UploadController from './upload.controller';


const router = Router();

/**
 * @GET
 * @route /v1/get-upload-by-uploadId
 * @description get single upload
 */
router.get('/get-upload-by-uploadId', UploadController.getUploadByUploadId);



export default router;
