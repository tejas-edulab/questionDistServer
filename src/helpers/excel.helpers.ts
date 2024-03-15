
import * as XLSX  from 'xlsx';

  export const generateExcelFile = (data: object[]): Promise<Buffer> => {

    // Create a new workbook
    const workbook = XLSX.utils.book_new();
  
    // Create a new worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);
  
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  
    // Write the workbook to a buffer
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
  
    return excelBuffer;
  };
