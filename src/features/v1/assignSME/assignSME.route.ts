import { Router } from 'express';
import AssignSMEController from './assignSME.controller';
import Rbac from '../../../middlewares/rbac';
import { IRoles } from '../user/user.types';
const router = Router();

router.post('/', Rbac([IRoles.COE_HEAD, IRoles.SUPER_ADMIN, IRoles.COE_STAFF]), AssignSMEController.createAssignSME);

router.get('/', Rbac([IRoles.COE_HEAD, IRoles.SUPER_ADMIN, IRoles.COE_STAFF]), AssignSMEController.getAssignSME);

router.get('/:userId', Rbac([IRoles.COE_HEAD, IRoles.SUPER_ADMIN, IRoles.COE_STAFF]), AssignSMEController.getAssignSMEByUserId);

router.put('/', Rbac([IRoles.COE_HEAD, IRoles.SUPER_ADMIN, IRoles.COE_STAFF]), AssignSMEController.updateAssignSME);

export default router;
