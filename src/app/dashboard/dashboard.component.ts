import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DashboardListInnerItems, DashboardSummary, ScanData, Status, SummaryParams } from '../core/models/atk.model';
import { Message, MessageTypes } from '../core/models/message.model';
import { ATKService } from '../core/services/atk/atk.service';
import { AuthService } from '../core/services/auth/auth.service';
import { DownloadService } from '../core/services/download/download.service';
import { LogService } from '../core/services/log/log.service';
import { MappingService } from '../core/services/mapping/mapping.service';
import { UIService } from '../core/services/ui/ui.service';

declare const animateValue: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger("detailExpand", [
      state(
        "collapsed",
        style({ height: "0px", minHeight: "0", visibility: "hidden" })
      ),
      state("expanded", style({ height: "*", visibility: "visible" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
    ]),
  ]
})

export class DashboardComponent implements OnInit {

  lastScanSummaryList: DashboardSummary[] = [];
  scanData: ScanData = new ScanData();
  params: SummaryParams = new SummaryParams();
  goodScans: any;
  badScans: any;
  totalScans: any;
  verifiedSMS: any;
  alreadyScanned: any
  isSpinner = false;
  isCardSpinner = false;

  paCount = 0;
  // pageEvent: PageEvent;
  pageIndex = 0;
  pageSize = 10; // by default
  pageEvent: PageEvent;
  length: number = 0;
  pagination = 0;
  paginations = [];
  pageSizeOptions = [5, 10, 25, 50, 100];

  expandedElement: any;
  isExpansionDetailRow = (i: number, row: Object) => true;

  @ViewChild(MatPaginator, {}) paginator: MatPaginator;
  displayedColumns = [
    "sNo",
    "productName",
    // "mobileNo",
    "batchNo",
    // "serialNo",
    "scanLocation",
    "scanDate",
    "mobileNo",
    "status",
    "scanMethod",
    "actions"
  ];

  dataSource = new MatTableDataSource<DashboardSummary>(
    this.lastScanSummaryList
  );

  statusList: Status[] = [
    {code: "Ok", name: "Ok"},
    {code: "AlreadyScanned", name: "Already Scanned"},
    {code: "NotPrinted", name: "Not Printed"},
    {code: "NotActivated", name: "Not Activated"},
    {code: "NotApplied", name: "Not Applied"},
    {code: "Destroyed", name: "Destroyed"},
    {code: "Recalled", name: "Recalled"},
    {code: "Fake", name: "Fake"},
  ];

  scanType: Status[] = [
    {code: "Qr", name: "QR"},
    {code: "Sms", name: "SMS"},
    {code: "Serial", name: "Serial"}
  ];
  statusFilterObj: string = null;
  scanTypeFilterObj: string = null;
  startDate: any = null;
  endDate: any = null;
  keyword: string = null;
  datas: [];

  constructor(
    private _atkService: ATKService,
    private _logService: LogService,
    private _uiService: UIService,
    private _mappingService: MappingService,
    private _authService: AuthService,
    private renderer: Renderer2,
    private router: Router,
    private download : DownloadService
  ) { }

  ngOnInit(): void {
    this.loadScanInfoSummaryList();
    this.loadScanSummary();
    this.applyFilters();
    let item = localStorage.getItem('dash');
    // this._logService.logMessage("dashitem");
    // this._logService.logMessage(item);
    if (item != null) {
      localStorage.removeItem('dash');
      location.reload();
    }
   
    // const data = JSON.parse(sessionStorage.getItem("datas"));
    const data = sessionStorage.getItem("datas");
    if(data !==null){
      
      this.datas = JSON.parse(data);

      
   
    // console.log('here',data);
  }
  // window.sessionStorage.removeItem("datas");
  // window.sessionStorage.removeItem("scantype");
  // window.sessionStorage.removeItem("status");

  // window.sessionStorage.removeItem("from");
  // window.sessionStorage.removeItem("end");



  // window.sessionStorage.removeItem("datas");

  




    // let data =  localStorage.getItem('data');

    // this.dataSource.data= JSON.parse(localStorage.getItem('data'));


  }

  ngAfterViewChecked() {
    this.hideGlobalSpinner();
  }

  hideGlobalSpinner() {
    let globalSpinner = this.renderer.selectRootElement('#globalspinner');
    this.renderer.setStyle(globalSpinner, 'display', 'none');
  }


