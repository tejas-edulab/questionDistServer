import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import { examIds } from './examData';
import ExamSubjectRepository from '../exam/exam-subject.util';



export default class ScriptController {

    public static async populateExamSubject(req: Request, res: Response, next: NextFunction) {
        try {
            // eslint-disable-next-line max-len
            const token = ''
            const api = 'https://stagehsncuexam.studentscenter.in/api/v1/exam/subjects-by-exam?examId='
            

            const success = [];
            const failed = [];
        
            for(let i =0; i<examIds.length; i ++){
                try {
                    const exam = examIds[i];
                    const response = await axios.get(`${api}${exam.id}`, {
                        headers: {
                          'Authorization': `Bearer ${token}`
                        }
                      })
                    
                    if(response.status===200){
                        for(let j =0; j <response.data.data.length; j++){
                            const subject = response.data.data[j];
                            const obj = {
                                subjectCode: subject.subjectCode,
                                examCode: exam.examCode
                            }
                          await  ExamSubjectRepository.updateExamSubject(obj)
                        }
                        success.push(examIds[i])

                    }
                } catch (error) {
                    failed.push(examIds[i])
                }
            }

            res.status(200).json({ status: true,  success,failed, error: null })
        } catch (error) {
            next(error);
        }
    }
}