import  uploadFileMiddleware  from '../../../middlewares/multer';

  export const uploadExcel = (uploadDir?: string) => {
    return uploadFileMiddleware({
      basePath: process.cwd(),
      uploadDir,
      allowedExtensions: ['.xlsx', '.xlsm', '.xlsb', '.xltx','xls'],
    });
  };

  export const uploadPdf = (uploadDir?: string) => {
    return uploadFileMiddleware({
      basePath: process.cwd(),
      uploadDir,
      allowedExtensions: ['.pdf','.PDF'],
    });
  };
  
  export const uploadZip = (uploadDir?: string) => {
    return uploadFileMiddleware({
      basePath: process.cwd(),
      uploadDir,
      allowedExtensions: ['.zip'],
    });
  };
  
