export interface ICellError {
    columnName: string | number,
    message: string
  }
export interface IExcelParseError {
    srNo: number,
    errors: ICellError[]
  }

export interface IZipParser {
    fileName:string,
    errors:string[]
  }
  