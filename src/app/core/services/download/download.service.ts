import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';


const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';


const EXCEL_EXTENSION = '.xlsx';




@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor( private http: HttpClient) { }


  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'summary': worksheet }, SheetNames: ['summary'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
     const dataSource: Blob = new Blob([buffer], {type: EXCEL_TYPE});
     FileSaver.saveAs(dataSource, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);
  }
  }

