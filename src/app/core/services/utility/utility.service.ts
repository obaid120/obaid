import { Injectable } from "@angular/core";
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormArray,
} from "@angular/forms";
import { DatePipe } from "@angular/common";

import { Message, MessageTypes } from "../../models/message.model";
import { User } from "../../models/user.model";
import { Role } from "../../models/role.model";
// import { environment } from '../../../../environments/environment';
import { Permission } from "../../models/permission.model";
import { NavigationItem } from "../../models/navigationItem.model";
import { Config } from "../../shared/config/config";
import { LogService } from "../log/log.service";
import { environment } from "src/environments/environment";

// @Injectable({
//   providedIn: 'root',
// })
@Injectable()
export class UtilityService {
  constructor(
    private _logService: LogService,
    private datePipe: DatePipe
  ) {}

  public checkUserPermission_old(user, permissionCodeName): any {
    let permission = false;

    // for always return true
    // permission = true;
    if (user && user.permissions instanceof Array) {
      user.permissions.forEach((element) => {
        // check permission exist
        if (element.permissionCode === permissionCodeName) {
          permission = true;
        }
      });
    }
    return permission;
  }

  public checkUserPermission(
    user: User,
    value: string,
    key: string = "key"
  ): any {
    let byPassRole = Config.byPassRoles;
    let checkByPass = this.checkRoleAllowed(user.roles, "key", byPassRole);

    // if (environment && environment.permissionHandling) {
    if (
      environment &&
      environment.permissionHandling &&
      !checkByPass
    ) {
      let permission = false;

      // for always return true
      // permission = true;
      if (user && user.userPermissions instanceof Array) {
        user.userPermissions.forEach((element) => {
          // check permission exist
          if (element.permission[key] === value) {
            permission = true;
          }
        });
      }
      return permission;
    } else {
      return true;
    }
  }

  public checkUserPermissionViewPermissionObj(
    permissions: Permission[],
    value: string,
    key: string = "key"
  ): any {
    let permission = false;

    // for always return true
    // permission = true;
    if (permissions && permissions instanceof Array) {
      permissions.forEach((element) => {
        // check permission exist
        // if (element.permissionCode === value) {
        if (element[key] === value) {
          permission = true;
        }
      });
    }
    return permission;
  }

  public getUserPermissionTooltipMsg(
    permission,
    buttonSubmitted,
    buttonTooltip
  ): any {
    // this._logService.logMessage('permission');
    // this._logService.logMessage(permission);
    // this._logService.logMessage('buttonSubmitted');
    // this._logService.logMessage(buttonSubmitted);
    // this._logService.logMessage('buttonTooltip');
    // this._logService.logMessage(buttonTooltip);

    let msg = "";
    msg = !permission
      ? "Dont Have Permission"
      : buttonSubmitted
      ? "Processing"
      : buttonTooltip || "";

    return msg;
  }

  public permissionMsg(): any {
    // let msg = "";
    // msg = "Dont Have Permission";
    const msg = new Message();
    // msg.title = '';
    msg.iconType = "";

    msg.msg = Config.msg.permissionPop;
    msg.msgType = MessageTypes.Error;
    msg.autoCloseAfter = 400;

    return msg;
  }

  /*
  send user full object
  send dataRole in array . e.g: ['roleCode1','roleCode2']
  */
  public checkUserRoleAllowed(user: User, dataRole): any {
    // this._logService.logMessage("checkCustomRoleAllow");
    // this._logService.logMessage(dataRole);
    let result: boolean = false;
    // if (this.user.roles.length > 0 && this.user.roles[0].roleCode != 'cad') {
    if (user.roles.length > 0 && dataRole.length > 0) {
      dataRole.forEach((element) => {
        if (element == user.roles[0].key) {
          result = true;
        }
      });
    }

    return result;
  }

  /*
  send user full object
  send dataRole in array . e.g: ['roleCode1','roleCode2']
  */
  public checkRoleAllowed(roles: Role[], key: any, dataRole: String[]): any {
    // this._logService.logMessage("checkCustomRoleAllow");
    // this._logService.logMessage(dataRole);
    let result: boolean = false;
    // if (this.user.roles.length > 0 && this.user.roles[0].roleCode != 'cad') {
    if (roles.length > 0 && dataRole.length > 0) {
      dataRole.forEach((element) => {
        roles.forEach((element1) => {
          // if (element == element1[key.toString()]) {
          if (element == element1[key]) {
            result = true;
          }
        });
        // if (element == roles[0].roleCode) {
        //     result = true;
        // }
      });
    }

    return result;
  }

