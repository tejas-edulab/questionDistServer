import { AppDataSource } from '../../../data-source';
import { Uploads } from './uploads.model';


const uploadsRepository = AppDataSource.getRepository(Uploads);

export default class UploadsRepository {
  static createUploads = async (data:any) => {    
    const uploadedFile = await uploadsRepository.save(data);
    return uploadedFile;
  };

  static fetchUploadsById = async (id: number) => {
    const data = await uploadsRepository.query(`select * from uploads where id=${id}`);
    if (data) return data[0];
    return false;
  };
}
