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

    static fetchAssignedExam() {
        const query = `SELECT DISTINCT
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
                exam AS e
                LEFT JOIN course AS c ON c.id = e.courseId
                LEFT JOIN semester AS s ON s.id = e.semesterId
                LEFT JOIN assign_paper_setter AS sps ON sps.examId = e.id
            WHERE
                sps.examId IS NOT NULL;`
        
        return examRepository.query(query)
    }
}