  public validateAllFormFields(formGroup: FormGroup) {
    //{1}
    Object.keys(formGroup.controls).forEach((field) => {
      //{2}
      const control = formGroup.get(field); //{3}
      if (control instanceof FormControl) {
        //{4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        //{5}
        this.validateAllFormFields(control); //{6}
      }
    });
  }

  public newDataInsertInArray(oldArray, newArray): any {
    let data = oldArray || [];

    if (newArray.length > 0) {
      newArray.forEach((element) => {
        let check = 0;
        oldArray.forEach((element1) => {
          if (element.id == element1.id) {
            check = 1;
          }
        });
        if (check == 0) {
          data.push(element);
        }
      });
    }

    return data;
  }

  public dateDifferenceInMonth(date = new Date(), diffNumber = 0): any {
    var newDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth() - diffNumber, date.getDate())
    );

    return newDate;
  }

  public dateDifferenceInDays(startDate, endDate): any {
    //Get 1 day in milliseconds
    var one_day = 1000 * 60 * 60 * 24;

    var days = 0;

    var date1 = new Date(startDate);
    var date2 = new Date(endDate);
    this._logService.logMessage("date1");
    this._logService.logMessage(date1);
    this._logService.logMessage("date2");
    this._logService.logMessage(date2);
    // Convert both dates to milliseconds
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();

    this._logService.logMessage("date1_ms");
    this._logService.logMessage(date1_ms);
    this._logService.logMessage("date2_ms");
    this._logService.logMessage(date2_ms);

    // Calculate the difference in milliseconds
    var difference_ms = date2_ms - date1_ms;

    // Convert back to days and return
    days = Math.round(difference_ms / one_day);
    this._logService.logMessage("days");
    this._logService.logMessage(days);

    return days;
  }

  public addDaysInDate(noOfDays = 0, date): any {
    //Get 1 day in milliseconds
    var one_day = 1000 * 60 * 60 * 24;
    var date1 = new Date(date);
    this._logService.logMessage("date1");
    this._logService.logMessage(date1);
    if (date) {
      // Convert both dates to milliseconds
      var date1_ms = date1.getTime();

      this._logService.logMessage("date1_ms");
      this._logService.logMessage(date1_ms);

      // Calculate the addition in milliseconds
      var addition_ms = date1_ms + noOfDays * one_day;

      date1.setTime(addition_ms);
      return date1;
    }

    return null;
  }

  public dateExistBTWTwoDatesCheck(from, to, check): any {
    if (from && to && check) {
      var fDate, lDate, cDate;
      fDate = Date.parse(from);
      lDate = Date.parse(to);
      cDate = Date.parse(check);

      if (cDate <= lDate && cDate >= fDate) {
        return true;
      }
      return false;
    }
    return false;
  }

  public timeConversion(time = 0, type): any {
    //Get 1 hour in minute
    var one_hour = 60;
    var timeC = 0.0;

    if (time) {
      if (type == "hour") {
        timeC = time / one_hour;
        timeC = +timeC.toFixed(2);
      } else {
        timeC = time * one_hour;
        timeC = +timeC.toFixed();
      }

      // return (timeC | number : '1.2-2');
    }

    return timeC;
  }

  public timeConversionMinSec(time = 0, type): any {
    //Get 1 minute in second
    var one_minute = 60;
    var timeC = 0.0;

    if (time) {
      if (type == "min") {
        timeC = time / one_minute;
        timeC = +timeC.toFixed(2);
      } else {
        timeC = time * one_minute;
        timeC = +timeC.toFixed();
      }

      // return (timeC | number : '1.2-2');
    }

    return timeC;
  }

  public timeConversions(time = 0, type): any {
    //Get 1 hour in minute
    var one_hour = 60;
    //Get 1 min in sec
    var one_min = 60;
    var timeC = 0.0;

    if (time) {
      if (type == "hour") {
        timeC = time / one_hour;
        timeC = +timeC.toFixed(2);
      } else if (type == "min") {
        timeC = time * one_hour;
        timeC = +timeC.toFixed();
      } else {
        timeC = time * one_hour * one_min;
        timeC = +timeC.toFixed();
      }

      // return (timeC | number : '1.2-2');
    }

    return timeC;
  }

  public convertTime12to24(time12h: any) {
    if (time12h) {
      const [time, modifier] = time12h.split(" ");

      let [hours, minutes] = time.split(":");

      if (hours === "12") {
        hours = "00";
      }

      if (modifier === "PM") {
        hours = parseInt(hours, 10) + 12;
      }

      if (+hours < 10 && hours != "00") {
        hours = `0${hours}`;
      }

      return `${hours}:${minutes}`;
    }

    return null;
  }

  public convertTime24to12(time24h: any) {
    if (time24h) {
      // Check correct time format and split into components
      time24h = time24h
        .toString()
        .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time24h];

      if (time24h.length > 1) {
        // If time format correct
        time24h = time24h.slice(1); // Remove full string match value
        time24h[5] = +time24h[0] < 12 ? " AM" : " PM"; // Set AM/PM
        time24h[0] = +time24h[0] % 12 || 12; // Adjust hours
      }
      return time24h.join(""); // return adjusted time or original string
    }

    return null;
  }

  public convertTimeUTCToLocalIn24H(time24h: any) {
    if (time24h) {
      let d = new Date();

      let d1 = this.datePipe.transform(d, "yyyy-MM-dd");
      this._logService.logMessage("d1");
      this._logService.logMessage(d1);

      let d2 = d1 + " " + time24h + " GMT";
      // let d2 = d1 + " " + time24h;

      let d3 = new Date(d2);
      // let d3 = new Date(d2).toUTCString();
      // let d4 = new Date(d3).toISOString();
      // let t = this.datePipe.transform(d4, 'h:mm a', "GMT");
      // let t = this.datePipe.transform(d4, 'h:mm a');

      let t = this.datePipe.transform(d3, "h:mm a");

      let t1 = this.convertTime12to24(t);

      this._logService.logMessage("d2,d3");
      this._logService.logMessage(d2);
      this._logService.logMessage(d3);
      // this._logService.logMessage(d4);

      this._logService.logMessage("t,t1");
      this._logService.logMessage(t);
      this._logService.logMessage(t1);

      return t1;
    }

    return null;
  }

  public convertTimeLocalToUTCIn24H(time24h: any) {
    if (time24h) {
      let d = new Date();

      let d1 = this.datePipe.transform(d, "yyyy-MM-dd");
      this._logService.logMessage("d1");
      this._logService.logMessage(d1);

      let d2 = d1 + " " + time24h;

      let d3 = new Date(d2).toUTCString();
      let d4 = new Date(d3).toISOString();
      let t = this.datePipe.transform(d4, "h:mm a", "GMT");

      let t1 = this.convertTime12to24(t);

      this._logService.logMessage("d2,d3,d4");
      this._logService.logMessage(d2);
      this._logService.logMessage(d3);
      this._logService.logMessage(d4);

      this._logService.logMessage("t,t1");
      this._logService.logMessage(t);
      this._logService.logMessage(t1);

      return t1;
    }

    return null;
  }

  public deepCopy(oldObj: any) {
    var newObj = oldObj;
    if (oldObj && typeof oldObj === "object") {
      newObj =
        Object.prototype.toString.call(oldObj) === "[object Array]" ? [] : {};
      for (var i in oldObj) {
        newObj[i] = this.deepCopy(oldObj[i]);
      }
    }
    return newObj;
  }

  public deepConvertLowerCase(oldObj: any) {
    var newObj = oldObj;
    if (oldObj && typeof oldObj === "object") {
      newObj =
        Object.prototype.toString.call(oldObj) === "[object Array]" ? [] : {};
      for (var i in oldObj) {
        // newObj[i.toLowerCase()] = this.deepConvertLowerCase(oldObj[i]);
        newObj[this.fisrtLetterLowerCase(i)] = this.deepConvertLowerCase(
          oldObj[i]
        );
      }
    }
    return newObj;
  }

  public fisrtLetterLowerCase(s) {
    return s[0].toLowerCase() + s.slice(1);
  }

  public phoneNoFunction(event, data = null): any {
    // this._logService.logMessage("phoneNoFunction");
    // if (event.keyCode == 8 || event.keyCode == 9
    //     || event.keyCode == 27 || event.keyCode == 13
    //     || (event.keyCode == 65 && event.ctrlKey === true))
    //     return;
    // if ((event.keyCode < 48 || event.keyCode > 57))
    //     event.preventDefault();
    // var length = data ? data.length : 0;
    // if (length == 3)
    //     return data = data + '-';
    // return data;
  }

  public textFieldtoNumberRestrict(event): any {
    // this._logService.logMessage("textFieldtoNumberRestrict");

    if (
      event.keyCode == 8 ||
      event.keyCode == 9 ||
      event.keyCode == 27 ||
      event.keyCode == 13 ||
      (event.keyCode == 65 && event.ctrlKey === true)
    )
      return;
    // if ((event.keyCode < 48 || event.keyCode > 57))
    if (
      event.keyCode < 48 ||
      (event.keyCode > 57 && event.keyCode < 96) ||
      event.keyCode > 105
    )
      event.preventDefault();

    // var length = data ? data.length : 0;

    // if (length == 3)
    //     return data = data + '-';

    // return data;
  }

  public filterItem(pageItem: any, index, code): any {
    // this._logService.logMessage("filterItem");
    // this._logService.logMessage("index");
    // this._logService.logMessage(index);

    let pageItemData: any;

    // let data = pageItem.pageItems.filter(pi => (pi.pageItemType.code == "title"));
    let data = pageItem.pageItems.filter((pi) => pi.pageItemType.code == code);
    // let data = this.dataSource.data[index].filter(pi => (pi.pageItemType.code == "title"));

    if (data && data.length > 0) {
      return data[0];
    }

    return pageItemData;
  }

  public filterConfiguration(page: any, code): any {
    // this._logService.logMessage("filterConfiguration");
    // this._logService.logMessage("index");
    // this._logService.logMessage(index);

    let pageConfigurationData: any;

    let data = page.pageConfigurations.filter((pc) => pc.parameterType == code);

    if (data && data.length > 0) {
      return (pageConfigurationData = data[0]);
    }

    return null;
  }

  public filterItemInstance(pageItemInstance: any, index, code): any {
    // this._logService.logMessage("filterItem");
    // this._logService.logMessage("index");
    // this._logService.logMessage(index);

    let pageItemInstanceData: any;

    // let data = pageItem.pageItems.filter(pi => (pi.pageItemType.code == "title"));
    let data = pageItemInstance.pageItemInstanceParameters.filter(
      (pi) => pi.parameterType == code
    );
    // let data = this.dataSource.data[index].filter(pi => (pi.pageItemType.code == "title"));

    if (data && data.length > 0) {
      return data[0];
    }

    return pageItemInstanceData;
  }

  public filterPageAllowed(pages: any[], key: any, dataPage: String[]): any[] {
    let result: any[] = [];

    if (pages.length > 0 && dataPage.length > 0) {
      dataPage.forEach((element) => {
        pages.forEach((element1) => {
          // if (element == element1[key.toString()]) {
          if (element == element1[key]) {
            // result = true;
            result.push(element1);
          }
        });
        // if (element == roles[0].roleCode) {
        //     result = true;
        // }
      });
    }

    return result;
  }

  public tableCustomFilter(data: any, filter: string) {
    // let dataStr = data.name + this.filterItem(data, null, "title").bindTo;
    let dataStr = "";

    if (data.name) {
      dataStr += data.name.trim().toLowerCase();
    }
    if (data.bindTo) {
      dataStr += data.bindTo.trim().toLowerCase();
    }
    if (data.connectedPageName) {
      dataStr += data.connectedPageName.trim().toLowerCase();
    }
    if (this.filterItem(data, null, "icon").bindTo) {
      dataStr += this.filterItem(data, null, "icon")
        .bindTo.trim()
        .toLowerCase();
    }
    if (this.filterItem(data, null, "title").bindTo) {
      dataStr += this.filterItem(data, null, "title")
        .bindTo.trim()
        .toLowerCase();
    }
    if (this.filterItem(data, null, "description").bindTo) {
      dataStr += this.filterItem(data, null, "description")
        .bindTo.trim()
        .toLowerCase();
    }

    this._logService.logMessage("filter");
    this._logService.logMessage(filter);
    this._logService.logMessage("dataStr");
    this._logService.logMessage(dataStr);
    this._logService.logMessage("dataStr.indexOf(filter)");
    this._logService.logMessage(dataStr.indexOf(filter));

    return dataStr.indexOf(filter) != -1;
  }

  /*
  send user full object
  send dataRole in array . e.g: ['roleCode1','roleCode2']
  */
  public findIndexViaObjectId(data: any, dataList: any): any {
    // this._logService.logMessage("findIndexViaObjectId ");
    let result = -1;
    // if (this.user.roles.length > 0 && this.user.roles[0].roleCode != 'cad') {
    if (dataList && dataList.length > 0) {
      dataList.forEach((element, index) => {
        if (element.id == data.id) {
          result = index;
        }
      });
    }

    return result;
  }

  public findIndexViaKey(data: any, key, dataList: any): any {
    this._logService.logMessage("findIndexViaKey");

    let newData = this.deepCopy(
      data && typeof data === "string" ? data.toLowerCase().trim() : data
    );
    let newDataList = this.deepCopy(dataList);

    let result = -1;

    // if (dataList && dataList.length > 0) {
    //   dataList.forEach((element, index) => {
    if (newDataList && newDataList.length > 0) {
      newDataList.forEach((element, index) => {
        element[key] = this.deepCopy(
          element[key] && typeof element[key] === "string"
            ? element[key].toLowerCase().trim()
            : element[key]
        );
        // if (element[key] == data) {
        if (element[key] == newData) {
          result = index;
        }
      });
    }

    this._logService.logMessage("result");
    this._logService.logMessage(result);
    return result;
  }

  public findIndexViaMultipleKey(
    data: any[],
    key: string[],
    dataList: any
  ): any {
    this._logService.logMessage("findIndexViaMultipleKey ");
    this._logService.logMessage("data ");
    this._logService.logMessage(data);
    this._logService.logMessage("key ");
    this._logService.logMessage(key);
    this._logService.logMessage("dataList ");
    this._logService.logMessage(dataList);
    let result = -1;
    let dataIndex = -1;
    // if (this.user.roles.length > 0 && this.user.roles[0].roleCode != 'cad') {
    // if (dataList && dataList.length > 0  ) {
    if (
      dataList &&
      dataList.length > 0 &&
      data &&
      data.length > 0 &&
      key &&
      key.length > 0 &&
      data.length == key.length
    ) {
      let check = 0;
      dataList.forEach((element, index) => {
        check = 0;
        key.forEach((element1, index1) => {
          if (element[element1] == data[index1]) {
            check++;
          }
        });

        if (check == data.length) {
          result = index;
        }
      });
    }

    return result;
  }

  public findIndexViaObjectName(data: any, dataList: any): any {
    // this._logService.logMessage("findIndexViaObjectName ");
    let result = -1;
    // if (this.user.roles.length > 0 && this.user.roles[0].roleCode != 'cad') {
    if (dataList && dataList.length > 0) {
      dataList.forEach((element, index) => {
        if (element.name == data.assessment.auditName) {
          result = index;
        }
      });
    }

    return result;
  }

  /*
  send user full object
  send dataRole in array . e.g: ['roleCode1','roleCode2']
  */
  public extensionCheck(
    ext: string,
    type: string,
    imageFor: string = null
  ): any {
    // this._logService.logMessage("extensionCheck ");
    // let result = false;
    let result = {
      ext: null,
      type: null,
      status: null,
    };

    let imageExts = Config.allowedImageExt;
    let docExts = Config.allowedDocExt;
    let videoExts = Config.allowedVideoExt;

    if (type == "image") {
      // if ((imageFor == "causeBanner")) {
      //   if (".svg" == ext) {
      //     result.status = true;
      //   }

      // }
      // else {

      if (imageExts && imageExts.length > 0) {
        imageExts.forEach((element, index) => {
          if (element.ext == ext) {
            result.status = true;
          }
        });
      }

      // }
    } else if (type == "doc") {
      // if (this.user.roles.length > 0 && this.user.roles[0].roleCode != 'cad') {
      if (docExts && docExts.length > 0) {
        docExts.forEach((element, index) => {
          if (element.ext == ext) {
            result.status = true;
          }
        });
      }
    } else if (type == "video") {
      // if (this.user.roles.length > 0 && this.user.roles[0].roleCode != 'cad') {
      if (videoExts && videoExts.length > 0) {
        videoExts.forEach((element, index) => {
          if (element.ext == ext) {
            result.status = true;
          }
        });
      }
    } else {
      result.status = false;
    }

    return result;
  }

  /*
  send user full object
  send dataRole in array . e.g: ['roleCode1','roleCode2']
  */
  public concatMimeType(type: string): any {
    // this._logService.logMessage("concatMimeType ");
    // let result = false;
    let result = {
      data: null,
      type: null,
      status: null,
    };

    let imageTypes = Config.allowedImageType;
    let docTypes = Config.allowedDocType;
    let videoTypes = Config.allowedVideoType;

    if (type == "image") {
      result.data = "";

      // if (this.user.roles.length > 0 && this.user.roles[0].roleCode != 'cad') {
      if (imageTypes && imageTypes.length > 0) {
        imageTypes.forEach((element, index) => {
          // if (index == 0) {
          //     result.data += element.type;
          // }
          // else
          if (index == imageTypes.length - 1) {
            result.data += element.type;
          } else {
            result.data += element.type + ",";
          }
        });
      }
    } else if (type == "doc") {
      result.data = "";

      // if (this.user.roles.length > 0 && this.user.roles[0].roleCode != 'cad') {
      if (docTypes && docTypes.length > 0) {
        docTypes.forEach((element, index) => {
          // if (index == 0) {
          //     result.data += element.type;
          // }
          // else
          if (index == docTypes.length - 1) {
            result.data += element.type;
          } else {
            result.data += element.type + ",";
          }
        });
      }
    } else if (type == "video") {
      result.data = "";

      // if (this.user.roles.length > 0 && this.user.roles[0].roleCode != 'cad') {
      if (videoTypes && videoTypes.length > 0) {
        videoTypes.forEach((element, index) => {
          // if (index == 0) {
          //     result.data += element.type;
          // }
          // else
          if (index == videoTypes.length - 1) {
            result.data += element.type;
          } else {
            result.data += element.type + ",";
          }
        });
      }
    } else {
      result.status = false;
    }

    return result;
  }

  public colourConversion(colour, type): string {
    // this._logService.logMessage("filterItem");
    // this._logService.logMessage("index");
    // this._logService.logMessage(index);

    let colourConvert = "";

    if (type == "web") {
      return (colourConvert = colour ? colour.replace("0xFF", "#") : "");
    }
    if (type == "mobile") {
      return (colourConvert = colour ? colour.replace("#", "0xFF") : "");
    }

    return colourConvert;
  }

  getInitials(str) {
    var parts = str.split(" ");
    var initials = "";
    for (var i = 0; i < parts.length; i++) {
      if (parts[i].length > 0 && parts[i] !== "") {
        initials += parts[i][0].toUpperCase();
      }
    }
    return initials;
  }

  dynamicSort(property, property2 = null) {
    if (property && property2) {
      return function (a, b) {
        return a[property][property2] < b[property][property2]
          ? -1
          : a[property][property2] > b[property][property2]
          ? 1
          : 0;
      };
    } else {
      return function (a, b) {
        return a[property] < b[property]
          ? -1
          : a[property] > b[property]
          ? 1
          : 0;
      };
    }
  }

  public isStringMatched(
    str: string,
    strArray?: string[],
    exactMatch?: boolean
  ): any {
    // this._logService.logMessage("isStringMatched ");
    // this._logService.logMessage("str ");
    // this._logService.logMessage(str);
    // this._logService.logMessage("strArray ");
    // this._logService.logMessage(strArray);

    let strArrayData: string[] = [];
    strArrayData = strArray ? this.deepCopy(strArray) : [];
    if (str && strArrayData && strArrayData.length > 0) {
      let check = 0;
      strArrayData.forEach((element) => {
        if (exactMatch) {
          if (element == str) {
            check++;
          }
        } else {
          if (element && element.toLowerCase() == str) {
            check++;
          }
        }
      });

      // this._logService.logMessage("check ");
      // this._logService.logMessage(check);

      return check > 0 ? true : false;
    } else {
      if (!str && !(strArrayData && strArrayData.length > 0)) {
        return true;
      } else {
        return false;
      }
    }

    // return result;
  }

  public filterHeatMapColor(value): string {
    // this._logService.logMessage("filterItem");
    // this._logService.logMessage("index");
    // this._logService.logMessage(index);

    let heatMapValues = Config.heatMapValue;
    let color: string = null;

    // (oldObj && typeof oldObj === "object")

    let data = heatMapValues.filter(
      (hmv) =>
        hmv.min < value &&
        ((typeof hmv.max === "number" && hmv.max >= value) ||
          (typeof hmv.max === "string" && hmv.max == "onword"))
    );

    if (data && data.length > 0) {
      return (color = data[0].color);
    }

    return color;
  }

  public findBySelector(selector, elm) {
    var all = document.querySelectorAll(selector);

    var cur = elm ? elm.parentNode || null : 1;

    while (cur && !this.collectionHas(all, cur)) {
      //keep going up until you find a match

      cur = cur.parentNode; //go up
    }

    return cur; //will return null if not found
  }

  public collectionHas(a, b) {
    //helper function (see below)

    for (var i = 0, len = a.length; i < len; i++) {
      if (a[i] == b) return true;
    }

    return false;
  }
}
