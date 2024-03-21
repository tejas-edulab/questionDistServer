import { AppDataSource } from '../../../data-source';
import { jsonParser } from '../../../helpers/common.helpers';
import { QuestionBankModule } from './questionBankModule.model';


const questionBankModuleRepository = AppDataSource.getRepository(QuestionBankModule);

export default class QuestionBankModuleUtils {

    static saveQuestionBankModule = async (data: QuestionBankModule) => {
        return await questionBankModuleRepository.save(data);
    }

    static getQuestionBankModuleByUserId = async (userId: number, subjectId: number) => {
        const query = `SELECT
        COUNT(question_bank.id) AS createdQuestions,
        question_bank_module.*,
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
                        'userId', question_bank.userId
                    )
                )
                FROM question_bank
                WHERE question_bank.subject = question_bank_module.subjectId AND question_bank.userId =  ${userId}
            ),
            JSON_ARRAY()
        ) AS questionBankData
    FROM
        question_bank_module
    LEFT JOIN
        question_bank ON question_bank_module.id = question_bank.subjectModuleId
    WHERE
        question_bank_module.userId = ${userId} AND question_bank_module.subjectId = ${subjectId};` ;
        const data = await questionBankModuleRepository.query(query);
        return data?.length > 0 ? jsonParser(data) : [];
    }

    static getAllQuestionBankModule = async (subjectId: number) => {
        const query = `SELECT
        COUNT(question_bank.id) AS createdQuestions,
        question_bank_module.*,
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
                        'userId', question_bank.userId
                    )
                )
                FROM question_bank
                WHERE question_bank.subject = question_bank_module.subjectId 
            ),
            JSON_ARRAY()
        ) AS questionBankData
    FROM
        question_bank_module
    LEFT JOIN
        question_bank ON question_bank_module.id = question_bank.subjectModuleId
    WHERE
        question_bank_module.subjectId = ${subjectId};` ;
        const data = await questionBankModuleRepository.query(query);
        return data.length > 0 ? jsonParser(data) : [];
    }

}