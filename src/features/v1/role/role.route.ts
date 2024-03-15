import { Router } from 'express';
import RoleController from './role.controller';
// import Rbac from '../../middlewares/rbac';
import { IRoles } from '../user/user.types';


const router = Router();

/**
 * @GET
 * @route /v1/roles
 * @description Get all roles
 */
router.get('/',RoleController.fetchRole);




export default router;
