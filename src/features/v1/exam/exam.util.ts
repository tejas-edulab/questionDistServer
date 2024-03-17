import { query } from 'express';
import { AppDataSource } from '../../../data-source';
import { Exam } from './exam.model';


const examRepository = AppDataSource.getRepository(Exam);

export default class ExamRepository {

    static fetchExams = async () => {
        const exam = await examRepository.find();
        return exam;
    }

    static fetchExamByExamCode = async (examCode: string) => {
        const exam = await examRepository.findOne({
            where: {
                examCode: examCode
            }
        })
        return exam;
    }

    static fetchExam = async () => {
        const query = `SELECT
        e.*,
        CONCAT(
            e.examType,
            ' ',
            e.MONTH,
            ' ',
            e.YEAR,
            ' ',
            c.name,
            ' ',
            s.semName 
        ) AS examName 
    FROM
        exam as e
        LEFT JOIN course c ON c.id = e.courseId
        LEFT JOIN semester s ON s.id = e.semesterId;`
        return examRepository.query(query)
    }
}