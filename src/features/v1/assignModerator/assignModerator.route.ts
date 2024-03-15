import { Router } from 'express';
import Rbac from '../../../middlewares/rbac';
import { IRoles } from '../user/user.types';
import AssignModeratorController from './assignModerator.controller';
const router = Router();

router.post('/', Rbac([IRoles.COE_HEAD, IRoles.SUPER_ADMIN, IRoles.COE_STAFF]), AssignModeratorController.createAssignModerator);

router.get('/', Rbac([IRoles.COE_HEAD, IRoles.SUPER_ADMIN, IRoles.COE_STAFF]), AssignModeratorController.getAssignModerator);

export default router;
