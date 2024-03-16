import { Router } from 'express';
import Rbac from '../../../middlewares/rbac';
import { IRoles } from '../user/user.types';
import QuestionBankController from './questionBank.controller';
const router = Router();

router.post('/', Rbac([ IRoles.SUPER_ADMIN]),QuestionBankController.createQuestionBank);


export default router;