import * as fs from 'fs';
import decompress, { DecompressedFile } from 'decompress';
import { IZipParser } from '../types/error.types';
import path from 'path';



export function snakeCaseToCamelCaseKey(input: { [key: string]: any }[]): { [key: string]: any }[] {
  return input.map(obj => {
    const newObj: { [key: string]: any } = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        // In this line the regular expression detect the underscore ("_") and with one later and replace this into Upper case. 
        // eg. EXAM_CODE to examCode  this is for above e.g. =>  _c to C 
        const camelCaseKey = key.toLowerCase().replace(/_([a-z])/g, (_, group) => group.toUpperCase());
        newObj[camelCaseKey] = obj[key];
      }
    }
    return newObj;
  });
}

export function jsonParser(data: Array<any> | object | string): any {
  const json: string = JSON.stringify(data);
  return JSON.parse(json, (key: string, value: any) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch (error) {
        return value;
      }
    }
    return value;
  });
}

export function isProperNumber(value: string): boolean {
  return !Number.isNaN(parseFloat(value)) && Number.isFinite(Number(value));
}
export function mkdirRecursive(folderPath: string) {
  // Check if the directory already exists
  if (!fs.existsSync(folderPath)) {
    // If not, create the directory
    fs.mkdirSync(folderPath, { recursive: true });
  }
}

/**
 * Decompress a .zip file to a specified destination folder.
 * @param {string} zipFilePath - Path to the .zip file.
 * @param {string} destinationFolder - Path to the destination folder for decompression.
 * @returns {Promise<string[]>} - Promise resolving to an array of decompressed file paths.
 */
export async function extractZip(zipFilePath: string, destinationFolder: string): Promise<DecompressedFile[]> {
  try {
    const decompressedFiles: DecompressedFile[] = await decompress(zipFilePath, destinationFolder);
    return decompressedFiles
  } catch (error) {
    console.error('Error during decompression:', error.message);
    throw error;
  }
}


export function getImageLocation(destination: string, filename: string): string {
  let folderLocation = destination.split('\\');
  const uploadsIndex = folderLocation.indexOf('uploads');
  if (uploadsIndex !== -1) {
    folderLocation = folderLocation.slice(uploadsIndex + 1);
  }
  // If 'uploads' is not found, return the original array


  return path.join(process.cwd(), 'uploads',...folderLocation ,filename);
}
