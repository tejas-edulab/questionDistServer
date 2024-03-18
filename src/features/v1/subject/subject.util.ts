import { AppDataSource } from '../../../data-source';
import Subject from './subject.model';

const subjectRepository = AppDataSource.getRepository(Subject);

export default class SubjectRepository {

    static fetchSubjectBySubjectCode = async (subjectCode: string) => {
        const subject = await subjectRepository.findOne({
            where: {
                subjectCode: subjectCode
            }
        })
        return subject;
    }

    static async fetchSubjectById(subjectId: number) {
        const query = `SELECT * FROM subject WHERE id = ${subjectId}`;
        const data = await subjectRepository.query(query);
        return data[0];
    }

    static fetchAllSubjects = async () => {
        const query = `SELECT * FROM subject`;
        return await subjectRepository.query(query);
    }

    static async getSubjectById(subjectId: number) {
        const query = `SELECT * FROM subject WHERE id = ${subjectId}`;
        const data = await subjectRepository.query(query);
        return data[0];
    }

}