import { Router } from 'express';
import QuestionSetController from './question_set.controller';
import { IRoles } from '../../user/user.types';
import Rbac from '../../../../middlewares/rbac';

const router = Router();

router.post('/',Rbac([IRoles.PAPER_SETTER, IRoles.COE_HEAD, IRoles.SUPER_ADMIN]) ,QuestionSetController.createQuestionSet);


export default router;