  async loadScanInfoSummaryList() {
    const msg = new Message();
    this.isSpinner = true;
    this.lastScanSummaryList = [];
    this.paginations = [];
    this.pagination = 0;
    this.length = 0;
    this.dataSource = new MatTableDataSource<DashboardSummary>(
      this.lastScanSummaryList
    );
    let res: any = await this._atkService.getAllSerialScanSummaryCount(this.params);

    if (res) {
      this.length = res.length || 0;
      this.pagination = this.getNumberOfPages();
      

      if (this.length > 0) {

        let check1 = (this.pageIndex) * this.pageSize;
        let check2 = (this.pageIndex + 1) * this.pageSize;
        this.pageIndex = (check1 < this.length && check2 > this.length) || (check2 <= this.length) ? this.pageIndex : 0;

        try {
          let res1: any = await this._atkService.getAllSerialScanSummaryPageWise(this.pageIndex, this.pageSize, this.params);

          this.isSpinner = false;
          // this._logService.logMessage("success res:-------");
          // this._logService.logResponse(res1);
          let array = res1 || [];

          var oList: DashboardSummary[] = [];
          for (let i = 0; i < array.length; i++) {
            let innerData = this._mappingService.mapDashboardInnerItems(array[i]);
            let o = this._mappingService.mapDashboardSummary(array[i]);
            o.innerData = innerData;
            oList.push(o);
          }
          this.lastScanSummaryList = oList;

          this.dataSource = new MatTableDataSource<DashboardSummary>(
            this.lastScanSummaryList
          );

          // this._logService.logMessage("success res: ");
          // this._logService.logResponse(this.lastScanSummaryList);


          if (this.lastScanSummaryList.length == 0) {
            msg.msg = "No Scan Summaries Found";
            msg.msgType = MessageTypes.Information;
            msg.autoCloseAfter = 400;
            this._uiService.showToast(msg, "info");
          }
        } catch (error) {
          this._logService.logMessage("error: ");
          this._logService.logError(error);
          this._authService.errStatusCheckResponse(error);
        }
      }
      else {
        this.isSpinner = false;

        if (this.lastScanSummaryList.length == 0) {
          msg.msg = 'No Scan Summary Found';
          msg.msgType = MessageTypes.Information;
          msg.autoCloseAfter = 400;
          this._uiService.showToast(msg, 'info');
        }
      }
      // sessionStorage.setItem('datas', JSON.stringify(this.dataSource.data));
      sessionStorage.setItem('datas', JSON.stringify(this.dataSource.data));
    }
    
    
    
   
  }

  checkMinimumDateTime(date: string): Boolean {
    this._logService.logMessage('date')
    this._logService.logMessage(date.toString() == '0001-01-01T00:00:00')
    return date.toString() == '0001-01-01T00:00:00';
  }

  // async loadScanInfoSummaryList() {
  //   const msg = new Message();
  //   let params = new SummaryParams();
  //   this.isSpinner = true;
  //   this.lastScanSummaryList = [];
  //   this.paginations = [];
  //   this.pagination = 0;
  //   this.length = 0;
  //   let res: any = await this._atkService.getAllSerialScanSummaryCount();

  //   if (res) {
  //     this.length = res.length || 0;
  //     this.pagination = this.getNumberOfPages();

  //     if (this.length > 0) {

  //       let check1 = (this.pageIndex) * this.pageSize;
  //       let check2 = (this.pageIndex + 1) * this.pageSize;
  //       this.pageIndex = (check1 < this.length && check2 > this.length) || (check2 <= this.length) ? this.pageIndex : 0;

  //       try {
  //         let res1: any = await this._atkService.getAllSerialScanSummaryPageWise(this.pageIndex, this.pageSize, params);

  //         this.isSpinner = false;
  //         this._logService.logMessage("success res: ");
  //         this._logService.logResponse(res1);

  //         let array = res1 || [];

  //         var oList: DashboardSummary[] = [];
  //         for (let i = 0; i < array.length; i++) {
  //           let o = this._mappingService.mapDashboardSummary(array[i]);
  //           oList.push(o);
  //         }
  //         this.lastScanSummaryList = oList;

  //         this.dataSource = new MatTableDataSource<DashboardSummary>(
  //           this.lastScanSummaryList
  //         );


  //         if (this.lastScanSummaryList.length == 0) {
  //           msg.msg = "No Scan Summaries Found";
  //           msg.msgType = MessageTypes.Information;
  //           msg.autoCloseAfter = 400;
  //           this._uiService.showToast(msg, "info");
  //         }
  //       } catch (error) {
  //         this._logService.logMessage("error: ");
  //         this._logService.logError(error);
  //         this._authService.errStatusCheckResponse(error);
  //       }
  //     }
  //     else {
  //       this.isSpinner = false;

  //       if (this.lastScanSummaryList.length == 0) {
  //         msg.msg = 'No Scan Summary Found';
  //         msg.msgType = MessageTypes.Information;
  //         msg.autoCloseAfter = 400;
  //         this._uiService.showToast(msg, 'info');
  //       }
  //     }
  //   }
  // }

  async loadScanSummary() {
    this.isCardSpinner = true;
    let res: any = await this._atkService.getScans();
    // this._logService.logMessage("CustomScans");
    // this._logService.logMessage(res.data);
    this.isCardSpinner = false;
    if (res.data) {
      this.goodScans = res.data.goodScans;
      this.totalScans = res.data.totalScans + res.data.alreadyScanned;
      this.badScans = res.data.badScans;
      this.alreadyScanned = res.data.alreadyScanned;
      this.verifiedSMS = res.data.totalVerified + res.data.alreadyVerified;
      animateValue("custom-counter-1", 0, this.totalScans, 2000);
      animateValue("custom-counter-2", 0, this.badScans, 2000);
      animateValue("custom-counter-3", 0, this.goodScans, 2000);
      animateValue("custom-counter-4", 0, this.alreadyScanned, 2000);
      animateValue("custom-counter-5", 0, this.verifiedSMS, 2000);
    }
  }

