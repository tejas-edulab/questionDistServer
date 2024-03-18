import { Router } from 'express';
import Rbac from '../../../middlewares/rbac';
import { IRoles } from '../user/user.types';
import QuestionBankController from './questionBank.controller';
const router = Router();

router.post('/', Rbac([IRoles.SUPER_ADMIN]), QuestionBankController.createQuestionBank);

router.get('/', Rbac([IRoles.SUPER_ADMIN, IRoles.SME, IRoles.PAPER_SETTER, IRoles.MODERATOR, IRoles.COE_HEAD, IRoles.COE_STAFF]), QuestionBankController.getQuestionBank);


export default router;