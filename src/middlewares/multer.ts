import fs from 'fs';
import path from 'path';
import multer, { Multer , diskStorage } from 'multer';
import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'joi';
import { mkdirRecursive } from '../helpers/common.helpers';

const multerUniqueFileName = (file: Express.Multer.File) => {
  const extension = path.extname(file.originalname);
  return `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`;
};

const uploadFileMiddleware = (config: { basePath: string; uploadDir?: string; allowedExtensions: string | string[]; }) => {
  const defaultUploadDir = 'uploads'; // Set your default folder here
  const uploadDir = config.uploadDir || defaultUploadDir;
  const uploadPath = path.join(config.basePath, uploadDir);
  return createUploadMiddleware(uploadPath, (file) => {
    mkdirRecursive(uploadPath)
    const extension = path.extname(file.originalname);
    if (Array.isArray(config.allowedExtensions)) {
      return config.allowedExtensions.includes(extension);
    } else {
      return extension === config.allowedExtensions;
    }
  });
};

const createUploadMiddleware = (destination: string, fileFilter: (file: Express.Multer.File) => boolean, generateFilename?: (req: Request, file: Express.Multer.File) => Promise<string>) => {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }
  return multer({
    storage: diskStorage({
      destination(req: Request, file: Express.Multer.File, cb) {
        cb(null, destination);
      },
      filename: async (req: Request, file: Express.Multer.File, cb) => {
        try {
          let fileName: string;
          if (!generateFilename) {
            fileName = multerUniqueFileName(file);
            cb(null, fileName);
          } else {
            fileName = await generateFilename(req, file);
            cb(null, fileName);
          }
        } catch (error) {
          cb(error as ValidationError, '');
        }
      },
    }),
    fileFilter: (req: Request, file: Express.Multer.File, cb) => {
      if (fileFilter(file)) {
        cb(null, true);
      } else {
        cb(null, false);
        cb(new Error('This file format not allowed!'));
      }
    },
  });
};

export default uploadFileMiddleware;