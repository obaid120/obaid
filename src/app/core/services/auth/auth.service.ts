import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend, HttpHeaders } from '@angular/common/http';
import { observable, Observable, BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';

import { User, UserRole, UserPermission, UserNavigation } from '../../models/user.model';
import { Token } from '../../models/token.model';
import { Role } from '../../models/role.model';
import { Permission } from '../../models/permission.model';
// import { environment } from '../../../../environments/environment';
import { MessageTypes, Message } from '../../models/message.model';
import { UIService } from '../ui/ui.service';


import { throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ConfigurationParameter, ConfigurationProfile } from '../../models/configuration.model';
import { environment } from '../../../../environments/environment';
import { LogService } from '../log/log.service';


@Injectable()
export class AuthService {

  private _http: HttpClient;
  // isLoggedIn: Subject<boolean> = new Subject<boolean>();
  // email = new Subject<string>();
  email: string = null;
  loginStatusChanged = new Subject<boolean>();
  loginUserStatusChanged = new Subject<User>();
  configurationProfileStatusChanged = new Subject<boolean>();
  configurationProfileChanged = new Subject<ConfigurationProfile>();

  // tokenStatusChanged: Subject<number> = new Subject<number>();
  tokenStatusChanged: Subject<boolean> = new Subject<boolean>();

  constructor(
    _handler: HttpBackend,
    private _router: Router,
    private _uiService: UIService,
    private _logService: LogService
  ) {
    this._http = new HttpClient(_handler);
  }

  _completeUrl(url) {
    // return environment.apiBaseUrl + url;
    return environment.apiBaseUrl + url;
  }

  /**
   * Logins auth service
   * @param user
   * @param token
   * @returns
   */
  async getIpClient() {
    const url = "http://api.ipify.org/?format=jsonp&callback=JSONP_CALLBACK";

    return await this._http.get(url).toPromise();
  }
  async getIpClient1() {
    const url = "http://ipinfo.io";

    return await this._http.get(url).toPromise();
  }



  /**
   * Logins auth service
   * @param user
   * @param token
   * @returns
   */
  async login(user: User, token?: string) {
    // const url = environment.authBaseUrl + 'user/login';
    // const url = environment.authBaseUrl;
    const url = environment.authBaseUrl;

    // params.append('grant_type', environment.grant_type);
    const body = {
      username: user.email,
      password: user.password,
      // clientId: environment.client_id,
      // clientSecret: environment.client_secret,
      // grant_type: environment.grant_type,
      clientId: environment.client_id,
      clientSecret: environment.client_secret,
      grant_type: environment.grant_type,
      // responseToken: token
    };

    const params = new URLSearchParams();
    // params.append('grant_type', environment.grant_type);
    params.append('grant_type', environment.grant_type);
    params.append('username', user.email);
    params.append('password', user.password);
    // params.append('client_id', environment.client_id);
    // params.append('client_secret', environment.client_secret);
    params.append('client_id', environment.client_id);
    params.append('client_secret', environment.client_secret);

    // const options = new RequestOptions();

    // options.headers = new Headers();
    // options.headers.append('Content-Type', 'application/x-www-form-urlencoded');

    // let headers = new HttpHeaders();
    // headers.set('Content-Type', 'application/x-www-form-urlencoded');

    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');

    let header = new HttpHeaders({ 'content-type': 'application/x-www-form-urlencoded' });

    // return await this._http.post(url, body, { headers: header }).toPromise();
    return await this._http.post(url, params.toString(), { headers: header }).toPromise();
  }

  async login1(user: User, token?: string) {
    // const url = environment.apiBaseUrl + 'user/login';
    const url = environment.apiBaseUrl + ('user/login');


    // const body = {
    //   username: user.email,
    //   password: user.password,
    //   clientId: environment.client_id,
    //   clientSecret: environment.client_secret,
    //   grant_type: environment.grant_type,

    //   // responseToken: token
    // };
    this._logService.logMessage("user")
    this._logService.logMessage(user)
    const body = {
      Email: user.email,
      Password: user.password,
      // IPAddress: token
    };

    return await this._http.post(url, body).toPromise();
  }

  /**
   * Refreshs token
   * @returns
   */
  async refreshToken() {
    // let url = environment.apiBaseUrl + 'user/token/refresh';
    let url = environment.apiBaseUrl + 'user/token/refresh';

    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    const body = {
      // clientId: environment.client_id,
      // clientSecret: environment.client_secret,
      // clientId: environment.client_id,
      // clientSecret: environment.client_secret,
      // refreshToken: localStorage.getItem('refresh_token')
      "RefreshToken": localStorage.getItem('refresh_token'),
      "AccessToken": localStorage.getItem('token_id'),
    };

    return await this._http.post(url, body, { headers }).toPromise();
  }

  async forgotPassword(email) {
    // let url = environment.apiBaseUrl + 'user/forgot/password/' + (email || null);
    // let url = environment.apiBaseUrl + 'user/forgot/password';
    let url = environment.apiBaseUrl + 'user/forgot/password';

    // let body = {};
    let body = {
      Email: email || null
    };
    // return await this._http.get(url).toPromise();
    return await this._http.post(url, body).toPromise();
  }

  async verifyKey(key: string, userId?: number) {
    // let url = environment.apiBaseUrl + 'user/verify/account';
    // let url = environment.apiBaseUrl + 'verify/user/{userId}/{verificationToken}';
    // let url = environment.apiBaseUrl + 'verify/user/' + (userId || null) + '/' + (key || null) + '';
    // let url = environment.apiBaseUrl + 'verify/user/' + (key || null) + '';
    let url = environment.apiBaseUrl + 'verify/user/' + (key || null) + '';

    let body = { VerificationKey: key || null };

    return await this._http.get(url).toPromise();
    // return await this._http.put(url, body).toPromise();
  }

  async resetPassword(password, code, token?: any) {
    // let url = environment.apiBaseUrl + 'user/password/verifyandchange';
    // let url = environment.apiBaseUrl + 'reset/password/{token}/{password}';
    // let url = environment.apiBaseUrl + 'reset/password/' + (code || null) + '/' + (password || null) + '';
    // let url = environment.apiBaseUrl + 'reset/password';
    let url = environment.apiBaseUrl + 'reset/password';

    let body = {
      Token: code || null,
      Password: password || null,
      // responseToken: token || null
      // currentPassword: "string",
    };

    // return await this._http.put(url, body).toPromise();
    // return await this._http.get(url).toPromise();
    return await this._http.post(url, body).toPromise();
  }

  async saveToken(response: Response) {
    // let data: any = response.json();
    let data: any = response;
    var d = new Date();


    let expires_in = data && data.expires_in ? data.expires_in : null;
    let access_token = data && data.access_token ? data.access_token : null;
    let refresh_token = data && data.refresh_token ? data.refresh_token : null;
    let token_type = data && data.token_type ? data.token_type : null;


    // this.token_expires = Date.now() + ((data.expires_in - 60) * 1000);
    // this.token_expires = (d.getTime() + (data.expires_in * 1000));

    // let token_expires = (d.getTime() + ((data.expires_in - 60) * 1000));
    let token_expires = (d.getTime() + ((expires_in - 60) * 1000));
    // let token_expires = (d.getTime() + ((data.expires_in - 3380) * 1000));

    // this.token_expires = (d.getTime() + ((60) * 1000));

    // console.log('expiry:' + data.expires_in);
    // this._logService.logMessage('expiry : ' + data.expires_in);

    // localStorage.setItem('token_id', data.access_token);
    // localStorage.setItem('token_expiry', token_expires.toString());
    // localStorage.setItem('refresh_token', data.refresh_token);
    // localStorage.setItem('token_type', data.token_type);

    localStorage.setItem('token_id', access_token);
    localStorage.setItem('token_expiry', token_expires.toString());
    localStorage.setItem('refresh_token', refresh_token);
    localStorage.setItem('token_type', token_type);

    this.tokenStatusChanged.next(true);

    // setTimeout(function(){ this.logoutUser(); }, (data.expires_in * 1000));
    // console.log();

    // return data;
  }

  storeUser(user: User) {
    if (!user) { return; }

    localStorage.setItem('user', JSON.stringify(user));
    this.loginUserStatusChanged.next(user);
  }

  storeRole(roles: Role[]) {
    if (!roles) { return; }

    localStorage.setItem('userRoles', JSON.stringify(roles));
    // this.loginUserRoleStatusChanged.next(roles);
  }

  storeUserRole(userRoles: UserRole[]) {
    if (!userRoles) { return; }

    localStorage.setItem('userRoles', JSON.stringify(userRoles));
    // this.loginUserRoleStatusChanged.next(roles);
  }

  storePermission(permissions: Permission[]) {
    if (!permissions) { return; }

    localStorage.setItem('userPermissions', JSON.stringify(permissions));
    // this.loginUserPermissionStatusChanged.next(permissions);
  }

  storeUserPermission(userPermissions: UserPermission[]) {
    if (!userPermissions) { return; }

    localStorage.setItem('userPermissions', JSON.stringify(userPermissions));
    // this.loginUserPermissionStatusChanged.next(permissions);
  }

  storeUserNavigation(userNavigations: UserNavigation[]) {
    if (!userNavigations) { return; }

    localStorage.setItem('userNavigations', JSON.stringify(userNavigations));
    // this.loginUserNavigationstatusChanged.next(permissions);
  }

  storeConfigurationProfile(configurationProfile: ConfigurationProfile) {
    if (!configurationProfile) { return; }

    localStorage.setItem('configurationProfile', JSON.stringify(configurationProfile));
    this.configurationProfileChanged.next(configurationProfile);
  }

  storeConfigurationParameter(configurationParameters: ConfigurationParameter[]) {
    if (!configurationParameters) { return; }

    localStorage.setItem('configurationParameters', JSON.stringify(configurationParameters));
  }

  checkLogin(): boolean {
    if (localStorage.getItem('token_id')) {
      // this.isLoggedIn.next(true);
      // this.loginStatusChanged.next(true);
      return true;
    } else {
      // this.isLoggedIn.next(false);
      // this.loginStatusChanged.next(false);
      return false;
    }
  }

  getUser(): User {
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user'));
    }
    // return;
    return new User();
  }

  getTokenData(): Token {

    const token = new Token();

    token.tokenId = localStorage.getItem('token_id');
    token.tokenExpiry = localStorage.getItem('token_expiry');
    token.refreshToken = localStorage.getItem('refresh_token');
    token.tokenType = localStorage.getItem('token_type');

    return token;

  }

  getUserRolePermisison(): Role[] {
    if (localStorage.getItem('userRoles')) {
      return JSON.parse(localStorage.getItem('userRoles'));
    }
    return null;
  }

  getUserRole(): UserRole[] {
    if (localStorage.getItem('userRoles')) {
      return JSON.parse(localStorage.getItem('userRoles'));
    }
    return null;
  }

  getUserPermissions(): UserPermission[] {
    if (localStorage.getItem('userPermissions')) {
      return JSON.parse(localStorage.getItem('userPermissions'));
    }
    return null;
  }

  getUserNavigations(): UserNavigation[] {
    if (localStorage.getItem('userNavigations')) {
      return JSON.parse(localStorage.getItem('userNavigations'));
    }
    return null;
  }

  getConfigurationProfile(): ConfigurationProfile {
    if (localStorage.getItem('configurationProfile')) {
      return JSON.parse(localStorage.getItem('configurationProfile'));
    }
    return new ConfigurationProfile();
  }

  getConfigurationParameter(): ConfigurationParameter[] {
    if (localStorage.getItem('configurationParameter')) {
      return JSON.parse(localStorage.getItem('configurationParameter'));
    }
    return null;
  }

  isLoggedIn(): boolean {
    const token = this.getTokenData();
    if (token && token.tokenExpiry) {
      if (token.tokenExpiry > Date.now().toString()) {
        return true;
      }
    }
    return false;
  }

  register() {

  }

  async logoutUser() {



    // const url = environment.apiBaseUrl + 'user/logout';
    const url = environment.apiBaseUrl + 'user/logout';

    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    const body = {
      // clientId: environment.client_id,
      // clientSecret: environment.client_secret,
      clientId: environment.client_id,
      clientSecret: environment.client_secret,
      accessToken: localStorage.getItem('token_id'),
      refreshToken: localStorage.getItem('refresh_token')
    };

    await this._http.post(url, body, { headers }).toPromise();


    console.log('logout');
    localStorage.clear();
    this.loginStatusChanged.next(null);
    this.configurationProfileChanged.next(null);
    // this.loginUserStatusChanged.next(null);
    // this.loginUserRoleStatusChanged.next(null);
    // this.loginUserPermissionStatusChanged.next(null);
    this._router.navigate(['/']);
    window.location.reload();

    // this.loginStatusChangedNew.next("Abc");
  }

  async logoutUser_() {



    // const url = environment.apiBaseUrl + 'user/logout';
    const url = environment.apiBaseUrl + 'user/logout';

    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    const body = {
      // clientId: environment.client_id,
      // clientSecret: environment.client_secret,
      clientId: environment.client_id,
      clientSecret: environment.client_secret,
      accessToken: localStorage.getItem('token_id'),
      refreshToken: localStorage.getItem('refresh_token')
    };

    // await this._http.post(url, body, { headers }).toPromise();


    console.log('logout');
    localStorage.clear();
    this.loginStatusChanged.next(null);
    this.configurationProfileChanged.next(null);
    // this.loginUserStatusChanged.next(null);
    // this.loginUserRoleStatusChanged.next(null);
    // this.loginUserPermissionStatusChanged.next(null);
    this._router.navigate(['/']);
    setTimeout(() => {
      location.reload();
        }, 100);
    // window.location.reload();
    // this.loginStatusChangedNew.next("Abc");
  }


  errStatusCheckResponse(err: any): any {
    console.log('err==1', err);

    let errMsg: string;
    // console.log('err', err);

    const msg = new Message();
    // msg.title = '';
    msg.iconType = '';
    if (err.status == 400) {
      // msg.msg = err.json() && err.json().message ? err.json().message : 'Sorry, an error has occured';
      // msg.msg = err && err.message ? err.message : 'Sorry, an error has occured';
      msg.msg = err ? (err.error && err.error.cause ? err.error.cause : (err.message ? err.message : "Sorry, an error has occured")) : 'Sorry, an error has occured';

      msg.msgType = MessageTypes.Error;
      // msg.autoCloseAfter = 400;
      this._uiService.showToast(msg, '');
      return msg;

    } else if (err.status == 401) {
      // msg.msg = err.json() && err.json().message ? err.json().message : 'Sorry, an error has occured';
      // msg.msg = err && err.message ? err.message : 'Sorry, an error has occured';
      // msg.msgType = MessageTypes.Error;
      // msg.autoCloseAfter = 400;
      // this._uiService.showToast(msg, '');
      // return msg;

    } else if (err.status == 403) {
      msg.msg = 'Sorry, you dont have access';
      msg.msgType = MessageTypes.Error;
      msg.autoCloseAfter = 40000000;
      this._uiService.showToast(msg, '');
      return msg;

      // this._router.navigate(['/permission']);

    } else if (err.status == 404 && err.statusText == 'Not Found') {

      msg.msg = 'Sorry, an error has occured';
      msg.msgType = MessageTypes.Error;
      msg.autoCloseAfter = 400000000;
      this._uiService.showToast(msg, '');
      return msg;

      // this._router.navigate(['/error']);

    } else if (err.status == 404 && err.statusText !== 'Not Found') {

      // msg.msg = err.json() && err.json().message ? err.json().message : 'Sorry, an error has occured';
      msg.msg = err && err.message ? err.message : 'Sorry, an error has occured';
      msg.msgType = MessageTypes.Error;
      msg.autoCloseAfter = 4000000000;
      this._uiService.showToast(msg, '');
      return msg;

    } else {
      msg.msg = 'Sorry, an error has occured';
      msg.msgType = MessageTypes.Error;
      msg.autoCloseAfter = 4000000000;
      this._uiService.showToast(msg, '');
      return msg;
    }
  }

  errStatusCheckResponseAuth(err: any): any {
    let errMsg: string;
    console.log('err==2', err);

    const msg = new Message();
    // msg.title = '';
    msg.iconType = '';
    if (err.status == 400) {
      // msg.msg = err.json() && err.json().message ? err.json().message : 'Sorry, an error has occured';
      msg.msg = err && err.error && err.error.message ? err.error.message : 'Sorry, an error has occured';
      // msg.msg = err ? (err.error && err.error.cause ? err.error.cause : (err.message ? err.message : "Sorry, an error has occured")) : 'Sorry, an error has occured';

      msg.msgType = MessageTypes.Error;
      // msg.autoCloseAfter = 400;
      this._uiService.showToast(msg, '');
      return msg;

    } else if (err.status == 401) {
      // // msg.msg = err.json() && err.json().message ? err.json().message : 'Sorry, an error has occured';
      // msg.msg = err && err.error && err.error.message ? err.error.message : 'Sorry, an error has occured';
      // msg.msgType = MessageTypes.Error;
      // msg.autoCloseAfter = 400;
      // this._uiService.showToast(msg, '');
      // return msg;

    } else if (err.status == 403) {
      msg.msg = 'Sorry, you dont have access';
      msg.msgType = MessageTypes.Error;
      // msg.autoCloseAfter = 400;
      this._uiService.showToast(msg, '');
      return msg;

      // this._router.navigate(['/permission']);

    } else if (err.status == 404 && err.statusText == 'Not Found') {

      msg.msg = 'Sorry, an error has occured';
      msg.msgType = MessageTypes.Error;
      // msg.autoCloseAfter = 400;
      this._uiService.showToast(msg, '');
      return msg;

      // this._router.navigate(['/error']);

    } else if (err.status == 404 && err.statusText !== 'Not Found') {

      // msg.msg = err.json() && err.json().message ? err.json().message : 'Sorry, an error has occured';
      msg.msg = err && err.error && err.error.message ? err.error.message : 'Sorry, an error has occured';
      msg.msgType = MessageTypes.Error;
      // msg.autoCloseAfter = 400;
      this._uiService.showToast(msg, '');
      return msg;

    } else {
      msg.msg = 'Sorry, an error has occured';
      msg.msgType = MessageTypes.Error;
      // msg.autoCloseAfter = 400;
      this._uiService.showToast(msg, '');
      return msg;
    }
  }

}
