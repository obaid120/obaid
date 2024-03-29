import { HttpBackend, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { SummaryParams } from "../../models/atk.model";
import { AuthService } from "../auth/auth.service";
import { LogService } from "../log/log.service";


@Injectable()
export class ATKService {

    constructor(
        private _authService: AuthService,
        private _http: HttpClient,
        _handler: HttpBackend,
        private _logService: LogService
    ) {}

    _completeUrl(url) {
        return environment.apiBaseUrl + url;
    }

    async searchSingleSerial(code: string, type: number) {
        let url = "atk/serial/"+ code + "/" + type;
        return await this._http.get(url).toPromise();
    }

    async getAllSerialPaginated(pageNo: number, limit: number) {
        let url = "atk/serial/all/" + pageNo + "/" + limit;
        return await this._http.get(url).toPromise();
    }

    async getAllSerialScanSummaryPageWise(pageNo: number, limit: number, body: SummaryParams) {
        let url = "atk/serial/scan/summary/" + pageNo + "/" + limit;
        return await this._http.post(url, body).toPromise();
    }



    async getAllSerialScanSummaryCount(body: SummaryParams) {
        let url = "atk/serial/scan/summary/count";
        return await this._http.post(url, body).toPromise();
    }

    async getScanSummary() {
        let url ="atk/serial/scan/summary";
        return await this._http.get(url).toPromise();
    }

    async getScans() {
        let url = "atk/serial/scan";
        return await this._http.get(url).toPromise();
    }
}