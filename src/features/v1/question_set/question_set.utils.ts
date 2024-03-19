import { AppDataSource } from "../../../data-source";
import { jsonParser } from "../../../helpers/common.helpers";
import { QuestionSetNew } from "./question_set.model";

const questionSetRepository = AppDataSource.getRepository(QuestionSetNew);

export default class QuestionSetUtils {

    static async createQuestionSet(data:QuestionSetNew[]){
        return await questionSetRepository.save(data);
    }
   

}