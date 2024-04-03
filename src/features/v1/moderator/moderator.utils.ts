import { AppDataSource } from "../../../data-source";
import { jsonParser } from "../../../helpers/common.helpers";
import { Moderator } from "./moderator.model";

const moderator = AppDataSource.getRepository(Moderator);

export default class ModeratorUtils {

    static async saveModerator(data: object) {
        return await moderator.save(data);
    }

    static async getModerator() {
        const query = `SELECT 
            user.id AS userId,
            user.firstname,
            user.lastname,
            paper_setter.examId,
            exam.examCode,
            exam.examType,
            exam.month,
            exam.year,
            course.name AS courseName,
            semester.semName,
            CONCAT('[', GROUP_CONCAT(JSON_OBJECT('paperSetterId', paper_setter.id, 'subjectId', subject.id, 'subjectName', subject.name)), ']') AS subjects
        FROM
            paper_setter
        LEFT JOIN
            user ON paper_setter.userId = user.id
        LEFT JOIN
            subject ON paper_setter.subjectId = subject.id
            Left JOIN
            exam ON paper_setter.examId = exam.id
            Left JOIN
            course ON exam.courseId = course.id
            Left JOIN
            semester ON exam.semesterId = semester.id
        GROUP BY
            user.id , exam.id, paper_setter.examId;`;
        const data = await moderator.query(query);
        return jsonParser(data);
    }

    static async getModeratorByUserIdAndExamId(userId: number, examId: number) {
        const query = `SELECT 
        user.id AS userId,
        user.firstname,
        user.lastname,
        moderator.examId,
        exam.examCode,
        exam.examType,
        exam.month,
        exam.year,
        course.name AS courseName,
        semester.semName,
        CONCAT('[', GROUP_CONCAT(JSON_OBJECT('moderatorId', moderator.id, 'subjectId', subject.id, 'name', subject.name, 'oldSubjectCode', subject.oldSubjectCode,
        'subjectCode', subject.subjectCode, 'credits', subject.credits, 'subjectType', subject.subjectType
        )), ']') AS subjects
    FROM
    assign_moderator as moderator
    LEFT JOIN
        user ON moderator.userId = user.id
    LEFT JOIN
        subject ON moderator.subjectId = subject.id
    LEFT JOIN
        exam ON moderator.examId = exam.id
    LEFT JOIN
        course ON exam.courseId = course.id
    LEFT JOIN
        semester ON exam.semesterId = semester.id
    WHERE
        user.id = ${userId}
        AND
        exam.id = ${examId}
    GROUP BY
        user.id , exam.id, moderator.examId;`;
        const data = await moderator.query(query);
        if (data && data.length > 0) {
            return jsonParser(data[0]);
        }
        return []
    }

}