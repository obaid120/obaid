import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend, HttpHeaders } from '@angular/common/http';
import { observable, Observable, BehaviorSubject, Subject } from 'rxjs';
import { User } from '../../models/user.model';
import { Token } from '../../models/token.model';
import { AuthService } from '../auth/auth.service';
// import { environment } from '../../../../environments/environment';
import { Role } from '../../models/role.model';
import { LogService } from '../log/log.service';
import { environment } from '../../../../environments/environment';

@Injectable()
export class UserService {

  // private _http: HttpClient;
  // isLoggedIn: Subject<boolean> = new Subject<boolean>();
  loginStatusChanged = new Subject<boolean>();
  loginUserStatusChanged = new Subject<User>();

  constructor(
    private _authService: AuthService,
    private _http: HttpClient,
    _handler: HttpBackend,
    private _logService: LogService
  ) {
    // this._http = new HttpClient(_handler);
  }

  _completeUrl(url) {
    // return environment.apiBaseUrl + url;
    return environment.apiBaseUrl + url;
  }

  async login(user: User, token?: string) {
    // const url = environment.apiBaseUrl + 'user/login';
    const url = 'user/login';


    const body = {
      Email: user.email,
      Password: user.password,
      // responseToken: token
    };
    return await this._http.post(url, body).toPromise();
  }

  async getStatus() {
    // let url = environment.baseApiUrl + "user/info";
    let url = "user/info";
    // let res = await this._http.get(url).toPromise();
    // const isUser = this._mappingService.mapUser(user);

    // isUser.isLoggedIn = isUser.isActive && !isUser.isBlocked ? true : false;
    // this._authService.storeUser(isUser);
    return await this._http.get(url).toPromise();
  }

  async getUserRolePermission(type?: string) {
    // let url = environment.baseApiUrl + "user/info";
    let url = "user/roles/" + (type || "portal");
    // let res = await this._http.get(url).toPromise();
    // const isUser = this._mappingService.mapUser(user);

    // isUser.isLoggedIn = isUser.isActive && !isUser.isBlocked ? true : false;
    // this._authService.storeUser(isUser);
    return await this._http.get(url).toPromise();
  }

  /**
   * get user info w.r.t userId with Auth server
   * @param userId    user id
   * @returns {Promise}
   */
  async getUserDetailViaId(userId) {
    // let url = environment.baseApiUrl + "user/info";
    let url = "user/profile/" + (userId || null);
    return await this._http.get(url).toPromise();
  }

  /**
   * count of user w.r.t searchKey with Auth server
   * @param searchKey     search keyword
   * @returns {Promise}
   */
  async getUserListCount(searchKey?: string) {
    // const getUrl = 'user/list/count';
    // let url = environment.baseApiUrl + "user/list/filtered/count/" + (searchKey || null);
    // let url = "user/all/count/" + (searchKey || null);
    let url = "user/all/count";

    return await this._http.get(url).toPromise();
  }

  /**
   * list of user w.r.t status and searchKey with Auth server
   * @param pageNo    page index for pagination
   * @param limit     limit list for pagination
   * @param searchKey     search keyword
   * @returns {Promise}
   */
  async getUserListPagination(pageNo, limit, searchKey?: string) {
    // const getUrl = 'user/list/' + (pageNo || 0) + '/' + (limit || 5);
    // let url = environment.baseApiUrl + "user/list/filtered/" + (pageNo || 0) + '/' + (limit || 5) + (searchKey || null);
    // let url = "user/all/" + (pageNo || 0) + '/' + (limit || 5) + '/' + (searchKey || null);
    let url = "user/all/" + (pageNo || 0) + '/' + (limit || 5);
    return await this._http.get(url).toPromise();
  }

  async getUserListAll() {
    let url = "user/all";
    return await this._http.get(url).toPromise();
  }

