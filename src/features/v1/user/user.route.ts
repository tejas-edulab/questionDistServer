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



/**
 * @GET 
 * @route /v1/users/
 * @description Get All Users
 */
router.get("/", Rbac([IRoles.SUPER_ADMIN, IRoles.COE_HEAD]), UserController.getMultiUsers);


/**
 * @GET 
 * @route /v1/users/user
 * @description Get Single User by User Id passed in query params
 */
router.get("/user", Rbac([IRoles.SUPER_ADMIN, IRoles.COE_HEAD]), UserController.getSingleUser);




export default router;
