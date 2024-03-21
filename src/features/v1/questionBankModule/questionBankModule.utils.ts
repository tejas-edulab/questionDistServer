import { AppDataSource } from '../../../data-source';
import { QuestionBankModule } from './questionBankModule.model';


const questionBankModuleRepository = AppDataSource.getRepository(QuestionBankModule);

export default class QuestionBankModuleUtils {

    static saveQuestionBankModule = async (data: QuestionBankModule) => {
        return await questionBankModuleRepository.save(data);
    }

    static getQuestionBankModuleByUserId = async (userId: number, subjectId: number) => {
        const query = `SELECT * FROM question_bank_module WHERE userId = ${userId} AND subjectId = ${subjectId}`;
        const data = await questionBankModuleRepository.query(query);
        return data;
    }

    static getAllQuestionBankModule = async (subjectId: number) => {
        const query = `SELECT * FROM question_bank_module WHERE subjectId = ${subjectId}`;
        const data = await questionBankModuleRepository.query(query);
        return data;
    }

}