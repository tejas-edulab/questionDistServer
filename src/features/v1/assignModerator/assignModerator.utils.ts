import { AppDataSource } from "../../../data-source";
import { AssignModerator } from "./assignModerator.model";

const assignModeraotor = AppDataSource.getRepository(AssignModerator);

export default class AssignModeratorUtils {

    static async saveAssignModerator(data: object) {
        return await assignModeraotor.save(data);
    }

    static async getAssignModerator() {
        const query = `SELECT * FROM assign_moderator`;
        return await assignModeraotor.query(query);
    }
}