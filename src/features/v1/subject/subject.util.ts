import { AppDataSource } from '../../../data-source';
import Subject from './subject.model';



const subjectRepository = AppDataSource.getRepository(Subject);

export default class SubjectRepository {

    static fetchSubjectBySubjectCode = async(subjectCode:string)=>{
        const subject = await subjectRepository.findOne({
            where:{
                subjectCode:subjectCode
            }
        })
        return subject;
    }

   
}