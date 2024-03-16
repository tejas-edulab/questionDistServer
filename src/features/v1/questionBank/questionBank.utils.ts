import { AppDataSource } from "../../../data-source";
import { QuestionBank } from "./questionBank.model";

const questionBankRepository = AppDataSource.getRepository(QuestionBank);

export default class QuestionBankUtils {

    static async saveQuestionBank(data: QuestionBank[]) {
        return await questionBankRepository.save(data);
    }


}