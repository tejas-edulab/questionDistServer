import { AppDataSource } from "../../../data-source";
import { IRoles } from "../user/user.types";
import { UserRole } from "./userRole.model";

const userRoleRepository = AppDataSource.getRepository(UserRole);
export default class UserRoleRepository {

    public static createUserRole = async (data: UserRole[]) => {
        return await userRoleRepository.save(data);
    };

    public static deleteUserRoleByUserId = async(userId:number)=>{
        return await userRoleRepository.delete({userId:userId})
    }

    public static fetchRoleByRoleName = async (roleName: IRoles,userId:number) => {
        const role = await userRoleRepository.findOne({ where: { role:roleName ,userId:userId} }); //logic
        return role;
    };

    public static fetchRole = async(userId:number)=>{
        return await userRoleRepository.query(`
        SELECT u.*,r.roleId as rolesId 
        FROM user_role u 
        LEFT JOIN roles r on r.id = u.roleId
        where u.userId=${userId}`)
    }

    static getUserRoleById = async(userId)=>{
            const data = await userRoleRepository.query(
                `SELECT
                JSON_ARRAYAGG( JSON_OBJECT( 'roleId', roleId, 'roleName', role ) ) AS userRoles 
            FROM
                user_role 
            WHERE
                userId = ${userId}
            GROUP BY
                userId`
            )
            return data[0]
    }
}