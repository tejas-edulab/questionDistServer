import { AppDataSource } from '../../../data-source';
import { QuestionBankModule } from './questionBankModule.model';


const questionBankModuleRepository = AppDataSource.getRepository(QuestionBankModule);

export default class QuestionBankModuleUtils {

    static saveQuestionBankModule = async (data: QuestionBankModule) => {
        return await questionBankModuleRepository.save(data);
    }

}