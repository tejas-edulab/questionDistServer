import { Router } from 'express';
import QuestionSetController from './question_set.controller';
import { IRoles } from '../../user/user.types';
import Rbac from '../../../../middlewares/rbac';

const router = Router();

router.post('/', Rbac([IRoles.PAPER_SETTER, IRoles.MODERATOR, IRoles.COE_HEAD, IRoles.SUPER_ADMIN]), QuestionSetController.createQuestionSet,QuestionSetController.generateQuestionSetPdf);

router.get('/', Rbac([IRoles.SUPER_ADMIN, IRoles.MODERATOR, IRoles.PAPER_SETTER, IRoles.COE_HEAD]), QuestionSetController.getQuestionSet);

router.get('/:id', Rbac([IRoles.SUPER_ADMIN, IRoles.MODERATOR, IRoles.PAPER_SETTER, IRoles.COE_HEAD]), QuestionSetController.getQuestionSetById);


export default router;
