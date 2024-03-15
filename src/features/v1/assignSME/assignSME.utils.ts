import { AppDataSource } from "../../../data-source";
import { AssignSME } from "./assignSME.model";

const assignSME = AppDataSource.getRepository(AssignSME);

export default class AssignMeUtils {

    static async saveAssignSME(data: object) {
        return await assignSME.save(data);
    }

    static async getAssignSME() {
        const query = `SELECT * FROM assign_sme`;
        return await assignSME.query(query);
    }
}