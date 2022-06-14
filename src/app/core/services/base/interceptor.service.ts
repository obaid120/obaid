import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
// import { ErrorDialogService } from './errorDialog.service';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Token } from '../../models/token.model';
import { AuthService } from '../auth/auth.service';
// import { environment } from '../../../../environments/environment';
import { HttpCancelService } from './httpCancel.service';
import { LogService } from '../log/log.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  refreshMaxCounter: number = 3;
  refreshCounter: number = 0;

  constructor(
    // private _errorDialogService: ErrorDialogService,
    private httpCancelService: HttpCancelService,
    private _logService: LogService,
    private _authService: AuthService,
    
  ) {

  }

  _completeUrl(url) {
    // return environment.apiBaseUrl + url;
    return environment.apiBaseUrl + url;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {



    let storeToken: Token;
    storeToken = this._authService.getTokenData();
    // this._logService.logMessage("test storeToken");
    // this._logService.logMessage(storeToken);

    const token: string = storeToken ? storeToken.tokenId : '88888888888888888';
    // this._logService.logMessage("test token");
    // this._logService.logMessage(token);
    if (token) {
      req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
    }
    // req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    // req = req.clone({ headers: req.headers.set('Content-Type', ['application/json', 'multipart/form-data']) });
    // req = req.clone({ headers: req.headers.set('Content-Type', 'multipart/form-data') });
    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
    // req = req.clone({ url: this._completeUrl(req.url + '?t=' + new Date().getTime()) });
    req = req.clone({ url: this._completeUrl(req.url) });

    // this._logService.logMessage("req : ");
    // this._logService.logRequest(req);
    return next.handle(req).pipe(

      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // this._logService.logMessage("_handler map : ");
          // this._logService.logResponse(event);

        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        let data = {};
        data = {
          data: error && error.error && error.error.data ? error.error.data : null,
          message: error && error.error && error.error.message ? error.error.message : '',
          status: error.status
        };
        // this._logService.logMessage("_handler error : ");
        // this._logService.logResponseError(data);
        // this._logService.logResponseError(error);
        // return throwError(error);

        if (error.status == 401) {

          // if (this.refreshCounter = 0) {
          this.httpCancelService.cancelPendingRequests();
          // }


          this.refresTokenWithExpire();
        }




        return throwError(data);
      })
    );
  }

  async refresTokenWithExpire() {
    // this._logService.logMessage("refresTokenWithExpire");
    // this._logService.logMessage(localStorage.getItem('token_expiry'));
    if (localStorage.getItem('token_expiry')) {

      var dateNow = new Date();
      var dateExpire = parseInt(localStorage.getItem('token_expiry'));
      var checkTime = (dateExpire - dateNow.getTime()) - 600000;

      // this._logService.logMessage("checkTime");
      // this._logService.logMessage(checkTime);

      // setTimeout(async () => {

      if (this.refreshCounter < this.refreshMaxCounter) {
        this.refreshCounter++;


        try {

          let res: any = await this._authService.refreshToken();

          // await this._authService.saveToken(res);
          await this._authService.saveToken(res.data);

          // setTimeout(() => {
          //     this.refresTokenWithExpire();
          // }, 10000);

        } catch (error) {

          // this._logService.logMessage("refresh error");
          // setTimeout(() => {
          //   this.refresTokenWithExpire();
          // }, 10000);

          // // await this._authService.logoutUser();
          // await this._authService.logoutUser_();

          // =================
          // if (this.refreshCounter < this.refreshMaxCounter) {
          //   this.refreshCounter++;
          //   this.refresTokenWithExpire();
          // }
          // else {
          //   this.refreshCounter = 0;
          //   // await this._authService.logoutUser();
          //   await this._authService.logoutUser_();
          // }


        }

      }
      else {
        this.refreshCounter = 0;
        // await this._authService.logoutUser();
        await this._authService.logoutUser_();
      }

      // }, Math.round(checkTime));
    }
  }
}
