import { Router } from 'express';
import Rbac from '../../../middlewares/rbac';
import QuestionSetController from './question_set.controller';

const router = Router();

router.post('/',  QuestionSetController.createQuestionSet);


export default router;
