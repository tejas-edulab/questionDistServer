import { AppDataSource } from '../../../data-source';
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
        question_bank.*
    FROM 
        question_bank_module
    LEFT JOIN 
        question_bank ON question_bank_module.id = question_bank.subjectModuleId
    WHERE 
        question_bank_module.userId = ${userId} AND question_bank_module.subjectId = ${subjectId};
        `;
        const data = await questionBankModuleRepository.query(query);
        return data;
    }

    static getAllQuestionBankModule = async (subjectId: number) => {
        const query = `SELECT * FROM question_bank_module WHERE subjectId = ${subjectId}`;
        const data = await questionBankModuleRepository.query(query);
        return data;
    }

}