  async getUserApprovalListAll() {
    let url = "user/approvals/all" + "?via=administrator";
    return await this._http.get(url).toPromise();
  }

  /**
* User Approval with Auth server
* @param data    request data
* @returns {Promise}
*/
  async approveUser(userId: number, isAccepted?: boolean, comments?: string, id?:number) {
    // let url = "case/{id}/under-review/{isAccepted}";
    let url = "user/approve";

    let body = {
      Id:id || 0,
      UserId: userId || 0,
      SupervisorComments: comments || null,
      Approved: isAccepted,
    };

    // return await this._http.get(url).toPromise();
    return await this._http.put(url, body).toPromise();
  }

  /**
   * add user with Auth server
   * @param data    request data
   * @returns {Promise}
   */
  async addUpdateUser(userData: User, file?: any) {
    // const getUrl = 'user/list/' + (pageNo || 0) + '/' + (limit || 5);
    // let url = environment.baseApiUrl + "user/list/filtered/" + (pageNo || 0) + '/' + (limit || 5) + (status || null) + "/" + (query || null);
    // let url = "user/add";
    let url = userData && userData.id ? "user/update" : "user/add";

    // let userModuleIds = [];
    // if (userData.userModuleIds && userData.userModuleIds.length > 0) {
    //   userData.userModuleIds.forEach(element => {
    //     if (element) {
    //       userModuleIds.push(element);
    //     }
    //   });
    // }

    let body = {
      Id: userData.id || 0,
      Code: userData.code || "",
      Username: userData.userName || "",
      FirstName: userData.firstName || "",
      LastName: userData.lastName || "",
      Email: userData.email || "",
      Password: userData.password || "",
      Mobile: userData.mobile || "",
      GroupId: userData.groupId || 0,
      DepartmentId: userData.departmentId || 0,
      UnitId: userData.unitId || 0,
      DesignationId: userData.designationId || 0,
      OrganizationId: userData.organizationId || 0,
      GrossCategory: userData.grossCategory || 0,
      Active: userData.isActive || false,
      // Active: userData.active || false,

      "ProfessionalProfile.Id": 0,
      "ProfessionalProfile.Experience": "",
      "ProfessionalProfile.Expertise": "",
      "ProfessionalProfile.Qualification": "",
      "ProfilePicture": ""

    };


    let formDataBody: FormData = new FormData();
    // formDataBody.append('CaseBasicId', caseBasicId);
    // formDataBody.append('File', file, file.name);
    formDataBody.append('Id', (userData.id || 0).toString());
    formDataBody.append('Code', (userData.code || ""));
    formDataBody.append('Username', (userData.firstName + userData.lastName || ""));
    formDataBody.append('FirstName', (userData.firstName || ""));
    formDataBody.append('LastName', (userData.lastName || ""));
    formDataBody.append('Email', (userData.email || ""));
    formDataBody.append('Password', (userData.password || ""));
    formDataBody.append('Mobile', (userData.mobile || ""));
    formDataBody.append('NotificationGroups', (userData.notificationGroup || ""));
    formDataBody.append('Nic', (userData.nic || 0).toString());
    formDataBody.append('Ntn', (userData.ntn || 0).toString());

    userData.groupId ? formDataBody.append('GroupId', (userData.groupId || 0).toString()) : null;
    userData.departmentId ? formDataBody.append('DepartmentId', (userData.departmentId || 0).toString()) : null;
    userData.unitId ? formDataBody.append('UnitId', (userData.unitId || 0).toString()) : null;
    userData.designationId ? formDataBody.append('DesignationId', (userData.designationId || 0).toString()) : null;
    userData.organizationId ? formDataBody.append('OrganizationId', (userData.organizationId || 0).toString()) : null;
    userData.grossCategory ? formDataBody.append('GrossCategory', (userData.grossCategory || 0).toString()) : null;

    formDataBody.append('Active', (userData.isActive || false).toString());
    formDataBody.append('Verified', (userData.verified || false).toString());
    formDataBody.append('ProfessionalProfile.Experience', (userData.userProfessionalProfile.experience || ""));
    formDataBody.append('ProfessionalProfile.Expertise', (userData.userProfessionalProfile.expertise || ""));
    formDataBody.append('ProfessionalProfile.Qualification', (userData.userProfessionalProfile.qualification || ""));
    // formDataBody.append('UserModules', (userModuleIds || ""));

    // if (file) {
    if (userData.profilePictureFile) {
      // formDataBody.append('ProfilePicture', file);
      formDataBody.append('ProfilePicture', userData.profilePictureFile);
    }

    // formDataBody.append('AllowDuplication', new Boolean(allowDuplication).toString());


    // return await this._http.post(url, body).toPromise();
    return await this._http.post(url, formDataBody).toPromise();
  }

