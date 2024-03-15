import { Router } from 'express';
import ExamController from './exam.controller';

const router = Router();

/**
 * @GET
 * @route /v1/exam
 * @description get exams
 */
router.get('/', ExamController.getExam);

/**
 * @GET
 * @route /v1/exam
 * @description get subjects
 */

router.get('/subjects', ExamController.getSubject);


export default router;
