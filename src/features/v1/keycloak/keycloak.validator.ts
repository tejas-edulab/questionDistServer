import Joi from 'joi';
import { IRoles, ICreateRoles } from '../user/user.types';


export const keycloakRegisterSchema = Joi.object({
    firstname: Joi.string().required().messages({
        'any.required': 'Firstname is required',
    }),
    lastname: Joi.string().required().messages({
        'any.required': 'Lastname is required',
    }),
    email: Joi.string().email().required().messages({
        'any.required': 'Email is required',
        'string.email': 'Invalid Email',
    }),
    password: Joi.string().required().messages({
        'any.required': 'Password is required',
    }),
    roles: Joi.array().required().valid(...Object.values(IRoles)),
    collegeId: Joi.number().optional().messages({
        'number.base': 'collegeId must be a valid number',
    }),
    studentId: Joi.number().optional().messages({
        'number.base': 'studentId must be a valid number',
    }),
    username: Joi.string().optional(),
});

export const keycloakAssignClientRollToUserSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'any.required': 'Email id is required',
    }),
    role: Joi.string().valid(...Object.values(IRoles)),
});

/*
    This code exports a Joi schema object named `keycloakCreateRoleSchema`
    which defines the validation rules for creating a new role in a Keycloak
    server.
*/
export const keycloakCreateRoleSchema = Joi.object({
    name: Joi.string().valid(...Object.values(ICreateRoles)),
    description: Joi.string().required().messages({
      'any.required': 'description is required',
    }),
  });
  