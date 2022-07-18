import { AfterViewInit, Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { NavigationEnd, Router } from '@angular/router';
import { ChevronSerial, CodeType } from '../core/models/atk.model';
import { Message, MessageTypes } from '../core/models/message.model';
import { ATKService } from '../core/services/atk/atk.service';
import { AuthService } from '../core/services/auth/auth.service';
import { LogService } from '../core/services/log/log.service';
import { MappingService } from '../core/services/mapping/mapping.service';
import { UIService } from '../core/services/ui/ui.service';
import { UtilityService } from '../core/services/utility/utility.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit, AfterViewInit {


  codeList: CodeType[] = [
    { id: 1, value: "Serial No" },
    { id: 2, value: "QR Code" },
    { id: 3, value: "SMS Code" }
  ];
  keyword: string;
  chevronSerialList: ChevronSerial[] = [];
  tempChevronSerialList: ChevronSerial[] = [];
  isSpinner = false;
  codeType: number;
  panelOpenState = false;
  firstTime = true;
  mySubscription: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  paCount = 0;
  pageEvent: PageEvent;
  pageIndex = 0;
  pageSize = 10; // by default
  length: number = 0;
  pageSizeOptions = [10, 25, 50, 100];
  upperLimit = 0;
  pagination = 0;
  paginations = [];

  constructor(
    private _atkService: ATKService,
    private _uiService: UIService,
    private utilityService: UtilityService,
    private _logService: LogService,
    private _mappingService: MappingService,
    private _authService: AuthService,
    private router: Router,
    private rendered: Renderer2
  ) {

  }
  ngAfterViewInit(): void {
  
  }
  ngOnInit(): void {
    let token = localStorage.getItem('token_id');
    console.log("this.firstTime");
    console.log(this.firstTime);

  }



  search() {

    this.keyword = this.keyword ? this.keyword.trim() : this.keyword;

    this.searchSerial();
  }

  async searchSerial() {
    const msg = new Message();
    if (this.keyword) {
      try {
        this.isSpinner = true;
        this._uiService.showSpinner();
        let res: any = await this._atkService.searchSingleSerial(this.keyword, this.codeType);

        let array = res.data || [];

        this._logService.logMessage("res Purchase Order list: ");
        this._logService.logResponse(array);


        var oList: ChevronSerial[] = [];
        for (let i = 0; i < array.length; i++) {
          let o = this._mappingService.mapChevronSerial(array[i]);
          o.poRequest = this._mappingService.mapPORequest(array[i].poRequest);
          // let o = array[i];
          oList.push(o);
        }

        this.chevronSerialList = oList;
        this.tempChevronSerialList = this.chevronSerialList;

        this._uiService.hideSpinner();
        this._logService.logMessage("this.chevronSerialList");
        this._logService.logMessage(this.chevronSerialList);

        if (this.chevronSerialList.length == 0) {
          msg.msg = "No Serials Found";
          msg.msgType = MessageTypes.Information;
          msg.autoCloseAfter = 400;
          this._uiService.showToast(msg, "info");
        }
      } catch (error) {
        this.isSpinner = false;
        this._logService.logMessage("error: ");
        this._logService.logError(error);

        this._authService.errStatusCheckResponse(error);
      }


    }
    else {
      this.isSpinner = false;
      let msg = this.utilityService.permissionMsg();
      this._uiService.showToast(msg, '');
    }
  }
  
  async loadSerialList() {
    const msg = new Message();
    if (true) {
      try {
        this.isSpinner = true;
        this._uiService.showSpinner();
        let res: any = await this._atkService.getAllSerialPaginated(this.pageIndex, 1000);

        let array = res.data || [];

        this._logService.logMessage("res serial list: ");
        this._logService.logResponse(array);


        var oList: ChevronSerial[] = [];
        for (let i = 0; i < array.length; i++) {
          let o = this._mappingService.mapChevronSerial(array[i]);
          o.poRequest = this._mappingService.mapPORequest(array[i].poRequest);
          // let o = array[i];
          oList.push(o);
        }

        this.chevronSerialList = oList;
        this.length = this.chevronSerialList.length || 0;
        this.tempChevronSerialList = this.chevronSerialList.slice(this.pageIndex, this.pageSize);

        this._uiService.hideSpinner();
        this._logService.logMessage("this.tempchevronSerialList");
        this._logService.logMessage(this.tempChevronSerialList);

        if (this.chevronSerialList.length == 0) {
          msg.msg = "No Serials Found";
          msg.msgType = MessageTypes.Information;
          msg.autoCloseAfter = 400;
          this._uiService.showToast(msg, "info");
        }
      } catch (error) {
        this.isSpinner = false;
        this._logService.logMessage("error: ");
        this._logService.logError(error);

        this._authService.errStatusCheckResponse(error);
      }


    }
    else {
      this.isSpinner = false;
      let msg = this.utilityService.permissionMsg();
      this._uiService.showToast(msg, '');
    }
  }

  refreshList() {
    this.tempChevronSerialList = this.chevronSerialList.slice(this.pageIndex * this.pageSize, (this.pageIndex * this.pageSize) + this.pageSize)
  }

  pageChangeEvent(event?: PageEvent): PageEvent {

    this._logService.logMessage("getServerData event");
    this._logService.logMessage(event);

    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.refreshList();
    // this.search();

    return event;
  }

}
