import { AppDataSource } from "../../../data-source";
import { jsonParser } from "../../../helpers/common.helpers";
import { AssignSME } from "./assignSME.model";

const assignSME = AppDataSource.getRepository(AssignSME);

export default class AssignMeUtils {

    static async saveAssignSME(data: object) {
        return await assignSME.save(data);
    }

    static async updateAssignSME(userId: number, subjectId: number) {
        const query = `UPDATE assign_sme SET subjectId = ${subjectId} WHERE userId = ${userId}`;
        return await assignSME.query(query);
    }

    static async getAssignSME() {
        const query = `SELECT * FROM assign_sme`;
        return await assignSME.query(query);
    }

    static async getAssignSMEByUserId(userId: number) {
        const query = `SELECT
        user.id AS userId,
        user.firstname,
        user.lastname,
        CONCAT('[', GROUP_CONCAT(JSON_OBJECT('assignSmeId', assign_sme.id, 'subjectId', subject.id, 'subjectName', subject.name)), ']') AS subjects
    FROM
        assign_sme
    LEFT JOIN
        user ON assign_sme.userId = user.id
    LEFT JOIN
        subject ON assign_sme.subjectId = subject.id
    WHERE
        user.id = ${userId}
    GROUP BY
        user.id;
        `;
        const data = await assignSME.query(query);
        return jsonParser(data);
    }
 
    static async deleteAssignSme(userId: number) {
        return await assignSME.delete({ userId })
    }

}