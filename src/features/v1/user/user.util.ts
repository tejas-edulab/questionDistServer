import { AppDataSource } from "../../../data-source";
import { jsonParser } from "../../../helpers/common.helpers";
import { User } from "./user.model";
import { IRoles, IfetchMultiUser } from "./user.types";

const userRepostory = AppDataSource.getRepository(User);

export default class UserRepository {
  public static async fetchUsers() {
    return await userRepostory.find();
  }

  public static async findUserByUserId(userId: string) {
    return await userRepostory.findOne({ where: { userId } });
  }

  public static async getUserDataById(userId: string) {
    const query = `SELECT
        user.id,
        user.firstName,
        user.lastName,
        user.email,
        user.username,
        user.userId,
        JSON_ARRAYAGG(JSON_OBJECT('roleId', user_role.roleId, 'roleName', user_role.role)) AS role
    FROM
        user
    LEFT JOIN user_role ON user.id = user_role.userId
    WHERE
        user.userId = '${userId}'
    group by
        user.id
        `;
    const data = await userRepostory.query(query);
    if (data && data.length > 0) {
      return data[0];
    } else {
      return null;
    }
  }

  public static async findUserById(id: number) {
    return await userRepostory.findOne({ where: { id } });
  }

  static findUserByEmail = async (email: string) => {
    const user = await userRepostory.findOne({ where: { email } });
    return user;
  };
  static addUser = async (firstname: string, lastname: string, email: string, username: string) => {
    const user = new User();
    user.firstName = firstname;
    user.lastName = lastname;
    user.email = email;
    // user.isDelete = isDelete;
    // user.role = role;
    user.username = username;

    const createdUser = await userRepostory.save(user);
    return createdUser;
  };

  // static updateUser = async (email: string, firstName: string, lastName: string, roles: IRoles, userId?: string, collegeId?: number) => {
  //   const user = await this.findUserByEmail(email);
  //   if (!user) {
  //     return "user not found";
  //   }

  //   user.firstName = firstName;
  //   user.lastName = lastName;
  //   user.role = roles;
  //   user.userId = userId || "";
  //   // user.collegeId = collegeId as unknown as College || null;

  //   const data = await userRepostory.save(user);
  //   return data;
  // };

  static updateUser = async (email: string, firstName: string, lastName: string, userId?: string, collegeId?: number) => {
    const user = await this.findUserByEmail(email);
    if (!user) {
      return "user not found";
    }
    user.firstName = firstName;
    user.lastName = lastName;
    user.userId = userId || "";
    // user.collegeId = collegeId as unknown as College || null;
    const data = await userRepostory.save(user);
    return data;
  };
  static updateRoleData = async (email: string, role: IRoles) => {
    const user = await this.findUserByEmail(email);
    if (!user) {
      return "user not found";
    }
    user.role = role;
    const data = await userRepostory.save(user);
    return data;
  };

  static updateUserIdData = async (email: string, id: string) => {
    const user = await this.findUserByEmail(email);
    if (!user) {
      return "user not found";
    }
    user.userId = id;
    const data = await userRepostory.save(user);
    return data;
  };

  static deleteUserByEmail = async (email: string) => {
    const user = await userRepostory.delete({ email });
    return user;
  };

  static fetchEvaluatorByRole = async (role) => {
    return userRepostory.find({ where: { role } });
  };

  static fetchMultiUser = async () => {
    const query = `
    SELECT 
        u.id,
		u.firstName,
		u.lastName,
		u.email,
		u.username, 
        JSON_ARRAYAGG(
           JSON_OBJECT('roleId', ur.roleId, 'roleName', ur.role)
        ) AS rolesInfo
    FROM 
        user u 
    LEFT JOIN 
        user_role ur ON ur.userid = u.id 
    GROUP BY 
    u.id;
        `;
    const data = (await userRepostory.query(query)) as IfetchMultiUser[];

    const resData = data.map((item) => {
      item.rolesInfo = jsonParser(item.rolesInfo);
      return item;
    });

    return resData;
  };

  static fetchSingleUserById = async (id: number) => {
    const query = `
    SELECT 
        u.id,
		u.firstName,
		u.lastName,
		u.email,
		u.username, 
        JSON_ARRAYAGG(
           JSON_OBJECT('roleId', ur.roleId, 'role', ur.role)
        ) AS roleInfo
    FROM 
        user u 
    LEFT JOIN 
        user_role ur ON ur.userid = u.id 
      WHERE u.id = ${id}
    GROUP BY 
    u.id ;
        `;

    console.log(query);
    const data = (await userRepostory.query(query)) as IfetchMultiUser[];

    if (data.length === 0) return false;

    const resData = data.map((item) => {
      item.roleInfo = jsonParser(item.roleInfo);
      return item;
    });

    return resData[0];
  };
}
