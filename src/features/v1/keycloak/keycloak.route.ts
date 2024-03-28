import { Router } from 'express';
import Rbac from '../../../middlewares/rbac';
import { IRoles } from '../user/user.types';
import KeycloakController from './keycloak.controller';



const router = Router();

/**
 * @POST 
 * @route /api/keycloak/role
 * @description Create a new role in keycloak
 * 
 */

router.post('/role', Rbac([IRoles.COE_HEAD, IRoles.SUPER_ADMIN]), KeycloakController.createClientRole);

/**
     @route: /keycloak/register
     @description: Register User to the Keycloak
*/

router.post("/register", Rbac([IRoles.SUPER_ADMIN, IRoles.COE_HEAD]), KeycloakController.registerUser);

/**
     @route: /keycloak/admin-login
     @description: Login keycloak admin to the keycloak server routing through our backend.
*/

router.post("/admin-login", KeycloakController.loginKeycloakAdmin);

/**
     @route: /keycloak/login
     @description:  Login keycloak admin to the keycloak server routing through our backend.
*/

router.post("/login", KeycloakController.loginKeycloakUser);

router.put("/user", Rbac([IRoles.SUPER_ADMIN, IRoles.COE_HEAD]), KeycloakController.updateUser);


export default router;
