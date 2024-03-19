import { Router } from 'express';
import Rbac from '../../../middlewares/rbac';
import { IRoles } from '../user/user.types';
import PaperSetterController from './paper-setter.controller';



const router = Router();

router.get('/', Rbac([IRoles.SUPER_ADMIN, IRoles.PAPER_SETTER]), PaperSetterController.getPaperSetter);
export default router;
