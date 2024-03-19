import { AppDataSource } from "../../../data-source";
import { jsonParser } from "../../../helpers/common.helpers";
import { QuestionBank } from "./questionBank.model";


const questionBankRepository = AppDataSource.getRepository(QuestionBank);

export default class QuestionBankUtils {

    static async saveQuestionBank(data: QuestionBank[]) {
        return await questionBankRepository.save(data);
    }

    static async getQuestionBank(userId: number) {
        // get the subjects from assign_sme for the user and then get the questions from question bank for the subjects group by subject
        const query = `
        SELECT 
        assign_sme.subjectId,
        subject.name,
        subject.oldSubjectCode,
        subject.subjectCode,
        subject.credits,
        subject.subjectType,
        subject.subjectTypeStatus,
        COALESCE(
            (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', question_bank.id,
                        'label', question_bank.label,
                        'marks', question_bank.marks,
                        'questionContent', question_bank.questionContent,
                        'questionIndex', question_bank.questionIndex,
                        'subject', question_bank.subject,
                        'topic', question_bank.topic,
                        'type', question_bank.type,
                        'userId', question_bank.userId,
                        'subjectName', subject.name
                    )
                )
                FROM question_bank
                WHERE subject.id = question_bank.subject AND question_bank.userId = ${userId}
            ),
            JSON_ARRAY()
        ) AS questionBankData
    FROM 
        assign_sme
    LEFT JOIN 
        subject ON assign_sme.subjectId = subject.id
    WHERE 
        assign_sme.userId = ${userId}
    GROUP BY 
        assign_sme.subjectId;
    
`;

        const data = await questionBankRepository.query(query);
        return jsonParser(data);


    }

    static async getQuestionBankBySubject(subject: number, userId: number) {
        const query = `SELECT
        question_bank.id,
        question_bank.label,
        question_bank.marks,
        question_bank.questionContent,
        question_bank.questionIndex,
        question_bank.subject,
        question_bank.topic,
        question_bank.type,
        question_bank.userId,
        subject.name AS subjectName,
        question_bank.questionLevel
    FROM
        question_bank
    LEFT JOIN
        subject ON question_bank.subject = subject.id
    WHERE
        question_bank.subject = ${subject}
        AND question_bank.userId = ${userId}
    `;
        const data = await questionBankRepository.query(query);
        if (data && data.length > 0) {
            return jsonParser(data);
        }
        return [];

    }

    static async fetchQuestionBankBySubjectAndUser(subject: number, userId: number) {
        return await questionBankRepository.findOne({ where: { subject, userId } })
    }

    static async deleteQuestionBankById(id:number){
        return await questionBankRepository.delete({id})
    }

}