import { NextFunction, Request, Response } from 'express';
import RoleRepositories from '../role/role.util';
import ApiError from '../../../utils/api-error';
import UserRepository from '../user/user.util';
import { keycloakRegisterSchema, keycloakAssignClientRollToUserSchema, keycloakCreateRoleSchema, } from './keycloak.validator'
import { IRoles, IKeycloakRole } from '../user/user.types';
import logger from '../../../utils/winston';
import { IApiErrors } from '../../../types/error';
import KeycloakApi from './keycloak.utils';
import UserRoleRepository from '../userRole/user-role.utils';


export default class KeycloakController {

    static loginKeycloakAdmin = async (req: Request, res: Response, next: NextFunction) => {
        try {
            /*
              Validate request body
            */
            // await keycloakAdminLoginSchema.validateAsync(req.body);

            const keycloakClientId = process.env.KEYCLOAK_CLIENTID;
            if (!keycloakClientId) throw Error('Environment: KEYCLOAK_CLIENTID is not defined');


            /*
              Preparing the axios data for calling the keycloak api
            */
            const data = {
                username: req.body.email,
                password: req.body.password,
                grant_type: 'password',
                client_id: keycloakClientId,
            };



            const response = await KeycloakApi.loginAdmin(data);

            /*
              Forwarding the response of the keycloak in data
            */
            return res.status(200).json({ status: 200, data: response, message: 'loggedin successfully' });
        } catch (e) {
            return next(e);
        }
    };

    static loginKeycloakUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            /*
            Checking if required environment is present
            */
            const keycloakClientId = process.env.KEYCLOAK_CLIENTID;
            if (!keycloakClientId) throw Error('Environment: KEYCLOAK_REALM is not defined');

            /*
              Preparing the axios data for calling the keycloak api
            */
            const data = {
                username: req.body.email,
                password: req.body.password,
                grant_type: 'password',
                client_id: keycloakClientId,
            };

