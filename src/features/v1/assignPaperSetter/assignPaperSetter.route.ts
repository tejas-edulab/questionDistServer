import { Router } from 'express';
import Rbac from '../../../middlewares/rbac';
import { IRoles } from '../user/user.types';
import AssignPaperSetterController from './assignPaperSetter.controller';
const router = Router();

router.post('/', Rbac([IRoles.COE_HEAD, IRoles.SUPER_ADMIN, IRoles.COE_STAFF]), AssignPaperSetterController.createAssignPaperSetter);

router.get('/', Rbac([IRoles.COE_HEAD, IRoles.SUPER_ADMIN, IRoles.COE_STAFF]), AssignPaperSetterController.getAssignPaperSetter);

router.get('/:userId/:examId', Rbac([IRoles.COE_HEAD, IRoles.SUPER_ADMIN, IRoles.COE_STAFF]), AssignPaperSetterController.getAssignPaperSetterByUserIdAndExamId);

export default router;
