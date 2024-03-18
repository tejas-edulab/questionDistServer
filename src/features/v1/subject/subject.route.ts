import { Router } from 'express';
import { IRoles } from '../user/user.types';
import SubjectController from './subject.controller';


const router = Router();

/**
 * @GET
 * @route /v1/roles
 * @description Get all roles
 */
router.get('/', SubjectController.getAllSubjects);

router.get('/:subjectId', SubjectController.getSubjectById);




export default router;
