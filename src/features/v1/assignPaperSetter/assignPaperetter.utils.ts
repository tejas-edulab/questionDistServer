import { AppDataSource } from "../../../data-source";
import { jsonParser } from "../../../helpers/common.helpers";
import { AssignPaperSetter } from "./assignPaperSetter.model";

const assignPaperSetter = AppDataSource.getRepository(AssignPaperSetter);

export default class AssignPaperSetterUtils {

    static async saveAssignPaperSetter(data: object) {
        return await assignPaperSetter.save(data);
    }

    static async getAssignPaperSetterByUserId(userId: number) {
        const query = `SELECT 
        user.id AS userId,
        user.firstname,
        user.lastname,
        assign_paper_setter.examId,
        exam.examCode,
        exam.examType,
        exam.month,
        exam.year,
        course.name AS courseName,
        semester.semName,
        CONCAT('[', GROUP_CONCAT(JSON_OBJECT('assignPaperSetterId', assign_paper_setter.id, 'subjectId', subject.id, 'subjectName', subject.name)), ']') AS subjects
    FROM
        assign_paper_setter
    LEFT JOIN
        user ON assign_paper_setter.userId = user.id
    LEFT JOIN
        subject ON assign_paper_setter.subjectId = subject.id
        Left JOIN
        exam ON assign_paper_setter.examId = exam.id
        Left JOIN
        course ON exam.courseId = course.id
        Left JOIN
        semester ON exam.semesterId = semester.id
    WHERE
        user.id = ${userId}
    GROUP BY
        user.id;
        `;
        const data = await assignPaperSetter.query(query);
        return jsonParser(data);
    }

    static async getAssignPaperSetterByUserIdAndExamId(userId: number, examId: number) {
        const query = `SELECT 
        user.id AS userId,
        user.firstname,
        user.lastname,
        assign_paper_setter.examId,
        exam.examCode,
        exam.examType,
        exam.month,
        exam.year,
        course.name AS courseName,
        semester.semName,
        CONCAT('[', GROUP_CONCAT(JSON_OBJECT('assignPaperSetterId', assign_paper_setter.id, 'subjectId', subject.id, 'subjectName', subject.name)), ']') AS subjects
    FROM
        assign_paper_setter
    LEFT JOIN
        user ON assign_paper_setter.userId = user.id
    LEFT JOIN
        subject ON assign_paper_setter.subjectId = subject.id
        Left JOIN
        exam ON assign_paper_setter.examId = exam.id
        Left JOIN
        course ON exam.courseId = course.id
        Left JOIN
        semester ON exam.semesterId = semester.id
    WHERE
        user.id = ${userId}
        AND exam.id = ${examId}
    GROUP BY
        user.id;
        `;
        const data = await assignPaperSetter.query(query);
        return jsonParser(data);
    }



    static async getAssignPaperSetter() {
        const query = `SELECT 
        user.id AS userId,
        user.firstname,
        user.lastname,
        assign_paper_setter.examId,
        exam.examCode,
        exam.examType,
        exam.month,
        exam.year,
        course.name AS courseName,
        semester.semName,
        CONCAT('[', GROUP_CONCAT(JSON_OBJECT('assignPaperSetterId', assign_paper_setter.id, 'subjectId', subject.id, 'subjectName', subject.name)), ']') AS subjects
    FROM
        assign_paper_setter
    LEFT JOIN
        user ON assign_paper_setter.userId = user.id
    LEFT JOIN
        subject ON assign_paper_setter.subjectId = subject.id
        Left JOIN
        exam ON assign_paper_setter.examId = exam.id
        Left JOIN
        course ON exam.courseId = course.id
        Left JOIN
        semester ON exam.semesterId = semester.id
    GROUP BY
        user.id , exam.id;
        `;
        const data = await assignPaperSetter.query(query);
        return jsonParser(data);
    }
}