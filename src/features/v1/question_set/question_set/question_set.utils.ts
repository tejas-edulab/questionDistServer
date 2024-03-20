
import { AppDataSource } from "../../../../data-source";
import { QuestionSet } from "./question_set.model";

const questionSetRepository = AppDataSource.getRepository(QuestionSet);

export default class QuestionSetUtils {

    static async createQuestionSet(data: QuestionSet) {
        return await questionSetRepository.save(data);
    }


}