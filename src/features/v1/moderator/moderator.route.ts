import { Router } from 'express';
import Rbac from '../../../middlewares/rbac';
import { IRoles } from '../user/user.types';
import ModeratorController from './moderator.controller';
import { uploadPdf } from '../helpers/multer.helpers';


const router = Router();

router.get('/', Rbac([IRoles.SUPER_ADMIN, IRoles.MODERATOR]), ModeratorController.getModerator);

router.post('/uploadPdf', uploadPdf('uploads/question_paper').fields([{ name: 'uploadPdf', maxCount: 1 }]),Rbac([IRoles.SUPER_ADMIN, IRoles.MODERATOR])
,    ModeratorController.uploadQuestionSetPDF
);

export default router;
