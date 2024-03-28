import express, { NextFunction, Request, Response } from 'express';
import logger from '../../../utils/winston';
import { AppDataSource } from "../../../data-source";

import { IRoles } from '../user/user.types';
import Roles from './role.model';
import { Not } from 'typeorm';

const roleRepository = AppDataSource.getRepository(Roles);

export default class RoleRepositories {

    public static fetchRoleByRoleName = async (roleName: IRoles) => {
        const role = await roleRepository.findOne({ where: { roleName } });
        return role;
    };

    public static fetchRoleByRoleId = async (roleId: string) => {
        const role = await roleRepository.findOne({ where: { roleId } });
        return role;
    };

    public static createRole = async (roleName: IRoles, roleId: string | null) => {
        const role = new Roles();
        role.roleName = roleName;
        if (roleId) role.roleId = roleId;
        const createRole = await roleRepository.save(role);
        return createRole;
    };

    static updateRole = async (role: Roles) => {
        const updatedRole = await roleRepository.update({ id: role.id }, role);
        if (updatedRole.affected === 0) return false;
        return true;
    };

    static deleteRoleByRoleName = async (roleName: IRoles) => {
        const role = await this.fetchRoleByRoleName(roleName);
        if (!role) return null;
        const deleted = await roleRepository.remove(role);
        return deleted;
    };

    static fetchRoles = async()=>{
        const query = `select id,roleId,createdAt, updatedAt, roleName as role from roles where roleName!= 'SUPER_ADMIN';`;
        const data = await AppDataSource.query(query);
        return data;
    }
}