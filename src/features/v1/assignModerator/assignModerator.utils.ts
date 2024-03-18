import { AppDataSource } from "../../../data-source";
import { jsonParser } from "../../../helpers/common.helpers";
import { AssignModerator } from "./assignModerator.model";

const assignModeraotor = AppDataSource.getRepository(AssignModerator);

export default class AssignModeratorUtils {

    static async saveAssignModerator(data: object) {
        return await assignModeraotor.save(data);
    }

    static async getAssignModerator() {
        const query = `SELECT 
        user.id AS userId,
        user.firstname,
        user.lastname,
        assign_moderator.examId,
        exam.examCode,
        exam.examType,
        exam.month,
        exam.year,
        course.name AS courseName,
        semester.semName,
        CONCAT('[', GROUP_CONCAT(JSON_OBJECT('assignPaperSetterId', assign_moderator.id, 'subjectId', subject.id, 'subjectName', subject.name)), ']') AS subjects
    FROM
        assign_moderator
    LEFT JOIN
        user ON assign_moderator.userId = user.id
    LEFT JOIN
        subject ON assign_moderator.subjectId = subject.id
        Left JOIN
        exam ON assign_moderator.examId = exam.id
        Left JOIN
        course ON exam.courseId = course.id
        Left JOIN
        semester ON exam.semesterId = semester.id
    GROUP BY
        user.id , exam.id, assign_moderator.examId;`;
        const data = await assignModeraotor.query(query);
        return jsonParser(data);
    }

    static async getAssignedModeratorByUserIdAndExamId(userId: number, examId: number) {
        const query = `SELECT 
        user.id AS userId,
        user.firstname,
        user.lastname,
        assign_moderator.examId,
        exam.examCode,
        exam.examType,
        exam.month,
        exam.year,
        course.name AS courseName,
        semester.semName,
        CONCAT('[', GROUP_CONCAT(JSON_OBJECT('assignPaperSetterId', assign_moderator.id, 'subjectId', subject.id, 'subjectName', subject.name)), ']') AS subjects
    FROM
        assign_moderator
    LEFT JOIN
        user ON assign_moderator.userId = user.id
    LEFT JOIN
        subject ON assign_moderator.subjectId = subject.id
        Left JOIN
        exam ON assign_moderator.examId = exam.id
        Left JOIN
        course ON exam.courseId = course.id
        Left JOIN
        semester ON exam.semesterId = semester.id
    WHERE
        user.id = ${userId} AND exam.id = ${examId}
    GROUP BY
        user.id , exam.id;`;
        const data = await assignModeraotor.query(query);
        return jsonParser(data);
    }

    static async deleteAssignModerator(userId:number,examId:number){
        return await assignModeraotor.delete({userId,examId})
    }

}