  async loadScans() {
    this.isCardSpinner = true;
    let res: any = await this._atkService.getScans();
    this.isCardSpinner = false;
    if(res.data) {
      this.scanData.goodScans = res.data.goodScans;
      this.scanData.badScans = res.data.totalScans;
      this.scanData.alreadyScanned = res.data.alreadyScanned;
      this.scanData.totalScans = res.data.totalScans;
      animateValue("custom-counter-1", 0, this.totalScans, 2000);
      animateValue("custom-counter-2", 0, this.badScans, 2000);
      animateValue("custom-counter-3", 0, this.goodScans, 2000);
      animateValue("custom-counter-4", 0, this.verifiedSMS, 2000);
    }
  }

  pageChangeEvent(event?: PageEvent): PageEvent {
    console.log("getServerData event", event);

    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    // this.loadRegulatoryReportingListAll();
    // this.search();

    this.loadScanInfoSummaryList();
    this.applyFilters();
    return event;
  }

  getNumberOfPages() {
    let u = Math.ceil(this.length / this.pageSize);
    // return Math.ceil(this.length / this.pageSize);

    for (let index = 0; index < u; index++) {
      this.paginations.push(index + 1)
    }
    return u;
  }

  expandedRow(row: DashboardListInnerItems) {
    // if (this.expandedElement == row.documentId) {
    if (this.expandedElement == row) {
      this.expandedElement = null;
    } else {
      this.expandedElement = row;
    }
  }

  async applyFilters() {
    this.params = new SummaryParams();
    if (this.statusFilterObj != null) {
      sessionStorage.setItem("status",  this.statusFilterObj);
      this.params.scanResult = this.statusFilterObj;
    } if (this.scanTypeFilterObj != null) {
      sessionStorage.setItem("scantype",  this.scanTypeFilterObj);
      this.params.scanType = this.scanTypeFilterObj;
    } if (this.startDate && this.endDate) {
      sessionStorage.setItem("from" , JSON.stringify(this.startDate));
      this.params.startDate = this.startDate;
      sessionStorage.setItem("end" ,JSON.stringify(this.endDate));
      this.params.endDate = this.endDate;
    } if (this.keyword) {
      this.params.keyword = this.keyword
    }

    if( sessionStorage.getItem("scantype") != null &&  (this.scanTypeFilterObj == null)){

       
      this.params.scanType = sessionStorage.getItem("scantype");
      this.scanTypeFilterObj = sessionStorage.getItem("scantype");
      
      


   }
   if( sessionStorage.getItem("status") != null &&  (this.statusFilterObj == null)){

       
    this.params.scanResult = sessionStorage.getItem("status");
    this.statusFilterObj = sessionStorage.getItem("status");


 }
 if( sessionStorage.getItem("from") != null &&  (this.startDate == null)){

       
  this.params.startDate = JSON.parse(sessionStorage.getItem("from"));
  this.startDate = JSON.parse(sessionStorage.getItem("from"));


}if( sessionStorage.getItem("end") != null &&  (this.endDate == null)){

       
  this.params.endDate = JSON.parse(sessionStorage.getItem("end"));
  this.endDate = JSON.parse(sessionStorage.getItem("end"));


}

   
   


   

    this.loadScanInfoSummaryList();
    
    
    

    
  }
  
 
  
  
  async downloadCsv(){
    
    // let res:any = await this.applyFilters();
    
    this.exportTableData(this.dataSource.data);

    // if(res){
    //   this.exportTableData(this.dataSource.data);
    // }

    

    
    
    
    
    

  }
  exportTableData(data:any){
    
    let exportDate = [{}];

    if (data && data.length > 0) {

      data.forEach((row, index) => {
        // return formatted;

        let tempData = {
          "S.No": (index + 1) || "NA",
          'Product Name': row.productName || "NA",
          'Batch No': row.batchId || "NA",
          'Location': row.scanLocation || "NA",
          'Date / Time (24 Hr)': row.scannedOn || "NA",
          'Mobile No': row.mobileNo || "NA",
          'Status': row.scanResult || "NA",
          'Scanned / Verified Via': row.scanMethod || "NA",
          

          // 'Department': element.departmentName || "NA",
          // 'Role': element.rolesName || "NA",

        }

        exportDate.push(tempData);
        // console.log(tempData)

      });

      this.download.exportAsExcelFile(exportDate, 'Report');
      // this._excelService.exportAsExcelFile(this.reports, 'SAMPLE');
    }
    // else {
    //   msg.msg = 'No Reports Found';
    //   msg.msgType = MessageTypes.Information;
    //   msg.autoCloseAfter = 400;
    //   this._uiService.showToast(msg, 'info');

    // }

  
  }

}


