import { AppDataSource } from "../../../data-source";
import { AssignPaperSetter } from "./assignPaperSetter.model";

const assignPaperSetter = AppDataSource.getRepository(AssignPaperSetter);

export default class AssignPaperSetterUtils {

    static async saveAssignPaperSetter(data: object) {
        return await assignPaperSetter.save(data);
    }

    static async getAssignPaperSetter() {
        const query = `SELECT * FROM assign_paper_setter`;
        return await assignPaperSetter.query(query);
    }
}