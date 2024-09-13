import { utils, write } from "xlsx";
import { saveAs } from "file-saver";

export const exportToCSV = (data: any[], filename: string) => {
  const csvData = data.map((row) => ({
    Name: row.name,
    Username: row.username,
    Email: row.email,
    Phone: row.phone,
  }));
  
  const worksheet = utils.json_to_sheet(csvData);
  const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
  const csvOutput = write(workbook, { bookType: "csv", type: "array" });
  const blob = new Blob([csvOutput], { type: "text/csv;charset=utf-8;" });

  saveAs(blob, `${filename}.csv`);
};

export const exportToExcel = (data: any[], filename: string) => {
  const worksheet = utils.json_to_sheet(data);
  const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
  const excelBuffer = write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(blob, `${filename}.xlsx`);
};
