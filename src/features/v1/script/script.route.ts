import { Router } from 'express';
import ScriptController from './script.controller';


const router = Router();

/**
 * @GET
 * @route /v1/api/script/populate-exam-subject
 * @description populate exam subject
 */
router.get('/populate-exam-subject', ScriptController.populateExamSubject);


export default router;
