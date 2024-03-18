import { AppDataSource } from "../../../data-source";
import { jsonParser } from "../../../helpers/common.helpers";
import { QuestionBank } from "./questionBank.model";

// import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"
// @Entity()
// export class QuestionBank {

//     @PrimaryGeneratedColumn()
//     id: number

//     @Column()
//     label: string

//     @Column()
//     marks: number

//     @Column()
//     questionContent:string

//     @Column()
//     questionIndex:string

//     @Column()
//     subject:number

//     @Column()
//     topic:string

//     @Column()
//     type:string

//     @Column()
//     userId:number

//     @CreateDateColumn()
//     createdAt: Date;

//     @UpdateDateColumn()
//     updatedAt: Date;

// }


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
        JSON_ARRAYAGG(
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
        ) AS questionBankData
    FROM 
        assign_sme
    LEFT JOIN 
        subject ON assign_sme.subjectId = subject.id
    LEFT JOIN 
        question_bank ON subject.id = question_bank.subject
    LEFT JOIN 
        user ON question_bank.userId = user.id
    WHERE 
        assign_sme.userId = ${userId} 
    GROUP BY 
        assign_sme.subjectId;
`;

        const data = await questionBankRepository.query(query);
        return jsonParser(data);


    }

    static async fetchQuestionBankBySubjectAndUser(subject:number,userId:number){
        return await questionBankRepository.findOne({where:{subject,userId}})
    }

}