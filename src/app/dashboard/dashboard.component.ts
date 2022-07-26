import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DashboardSummary, SummaryParams } from '../core/models/atk.model';
import { Message, MessageTypes } from '../core/models/message.model';
import { ATKService } from '../core/services/atk/atk.service';
import { AuthService } from '../core/services/auth/auth.service';
import { LogService } from '../core/services/log/log.service';
import { MappingService } from '../core/services/mapping/mapping.service';
import { UIService } from '../core/services/ui/ui.service';

declare const animateValue: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  lastScanSummaryList: DashboardSummary[] = [];
  goodScans: any;
  badScans: any;
  totalScans: any;
  verifiedSMS: any;
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

  @ViewChild(MatPaginator, {}) paginator: MatPaginator;
  displayedColumns = [
    "sNo",
    "productName",
    // "mobileNo",
    "batchNo",
    // "serialNo",
    "scanLocation",
    "scanDate"
  ];

  dataSource = new MatTableDataSource<DashboardSummary>(

  )

  constructor(
    private _atkService: ATKService,
    private _logService: LogService,
    private _uiService: UIService,
    private _mappingService: MappingService,
    private _authService: AuthService,
    private renderer: Renderer2,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadScanInfoSummaryList();
    this.loadScanSummary();
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
    let params = new SummaryParams();
    this.isSpinner = true;
    try {
      let res: any = await this._atkService.getAllSerialScanSummaryPageWise(this.pageIndex, this.pageSize, params);

      this.isSpinner = false;
      this._logService.logMessage("success res: ");
      this._logService.logResponse(res);

      let array = res || [];

      this.length = res ? res.length || 0 : 0;

      var oList: DashboardSummary[] = [];
      for (let i = 0; i < array.length; i++) {
        let o = this._mappingService.mapDashboardSummary(array[i]);
        oList.push(o);
      }
      this.lastScanSummaryList = oList;

      this.dataSource = new MatTableDataSource<DashboardSummary>(
        this.lastScanSummaryList
      );
      this.dataSource.paginator = this.paginator;


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

  async loadScanSummary() {
    this.isCardSpinner = true;
    let res: any = await this._atkService.getScanSummary();
    this.isCardSpinner = false;
    if (res.data) {
      this.goodScans = res.data.goodScans;
      this.totalScans = res.data.totalScans;
      this.badScans = res.data.badScans;
      this.verifiedSMS = res.data.verifiedSMS;
      animateValue("custom-counter-1", 0, this.totalScans, 2000);
      animateValue("custom-counter-2", 0, this.badScans, 2000);
      animateValue("custom-counter-3", 0, this.goodScans, 2000);
      animateValue("custom-counter-4", 0, this.verifiedSMS, 2000);
    }

    this._logService.logMessage("res.data")
    this._logService.logMessage(res.data)
  }

  pageChangeEvent(event?: PageEvent): PageEvent {
    this.pageIndex = event.pageIndex;
    this._logService.logMessage("this.dataSource");
    this._logService.logMessage(this.dataSource);
    this.pageSize = event.pageSize;
    return event;
  }

}