  /**
   * add user with Auth server
   * @param data    request data
   * @returns {Promise}
   */
  // async updateUserRole(userId: number, roleId: number) {
  // async updateUserRole(userId: number, roles: Role[]) {
  async updateUserRole(userId: number, roles: number[]) {
    // const getUrl = 'user/list/' + (pageNo || 0) + '/' + (limit || 5);
    // let url = environment.baseApiUrl + "user/list/filtered/" + (pageNo || 0) + '/' + (limit || 5) + (status || null) + "/" + (query || null);
    // let url = "user/role/update";
    let url = "user/" + (userId || null) + "/roles/add";

    // let body = {
    //   userId: userId || 0,
    //   roleId: roleId || 0,
    // };

    let body = [];

    // if (roles && roles.length > 0) {
    //   roles.forEach(element => {
    //     if (element.id) {
    //       body.push(element.id);
    //     }
    //   });
    // }
    if (roles && roles.length > 0) {
      roles.forEach(element => {
        if (element) {
          body.push(element);
        }
      });
    }

    return await this._http.put(url, body).toPromise();
  }
  async updateUserorganization(userId: number,organizations: number[]) {
    // const getUrl = 'user/list/' + (pageNo || 0) + '/' + (limit || 5);
    // let url = environment.baseApiUrl + "user/list/filtered/" + (pageNo || 0) + '/' + (limit || 5) + (status || null) + "/" + (query || null);
    // let url = "user/role/update";
    let url = "user/" + (userId || null) + "/organizations/add";

    // let body = {
    //   userId: userId || 0,
    //   roleId: roleId || 0,
    // };

    let body = [];

    // if (roles && roles.length > 0) {
    //   roles.forEach(element => {
    //     if (element.id) {
    //       body.push(element.id);
    //     }
    //   });
    // }
    if (organizations && organizations.length > 0) {
      organizations.forEach(element => {
        if (element) {
          body.push(element);
        }
      });
    }

    return await this._http.put(url, body).toPromise();
  }

async updateUsercompanies(userId: number,companies: number[]) {
    // const getUrl = 'user/list/' + (pageNo || 0) + '/' + (limit || 5);
    // let url = environment.baseApiUrl + "user/list/filtered/" + (pageNo || 0) + '/' + (limit || 5) + (status || null) + "/" + (query || null);
    // let url = "user/role/update";
    let url = "user/" + (userId || null) + "/companies/add";

    // let body = {
    //   userId: userId || 0,
    //   roleId: roleId || 0,
    // };

    let body = [];

    // if (roles && roles.length > 0) {
    //   roles.forEach(element => {
    //     if (element.id) {
    //       body.push(element.id);
    //     }
    //   });
    // }
    if (companies && companies.length > 0) {
      companies.forEach(element => {
        if (element) {
          body.push(element);
        }
      });
    }

    return await this._http.put(url, body).toPromise();
  }
  

