import { AppDataSource } from "../../../data-source";
import { jsonParser } from "../../../helpers/common.helpers";
import { PaperSetter } from "./paper-setter.model";

const paperSetter = AppDataSource.getRepository(PaperSetter);

export default class PaperSetterUtils {

    static async savePaperSetter(data: object) {
        return await paperSetter.save(data);
    }

    static async getPaperSetter() {
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
        const data = await paperSetter.query(query);
        return jsonParser(data);
    }

    static async getPaperSetterByUserIdAndExamId(userId: number, examId: number) {
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
        LEFT JOIN
            exam ON paper_setter.examId = exam.id
        LEFT JOIN
            course ON exam.courseId = course.id
        LEFT JOIN
            semester ON exam.semesterId = semester.id
        WHERE
            user.id = ${userId}
            AND
            exam.id = ${examId}
        GROUP BY
            user.id , exam.id, paper_setter.examId;`;
        const data = await paperSetter.query(query);
        return jsonParser(data);

    }

}