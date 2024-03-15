import { AppDataSource } from '../../../data-source';
import { ExamSubject } from './exam-subject.model';



const examSubjectRepository = AppDataSource.getRepository(ExamSubject);

export default class ExamSubjectRepository {

    static fetchExamSubjects = async () => {
        const exam = await examSubjectRepository.find();
        return exam;
    }

    static updateExamSubject = async (data: object) => {
        const examSubject = await examSubjectRepository.save(data);
        return examSubject;
    };

    static fetchSubjects =async (examdId?:number) => {
        let query = `SELECT
        s.externalMax,
        s.externalMin,
        s.id,
        s.subjectCode,
        s.subjectName
     FROM
        subject s
        LEFT JOIN exam_subject es ON es.subjectId = s.id
        LEFT JOIN exam e ON e.id = es.examId`
         if(examdId) query +=' '+`where es.examId = ${examdId}`
         return await examSubjectRepository.query(query)
    }
}