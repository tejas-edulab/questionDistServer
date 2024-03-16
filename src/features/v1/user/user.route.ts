import { Router } from 'express';
import UserController from './user.controller';
import Rbac from '../../../middlewares/rbac';
import { IRoles } from './user.types';

const router = Router();

/**
 * @GET
 * @route /api/users
 * @description Get all users
 */

// router.get('/my-info', Rbac([IRoles.SUPER_ADMIN, IRoles.ADMIN, IRoles.ADMIN, IRoles.EVALUATOR]), UserController.getMyInfo);

/**
 * @GET 
 * @route /v1/users/evaluator
 * @description Get evaluator 
 */
// router.get('/evaluator', Rbac([IRoles.SUPER_ADMIN, IRoles.ADMIN]),  UserController.getEvaluator);


router.get('/',UserController.getMultiUsers)

export default router;