  async updateUsergroup(userId: number,groups: number[]) {
    // const getUrl = 'user/list/' + (pageNo || 0) + '/' + (limit || 5);
    // let url = environment.baseApiUrl + "user/list/filtered/" + (pageNo || 0) + '/' + (limit || 5) + (status || null) + "/" + (query || null);
    // let url = "user/role/update";
    let url = "user/" + (userId || null) + "/groups/add";

    // let body = {
    //   userId: userId || 0,
    //   roleId: roleId || 0,
    // };

    let body = [];

    // if (roles && roles.length > 0) {
    //   roles.forEach(element => {
    //     if (element.id) {
    //       body.push(element.id);
    //     }
    //   });
    // }
    if (groups && groups.length > 0) {
      groups.forEach(element => {
        if (element) {
          body.push(element);
        }
      });
    }

    return await this._http.put(url, body).toPromise();
  }
  async updateUserpotype(userId: number,potype: number[]) {
    // const getUrl = 'user/list/' + (pageNo || 0) + '/' + (limit || 5);
    // let url = environment.baseApiUrl + "user/list/filtered/" + (pageNo || 0) + '/' + (limit || 5) + (status || null) + "/" + (query || null);
    // let url = "user/role/update";
    let url = "user/" + (userId || null) + "/potype/add";

    // let body = {
    //   userId: userId || 0,
    //   roleId: roleId || 0,
    // };

    let body = [];

    // if (roles && roles.length > 0) {
    //   roles.forEach(element => {
    //     if (element.id) {
    //       body.push(element.id);
    //     }
    //   });
    // }
    if (potype && potype.length > 0) {
      potype.forEach(element => {
        if (element) {
          body.push(element);
        }
      });
    }

    return await this._http.put(url, body).toPromise();
  }

    /**
   * add user with Auth server
   * @param data    request data
   * @returns {Promise}
   */
    async updateUserModule(userId: number, modules: number[]) {
      let url = "user/" + (userId || null) + "/assign/modules";


      let body = [];

      if (modules && modules.length > 0) {
        modules.forEach(element => {
          if (element) {
          let userModule = {
            userId: userId,
            ModuleId: element
          }
            body.push(userModule);
          }
        });
      }

      return await this._http.post(url, body).toPromise();
    }

  /**
   * get user info with id
   * @param userId    user id
   * @returns {Promise}
   */
  async getUserInfo(userId: number) {
    // const getUrl = 'user/list/' + (pageNo || 0) + '/' + (limit || 5);
    // let url = environment.baseApiUrl + "user/list/filtered/" + (pageNo || 0) + '/' + (limit || 5) + (status || null) + "/" + (query || null);
    let url = "user/profile/" + (userId || 0);

    return await this._http.get(url).toPromise();
  }


  /**
   * update user password with Auth server
   * @param data    request data
   * @returns {Promise}
   */
  async updateUserPassword(userId: number, currentPass: string, newPass: string) {
    let url = "user/password/change";

    let body = {
      Id: userId || null,
      OldPassword: currentPass || null,
      NewPassword: newPass || null
    };

    return await this._http.put(url, body).toPromise();
  }

  /**
  * count of users role wise with Auth server
  * @param searchKey     search keyword
  * @returns {Promise}
  */
  async getUsersRoleWiseCount() {
    let url = "user/all/count/role";

    return await this._http.get(url).toPromise();
  }

  /**
   * get user list w.r.t departmentId with Auth server
   * @param departmentId    department id
   * @returns {Promise}
   */
  async getUserListViaDId(departmentId) {
    let url = "user/department/" + (departmentId || null);
    return await this._http.get(url).toPromise();
  }

  /**
   * get user list w.r.t departmentId and roleId with Auth server
   * @param departmentId    department id
   * @returns {Promise}
   */
  async getUserListViaDIdAndRId(departmentId, roleId) {
    // let url = "user/all/" + (departmentId || null) + "/" + (roleId || null);
    let url = "user/all/?" + ("dept") + "=" + (departmentId || null) + "&" + ("role") + "=" + (roleId || null);
    return await this._http.get(url).toPromise();
  }

