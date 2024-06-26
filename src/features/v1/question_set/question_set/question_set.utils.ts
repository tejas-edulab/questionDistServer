
import { AppDataSource } from "../../../../data-source";
import { jsonParser } from "../../../../helpers/common.helpers";
import { QuestionSet } from "./question_set.model";

const questionSetRepository = AppDataSource.getRepository(QuestionSet);

export default class QuestionSetUtils {

    static async createQuestionSet(data: QuestionSet) {
        return await questionSetRepository.save(data);
    }

    static async updateUploadedPdfId(uploadPdf: number, id: number) {
        return await questionSetRepository.update({ id }, {
            uploadPdf
        });
    }

    static async getQuestionSetData(userId: number, subjectId: number, examId: number, questionSetId: number) {
        const query = `SELECT
        qs.questions AS questions,
        qs.setName AS setName,
        subject.subjectName AS subjectName
    FROM
        question_set AS qs
        LEFT JOIN subject AS subject ON qs.subjectId = subject.id
        LEFT JOIN exam AS exam ON exam.id = qs.examId 
    WHERE
        qs.userId = ${userId} 
        AND qs.subjectId = ${subjectId} 
        AND qs.examId = ${examId} 
        AND qs.id = ${questionSetId}`

        const data = await questionSetRepository.query(query);
        if (data && data.length > 0) {
            return jsonParser(data);
        }
        return []
    }

    static async getQuestionSetByUserIdExamAndSubjectId(userId: number, examId: number, subjectId: number) {
        const query = `SELECT
        question_set.id,
        question_set.setName,
        question_set.subjectId,
        question_set.examId,
        question_set.userId,
        question_set.createdAt,
        question_set.updatedAt,
        subject.subjectName AS subjectName,
        exam.examCode,
        exam.examType,
        exam.month,
        exam.year,
        user.firstname,
        user.lastname,
        question_set.questions
    FROM
        question_set
    LEFT JOIN
        subject ON question_set.subjectId = subject.id
    LEFT JOIN
        exam ON question_set.examId = exam.id
    LEFT JOIN
        user ON question_set.userId = user.id
    WHERE
        question_set.userId = ${userId}
        AND question_set.examId = ${examId}
        AND question_set.subjectId = ${subjectId};    
    `;
        console.log("query", query);

        const data = await questionSetRepository.query(query);
        if (data && data.length > 0) {
            return jsonParser(data);
        }
        return []
    }

    static async getQuestionSetByExamAndSubjectId(examId: number, subjectId: number) {
        const query = `SELECT
        question_set.id,
        question_set.setName,
        question_set.subjectId,
        question_set.examId,
        question_set.userId,
        question_set.uploadPdf,
        question_set.createdAt,
        question_set.updatedAt,
        subject.subjectName AS subjectName,
        exam.examCode,
        exam.examType,
        exam.month,
        exam.year,
        user.firstname,
        user.lastname,
        question_set.questions
    FROM
        question_set
    LEFT JOIN
        subject ON question_set.subjectId = subject.id
    LEFT JOIN
        exam ON question_set.examId = exam.id
    LEFT JOIN
        user ON question_set.userId = user.id
    WHERE
        question_set.examId = ${examId}
        AND question_set.subjectId = ${subjectId};    
    `;
        console.log("query", query);

        const data = await questionSetRepository.query(query);
        if (data && data.length > 0) {
            return jsonParser(data);
        }
        return []
    }


    static async getQuestionSet() {
        const query = `SELECT
        question_set.id,
        question_set.setName,
        question_set.subjectId,
        question_set.examId,
        question_set.userId,
        question_set.createdAt,
        question_set.updatedAt,
        subject.subjectName AS subjectName,
        exam.examCode,
        exam.examType,  
        exam.month,
        exam.year,
        user.firstname,
        user.lastname
    FROM
        question_set
    LEFT JOIN
        subject ON question_set.subjectId = subject.id
    LEFT JOIN
        exam ON question_set.examId = exam.id
    LEFT JOIN
        user ON question_set.userId = user.id
    GROUP BY
        question_set.setName, question_set.userId`;

        const data = await questionSetRepository.query(query);
        return data;
    }

    static async getQuestionSetById(id: number) {
        const query = `SELECT
        question_set.id,
        question_set.setName,
        question_set.subjectId,
        question_set.examId,
        question_set.userId,
        question_set.createdAt,
        question_set.updatedAt,
        subject.subjectName AS subjectName,
        exam.examCode,
        exam.examType,
        exam.month,
        exam.year,
        user.firstname,
        user.lastname,
        question_set.questions
    FROM
        question_set
    LEFT JOIN
        subject ON question_set.subjectId = subject.id
    LEFT JOIN
        exam ON question_set.examId = exam.id
    LEFT JOIN
        user ON question_set.userId = user.id
    WHERE
        question_set.id = ${id}`;

        const data = await questionSetRepository.query(query);
        if (data && data.length > 0) {
            return jsonParser(data[0]);
        }
        return {}
    }

}