            const response = await KeycloakApi.loginUser(data);
            /*
              Forwarding the response of the keycloak
            */
            return res.status(200).json({ status: 200, data: response, message: 'loggedin successfully!!!' });
        } catch (e) {
            return next(e);
        }
    };

    public static 
    createClientRole = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await keycloakCreateRoleSchema.validateAsync(req.body);
            const { name, description } = req.body;

            /*
             Check if Role is already added in our database
             If entry found return error
            */
            let role = await RoleRepositories.fetchRoleByRoleName(req.body.name);

            // If Role Exits return Duplicate Entry
            if (role) {
                return res.status(422).json({ status: 422, error: "Duplicate Role Found", data: null })
            }
            // Else Add the role to our database with roleId as null
            // We will later fetch the Role ID and Set it over here in database
            role = await RoleRepositories.createRole(name, null);
            /*
              Preparing the axios data for calling the Keycloak API
              to Create a Role at Keycloak Level
            */
            const data = {
                name,
                description,
            };
           
            try {
                // Call the Keycloak API to create the role                
                await KeycloakApi.createRole(data, req.headers.authorization);
            } catch (e) {
                // If an error occurs during Keycloak API call,
                // delete the role from our database and pass the error to the next middleware
                await RoleRepositories.deleteRoleByRoleName(role.roleName);
                next(e);
            }

            // Fetch the Role ID from the keycloak
            try {
                const getRole: IKeycloakRole[] = await KeycloakApi.fetchKeycloakRole(req.headers.authorization);
                // console.log("getRole", getRole)
                const roleData = getRole
                    .filter((currentRole: IKeycloakRole) => currentRole.name === name);
                role.roleId = roleData[0].id;
                await RoleRepositories.updateRole(role);
            } catch (e) {
                logger.error(e);
            }

            /*
                Forwarding the response of the keycloak
              */
            return res.status(200).json({ status: 200, data: { message: 'Role Created' } });
        } catch (e) {
            // Pass any caught error to the next middleware
            return next(e);
        }
    };

    // static registerUser = async (req: Request, res: Response, next: NextFunction) => {
    //     try {

    //         /*
    //          Validate request body
    //         */
    //         const {
    //             firstname, lastname, email, password, role, username
    //         } = await keycloakRegisterSchema.validateAsync(req.body);

    //         if (req.body.role !== IRoles.SUPER_ADMIN) req.body.username = req.body.email;

    //         logger.info('Body', req.body);

    //         /*
    //          Check if email is already added in our database
    //          If entry found return error
    //         */

    //         const registeredUser = await UserRepository.findUserByEmail(email);
    //         if (registeredUser) return next(ApiError.duplicateEntry());

    //         /**
    //          * Do validation if role type id IRoles.College
    //          * If we are assigning role as College we will required the college ID
    //          * Next Check if collegeId is present in our system
    //          * If Role is not College, update the CollegeId as null
    //          */
    //         // if (role === IRoles.ADMIN && !collegeId) return next(ApiError.customError(422, 'For role type college, collegeId is required '));
    //         // if (role !== IRoles.ADMIN) req.body.collegeId = null;

    //         // if (role === IRoles.ADMIN && !studentId) return next(ApiError.customError(422, 'For role type student, studentId is required '));
    //         // if (role !== IRoles.ADMIN) req.body.studentId = null;

    //         // Create User in our database
    //         const userInfo = await UserRepository.addUser(
    //             firstname,
    //             lastname,
    //             email,
    //             username || email,
    //             // IRoles.PRINTER,
    //         );


    //         /*
    //           Preparing the axios data for calling the Keycloak API
    //           Temporary is set as true so that when the user logs in,
    //           they will be required to reset their password
    //         */
    //         const data = JSON.stringify({
    //             enabled: true,
    //             firstName: firstname,
    //             lastName: lastname,
    //             email,
    //             credentials: [
    //                 {
    //                     type: 'password',
    //                     value: password,
    //                     temporary: true,
    //                 },
    //             ],
    //             attributes: {
    //                 userid: userInfo.id,
    //             },
    //             username: req.body.username,
    //         });


    //         try {
    //             // Call the Keycloak API to register the user
    //             await KeycloakApi.register(data, req.headers.authorization as string);
    //         } catch (e) {
    //             /*
    //             If an error occurs during the API call,
    //             delete the user from our database and pass the error to the next middleware
    //             */

    //             await UserRepository.deleteUserByEmail(req.body.email);
    //             next(IApiErrors.INTERNAL_SERVER_ERROR);
    //             return next(ApiError.internal());
    //         }

    //         /*
    //           Get Keycloak userId from the email
    //           and save this userId in our database.
    //           UserId is required for assigning roles.
    //           If the below code fails, throw an error with the message 'Error while assigning roles'
    //         */
    //         try {
    //             const user = await KeycloakApi.fetchKeycloakUser(req.body.email, req.headers.authorization as string);
    //             await UserRepository.updateUserIdData(req.body.email, user[0].id);
    //         } catch (e) {
    //             logger.error(e);
    //             return res.status(500).json({ status: 500, error: 'Error while assigning role. Assigned Default Role', message: 'User Created with default role' });
    //         }

    //         // Pass the email and role to the next middleware
    //         req.body = { email, role };
    //         return next();
    //     } catch (e) {
    //         // Pass any caught error to the next middleware
    //         return next(e);
    //     }
    // };

    
    static registerUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
  
            /*
             Validate request body
            */

            const {
                firstName, lastName, email, password, roleInfo, username
            } = await keycloakRegisterSchema.validateAsync(req.body);
  
            const isRoleSuperAdmin = roleInfo.filter((value)=>value.role === IRoles.SUPER_ADMIN) //check includes
  
            if(isRoleSuperAdmin.length > 0) return next(ApiError.customError(422,'You Have No Access to Create SUPER_ADMIN'))
            if (isRoleSuperAdmin.length < 0) req.body.username = req.body.email;
  
            logger.info('Body', req.body);
  
            /*
             Check if email is already added in our database
             If entry found return error
            */
  
            const registeredUser = await UserRepository.findUserByEmail(email);
            if (registeredUser) return next(ApiError.duplicateEntry());
  
            /**
             * Do validation if role type id IRoles.College
             * If we are assigning role as College we will required the college ID
             * Next Check if collegeId is present in our system
             * If Role is not College, update the CollegeId as null
             */
            // if (role === IRoles.ADMIN && !collegeId) return next(ApiError.customError(422, 'For role type college, collegeId is required '));
            // if (role !== IRoles.ADMIN) req.body.collegeId = null;
  
            // if (role === IRoles.ADMIN && !studentId) return next(ApiError.customError(422, 'For role type student, studentId is required '));
            // if (role !== IRoles.ADMIN) req.body.studentId = null;
  
            // Create User in our database
            const userInfo = await UserRepository.addUser(
                firstName,
                lastName,
                email,
                username || email,
            );
             const userRoleDetail = req.body.roleInfo.map((item)=> ({ ...item, userId:userInfo.id }))
  
             if(!userInfo)  return next(ApiError.customError(422,'Something Went Wrong In Creating Add User'))
  
            if(userInfo){
               const userRole = await UserRoleRepository.createUserRole(userRoleDetail) 
               if(!userRole) return next(ApiError.customError(422,'Something Went Wrong In Creating User Role'))
            }
  
  
            /*
              Preparing the axios data for calling the Keycloak API
              Temporary is set as true so that when the user logs in,
              they will be required to reset their password
            */
            const data = JSON.stringify({
                enabled: true,
                firstName: firstName,
                lastName: lastName,
                email,
                credentials: [
                    {
                        type: 'password',
                        value: password,
                        temporary: true,
                    },
                ],
                attributes: {
                    userid: userInfo.id,
                },
                username: req.body.username,
            });
  
            console.log('on main register controller:',data)
            try {
                // Call the Keycloak API to register the user
              await KeycloakApi.register(data, req.headers.authorization as string);
            } catch (e) {
              console.log(e.message)
                /*
                If an error occurs during the API call,
                delete the user from our database and pass the error to the next middleware
                */
  
                await UserRepository.deleteUserByEmail(req.body.email);
                await UserRoleRepository.deleteUserRoleByUserId(userInfo.id)
                next(IApiErrors.INTERNAL_SERVER_ERROR);
                return next(ApiError.internal());
            }
  
            /*
              Get Keycloak userId from the email
              and save this userId in our database.
              UserId is required for assigning roles.
              If the below code fails, throw an error with the message 'Error while assigning roles'
            */
            try {
                const user = await KeycloakApi.fetchKeycloakUser(req.body.email, req.headers.authorization as string);
                await UserRepository.updateUserIdData(req.body.email, user[0].id);
            } catch (e) {
                logger.error(e);
                return res.status(500).json({ status: 500, error: 'Error while assigning role. Assigned Default Role', message: 'User Created with default role' });
            }
  
            // Pass the email and role to the next middleware
            req.body = { email, roleInfo };
            return next();
        } catch (e) {
            // Pass any caught error to the next middleware
            return next(e);
        }
    };


    static assignClientRollToUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Validate the request body
            await keycloakAssignClientRollToUserSchema.validateAsync(req.body);

            // Deconstruct the body
            const { roleInfo, email } = req.body;
            // Check if authorization header is present
            if (req.headers.authorization === undefined) return next(ApiError.unAuthorized());

            // Get the user data
            const user = await UserRepository.findUserByEmail(email);
            if (!user) return res.status(400).json({ status: 400, error: 'User Not Found' });

            // This is keycloak userId needed while assigning role to keyclaok user
            let userId: string;

            // Check if userId exits for the role
            if (user.userId === null) {
                try {
                    // If userId is null get the userId from the keycloak
                    const keycloakUser = await KeycloakApi
                        .fetchKeycloakUser(req.body.email, req.headers.authorization);

                    userId = keycloakUser.userId;

                    // And Also store the userId in our database
                    user.userId = userId;
                    await UserRepository
                        .updateUser(user.email, user.firstName, user.lastName, user.role, userId);
                } catch (e) {
                    logger.error(e);
                    return res.status(500).json({ status: 500, error: 'Error while assigning role. Assigned Default Role' });
                }
            } else {
                userId = user.userId;
            }

            // Get the role data
            const userRole = await UserRoleRepository.fetchRole(user.id)

            // const roleData = await RoleRepositories.fetchRoleByRoleName(role);
            // if (!roleData) return res.status(400).json({ status: 400, error: 'Role Not Found' });
            
           const data = await Promise.all(userRole.map(async(value)=>{
            const isRoleExist = await UserRoleRepository.fetchRoleByRoleName(value.role,value.userId);
            if (!isRoleExist) return res.status(400).json({ status: 400, error: 'Role Not Found' });

            if (value.rolesId === null) {
              // Fetch the Role ID from the keycloak
              try {
                  const keycloakRoles = await KeycloakApi.fetchKeycloakRole(req.headers.authorization);
                  const keycloakRoleData: IKeycloakRole[] = keycloakRoles
                      .filter((currentRole: IKeycloakRole) => currentRole.name === value.role);
                      value.rolesId = keycloakRoleData[0].id;
                  await RoleRepositories.updateRole(value.role);
              } catch (e) {
                  logger.error(e);
                  return res.status(500).json({ status: 500, error: 'Error while assigning role. Assigned Default Role' });
              }

            }
            return { id: value.rolesId, name: value.role }
            }))
           
            console.log(data)
            /*
              Preparing the axios data for calling the keycloak api
            */
       
            // const data = [{ id: roleData.rolesId, name: roleData.role }];

            /*
              Update the new role for the user
            */
            // await UserRepository.updateRoleData(email, role);

            try {
                // Assign role in keycloak
                await KeycloakApi.assignRole(data, userId, req.headers.authorization);
            } catch (e) {
                // Rollbacking to the default role
                logger.error(e);
                // await UserRepository.updateRoleData(email, user.role);
                return res.status(500).json({ status: 500, error: 'Error while assigning role. Assigned Default Role' });
            }

            /*
              Sending the response to the client.
            */
            return res.status(200).json({ status: 200, message: 'Done' });
        } catch (e) {
            return next(e);
        }
    };

    // static assignClientRollToUser = async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         // Validate the request body
    //         await keycloakAssignClientRollToUserSchema.validateAsync(req.body);

    //         // Deconstruct the body
    //         const { role, email } = req.body;

    //         // Check if authorization header is present
    //         if (req.headers.authorization === undefined) return next(ApiError.unAuthorized());

    //         // Get the user data
    //         const user = await UserRepository.findUserByEmail(email);
    //         if (!user) return res.status(400).json({ status: 400, error: 'User Not Found' });

    //         // This is keycloak userId needed while assigning role to keyclaok user
    //         let userId: string;

    //         // Check if userId exits for the role
    //         if (user.userId === null) {
    //             try {
    //                 // If userId is null get the userId from the keycloak
    //                 const keycloakUser = await KeycloakApi
    //                     .fetchKeycloakUser(req.body.email, req.headers.authorization);

    //                 userId = keycloakUser.userId;

    //                 // And Also store the userId in our database
    //                 user.userId = userId;
    //                 await UserRepository
    //                     .updateUser(user.email, user.firstName, user.lastName, user.role, userId);
    //             } catch (e) {
    //                 logger.error(e);
    //                 return res.status(500).json({ status: 500, error: 'Error while assigning role. Assigned Default Role' });
    //             }
    //         } else {
    //             userId = user.userId;
    //         }

    //         // Get the role data
    //         const roleData = await RoleRepositories.fetchRoleByRoleName(role);
    //         if (!roleData) return res.status(400).json({ status: 400, error: 'Role Not Found' });
    //         if (roleData.roleId === null) {
    //             // Fetch the Role ID from the keycloak
    //             try {
    //                 const keycloakRoles = await KeycloakApi.fetchKeycloakRole(req.headers.authorization);
    //                 const keycloakRoleData: IKeycloakRole[] = keycloakRoles
    //                     .filter((currentRole: IKeycloakRole) => currentRole.name === roleData.roleName);
    //                 roleData.roleId = keycloakRoleData[0].id;
    //                 await RoleRepositories.updateRole(roleData);
    //             } catch (e) {
    //                 logger.error(e);
    //                 return res.status(500).json({ status: 500, error: 'Error while assigning role. Assigned Default Role' });
    //             }
    //         }

    //         /*
    //           Preparing the axios data for calling the keycloak api
    //         */
    //         const data = [{ id: roleData.roleId, name: roleData.roleName }];

    //         /*
    //           Update the new role for the user
    //         */
    //         await UserRepository.updateRoleData(email, role);

    //         try {
    //             // Assign role in keycloak
    //             await KeycloakApi.assignRole(data, userId, req.headers.authorization);
    //         } catch (e) {
    //             // Rollbacking to the default role
    //             logger.error(e);
    //             await UserRepository.updateRoleData(email, user.role);
    //             return res.status(500).json({ status: 500, error: 'Error while assigning role. Assigned Default Role' });
    //         }

    //         /*
    //           Sending the response to the client.
    //         */
    //         return res.status(200).json({ status: 200, message: 'Done' });
    //     } catch (e) {
    //         return next(e);
    //     }
    // };

}