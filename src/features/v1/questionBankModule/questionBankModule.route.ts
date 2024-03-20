import { Router } from 'express';
import Rbac from '../../../middlewares/rbac';
import { IRoles } from '../user/user.types';
import QuestionBankModuleController from './questionBankModule.controller';

const router = Router();

router.post('/', Rbac([IRoles.SUPER_ADMIN, IRoles.SME]), QuestionBankModuleController.createQuestionBankModule);

router.get('/', Rbac([IRoles.SUPER_ADMIN, IRoles.SME]), QuestionBankModuleController.getQuestionBankModule);

export default router;
