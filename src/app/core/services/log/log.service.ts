// import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable()
export class LogService {

    constructor(
        
    ) {

    }

    logMessage(msg) {
        // if (environment.showLog)
        if (environment.showLog)
            console.log(msg);
    }

    logError(err) {
        // if (environment.showLog)
        if (environment.showLog)
            console.error(err);
    }

    logWarn(warn) {
        // if (environment.showLog)
        if (environment.showLog)
            console.warn(warn);
    }

    logRequest(req) {
        // if (environment.showLog) {
        if (environment.showLog) {
            console.log("Request Intercepted");

            console.log(req);
        }
    }

    logResponse(res) {
        // if (environment.showLog) {
        if (environment.showLog) {
            console.log("Response Intercepted");
            console.log(res);
        }
    }

    logResponseError(resErr) {
        // if (environment.showLog) {
        if (environment.showLog) {
            console.log("Response Intercepted with Error");
            console.log(resErr);
        }
    }


}