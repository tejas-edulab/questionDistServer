import { AppDataSource } from '../../../data-source';
import { User } from './user.model';
import { IRoles } from './user.types'

const userRepostory = AppDataSource.getRepository(User);

export default class UserRepository {

    public static async fetchUsers() {
        return await userRepostory.find();
    }

    public static async findUserByUserId(userId: string) {
        return await userRepostory.findOne({ where: { userId } });
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

    static updateUser = async (email: string, firstName: string, lastName: string, roles: IRoles, userId?: string, collegeId?: number) => {
        const user = await this.findUserByEmail(email);
        if (!user) { return ('user not found'); }

        user.firstName = firstName;
        user.lastName = lastName;
        user.role = roles;
        user.userId = userId || '';
        // user.collegeId = collegeId as unknown as College || null;

        const data = await userRepostory.save(user);
        return data;
    };

    static updateRoleData = async (email: string, role: IRoles) => {
        const user = await this.findUserByEmail(email);
        if (!user) {
            return ('user not found');
        }
        user.role = role;
        const data = await userRepostory.save(user);
        return data;
    };

    static updateUserIdData = async (email: string, id: string) => {
        const user = await this.findUserByEmail(email);
        if (!user) {
            return ('user not found');
        }
        user.userId = id;
        const data = await userRepostory.save(user);
        return data;
    };

    static deleteUserByEmail = async (email: string) => {
        const user = await userRepostory.delete({ email });
        return user;
    };

    static fetchEvaluatorByRole = async (role) =>{
        return userRepostory.find({where:{role}})
    }


}