  async getUserListViaType(type?: string, value?: string) {
    // let url = "user/all/role?role=auditor";
    // let url = "user/all/designation?designation=auditor";
    let url = "user/all/" + (type || "name") + "?" + (type || "name") + "=" + (value || "name") + "";

    return await this._http.get(url).toPromise();
  }

  async getUserListListViaRole(roleName?: string) {
    // let url = "user/all/role/" + (searchKey || null);
    let url = "user/all/role/?role=" + (roleName);

    return await this._http.get(url).toPromise();
  }

  /**
  * list of user w.r.t groupId with Auth server
  * @param groupId     groupId
  * @returns {Promise}
  */
  async getUserListViaGroupId(groupId: number) {
    let url = "user/all/group?group=" + (groupId || null);

    return await this._http.get(url).toPromise();
  }

  async getDashboardUserDepartmentListAll(queryParam?: string) {
    let url = "user/dashboard/department" + (queryParam ? queryParam : "");

    return await this._http.get(url).toPromise();
  }

  // ===================== Resource Replacement Start ===========================

  /**
   * get Resource Replacement info w.r.t resourceReplacementId with Auth server
   * @param resourceReplacementId    ResourceReplacement id
   * @returns {Promise}
   */
  async getResourceReplacementDetailViaId(resourceReplacementId: number) {
    let url = "user/resource-replacement/" + (resourceReplacementId || null);
    return await this._http.get(url).toPromise();
  }

  /**
   * All List of Resource Replacement w.r.t searchKey with Auth server
   * @param searchKey     search keyword
   * @returns {Promise}
   */
  async getResourceReplacementListAll(searchKey?: string) {
    // let url = "user/resource-replacement/all/" + (searchKey || null);
    let url = "user/resource-replacement/all";

    return await this._http.get(url).toPromise();
  }

  /**
   * count of Resource Replacement w.r.t searchKey with Auth server
   * @param searchKey     search keyword
   * @returns {Promise}
   */
  async getResourceReplacementListCount(searchKey?: string) {
    // let url = "user/resource-replacement/count/" + (searchKey || null);
    let url = "user/resource-replacement/count";

    return await this._http.get(url).toPromise();
  }

  /**
   * list of Resource Replacement w.r.t pagination and searchKey with Auth server
   * @param pageNo    page index for pagination
   * @param limit     limit list for pagination
   * @param searchKey     search keyword
   * @returns {Promise}
   */
  async getResourceReplacementListPagination(pageNo, limit, searchKey?: string) {
    // let url = "user/resource-replacement/all/" + (pageNo || 0) + '/' + (limit || 5) + '/' + (searchKey || null);
    let url = "user/resource-replacement/all/" + (pageNo || 0) + '/' + (limit || 5);
    return await this._http.get(url).toPromise();
  }

  /**
   * add update Resource Replacement with Auth server
   * @param data    request data
   * @returns {Promise}
   */
  async addUpdateResourceReplacement(resourceReplacementData: any) {
    let url = resourceReplacementData && resourceReplacementData.id ? "user/resource-replacement/update" : "user/resource-replacement/add";

    let body = {
      Id: resourceReplacementData.id || 0,
      Reason: resourceReplacementData.reason || "",
      DepartmentId: resourceReplacementData.departmentId || "",
      UserBeingReplacedId: resourceReplacementData.userBeingReplacedId || "",
      ReplacedWithUserId: resourceReplacementData.replacedWithUserId || "",


    };

    if (resourceReplacementData && resourceReplacementData.id) {
      return await this._http.put(url, body).toPromise();
    }
    else {
      return await this._http.post(url, body).toPromise();
    }

  }

  async getRoleListAll() {
    let url = "role/all";
    return await this._http.get(url).toPromise();
  }

  // ===================== Resource Replacement End ===========================

}
