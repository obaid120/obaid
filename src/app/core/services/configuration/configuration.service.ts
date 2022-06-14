import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';

import { AuthService } from '../auth/auth.service';

// import { environment } from '../../../../environments/environment';

import { ConfigurationProfile, ConfigurationParameter } from '../../models/configuration.model';
import { LogService } from '../log/log.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class ConfigurationService {
    constructor(
        private _authService: AuthService, private _http: HttpClient,
        _handler: HttpBackend, private _logService: LogService
    ) {
        // this._http = new HttpClient(_handler);
    }
    _completeUrl(url) {
        // return environment.apiBaseUrl + url;
        return environment.apiBaseUrl + url;
    }

    /**
    * get Configuration Profile info w.r.t ConfigurationProfileId with Auth server
    * @param ConfigurationProfileId    ConfigurationProfile id
    * @returns {Promise}
    */
    async getConfigurationProfileViaId(configurationProfileId) {
        // let url = "configuration/profile/{id}";
        let url = "configuration/profile/" + (configurationProfileId || null);
        return await this._http.get(url).toPromise();
    }

    /**
    * get Configuration Profile info w.r.t ConfigurationProfileName with Auth server
    * @param ConfigurationProfileName    ConfigurationProfile Name
    * @returns {Promise}
    */
    async getConfigurationProfileViaName(ConfigurationProfileName?: string) {
        // let url = "configuration/all/{profileKey}";
        // let url = "configuration/all/{name}";
        // let url = "configuration/all/" + (ConfigurationProfileName || null);
        // let url = "configuration/all/" + (ConfigurationProfileName || environment.configurationProfile || "dev");
        let url = "configuration/all/" + (ConfigurationProfileName || environment.configurationProfile || "dev");
        return await this._http.get(url).toPromise();
    }

    /**
    * Configuration Profile list all w.r.t searchKey with Auth server
    * @param searchKey     search keyword
    * @returns {Promise}
    */
    async getConfigurationProfileListAll(searchKey?: string) {
        // let url = "configuration/profile/all/" + (searchKey || null);
        let url = "configuration/profile/all";

        return await this._http.get(url).toPromise();
    }

    /**
    * count of Configuration Profile w.r.t searchKey with Auth server
    * @param searchKey     search keyword
    * @returns {Promise}
    */
    async getConfigurationProfileListCount(searchKey?: string) {
        // let url = "configuration/profile/count/" + (searchKey || null);
        let url = "configuration/profile/count";

        return await this._http.get(url).toPromise();
    }

    /**
     * list of Configuration Profile w.r.t searchKey with Auth server
     * @param pageNo    page index for pagination
     * @param limit     limit list for pagination
     * @param searchKey     search keyword
     * @returns {Promise}
     */
    async getConfigurationProfileListPagination(pageNo, limit, searchKey?: string) {
        // let url = "configuration/profile/all/{pageNo}/{limit}";
        // let url = "configuration/profile/all/" + (pageNo || 0) + '/' + (limit || 5) + '/' + (searchKey || null);
        let url = "configuration/profile/all/" + (pageNo || 0) + '/' + (limit || 5);
        return await this._http.get(url).toPromise();
    }

    /**
    * add update Configuration Profile with Auth server
    * @param data    request data
    * @returns {Promise}
    */
    async addUpdateConfigurationProfile(configurationProfileData: ConfigurationProfile) {
        // let url = "ConfigurationProfile/add";
        let url = configurationProfileData && configurationProfileData.id ? "configuration/profile/update" : "configuration/profile/add";

        let body = {

            Id: configurationProfileData.id || null,
            Name: configurationProfileData.name || null,
            Key: configurationProfileData.key || null,
            Code: configurationProfileData.code || null,
            Description: configurationProfileData.description || null,
            Type: configurationProfileData.valueType || null,
            Value: configurationProfileData.value || null,


        };


        // return await this._http.post(url, body).toPromise();

        if (configurationProfileData && configurationProfileData.id) {
            return await this._http.put(url, body).toPromise();
        }
        else {
            return await this._http.post(url, body).toPromise();
        }
    }


    /**
    * get Configuration Parameter info w.r.t ConfigurationParameterId with Auth server
    * @param ConfigurationParameterId    ConfigurationParameter id
    * @returns {Promise}
    */
    async getConfigurationParameterViaId(configurationParameterId: number) {
        // let url = "configuration/parameter/:parameterId";
        let url = "configuration/parameter/" + (configurationParameterId || null);
        return await this._http.get(url).toPromise();
    }

    /**
    * get Configuration Parameter info w.r.t ConfigurationParameterId with Auth server
    * @param ConfigurationProfile    configurationProfile id
    * @param ConfigurationParameterId    ConfigurationParameter id
    * @returns {Promise}
    */
    async getConfigurationParameterViaPNameId(configurationProfile: string, configurationParameterId: number) {
        // let url = "configuration/profile/:profile/parameter/:parameterId";
        let url = "configuration/profile/" + (configurationProfile || null) + "parameter" + (configurationParameterId || null);
        return await this._http.get(url).toPromise();
    }

    /**
    * get Configuration Parameter info w.r.t ConfigurationParameterName with Auth server
    * @param ConfigurationParameterName    ConfigurationParameter Name
    * @returns {Promise}
    */
    async getConfigurationParameterViaName(ConfigurationParameterName?: string) {
        // let url = "ConfigurationParameter/{name}";
        // let url = "ConfigurationParameter/" + (ConfigurationParameterName || null);
        // let url = "ConfigurationParameter/" + (ConfigurationParameterName || environment.configurationProfile || "dev");
        let url = "ConfigurationParameter/" + (ConfigurationParameterName || environment.configurationProfile || "dev");
        return await this._http.get(url).toPromise();
    }

    /**
    * Configuration Parameter list all w.r.t searchKey with Auth server
    * @param searchKey     search keyword
    * @returns {Promise}
    */
    async getConfigurationParameterListAll(searchKey?: string) {
        // let url = "ConfigurationParameter/all/" + (searchKey || null);
        let url = "ConfigurationParameter/all";

        return await this._http.get(url).toPromise();
    }

    /**
    * count of Configuration Parameter w.r.t searchKey with Auth server
    * @param searchKey     search keyword
    * @returns {Promise}
    */
    async getConfigurationParameterListCount(searchKey?: string) {
        // let url = "ConfigurationParameter/count/" + (searchKey || null);
        let url = "ConfigurationParameter/count";

        return await this._http.get(url).toPromise();
    }

    /**
     * list of Configuration Parameter w.r.t searchKey with Auth server
     * @param pageNo    page index for pagination
     * @param limit     limit list for pagination
     * @param searchKey     search keyword
     * @returns {Promise}
     */
    async getConfigurationParameterListPagination(pageNo, limit, searchKey?: string) {
        // let url = "ConfigurationParameter/all/{pageNo}/{limit}";
        // let url = "ConfigurationParameter/all/" + (pageNo || 0) + '/' + (limit || 5) + '/' + (searchKey || null);
        let url = "ConfigurationParameter/all/" + (pageNo || 0) + '/' + (limit || 5);
        return await this._http.get(url).toPromise();
    }

    /**
    * add update Configuration Parameter with Auth server
    * @param data    request data
    * @returns {Promise}
    */
    async addUpdateConfigurationParameter(configurationParameterData: ConfigurationParameter) {
        // let url = "ConfigurationParameter/add";
        let url = "configuration/profile/parameters/update";
        // let url = configurationParameterData && configurationParameterData.id ? "configuration/profile/parameters/update" : "configuration/profile/parameters/add";

        let body = [{

            Id: configurationParameterData.id || 0,
            ProfileId: configurationParameterData.configurationProfileId || null,
            Name: configurationParameterData.name || null,
            Key: configurationParameterData.key || null,
            Code: configurationParameterData.code || null,
            Description: configurationParameterData.description || null,
            Type: configurationParameterData.valueType || null,
            Value: configurationParameterData.value || null,


        }];


        // return await this._http.post(url, body).toPromise();
        return await this._http.put(url, body).toPromise();

        // if (configurationParameterData && configurationParameterData.id) {
        //     return await this._http.put(url, body).toPromise();
        // }
        // else {
        //     return await this._http.post(url, body).toPromise();
        // }
    }

    /**
    * add update In Bulk Configuration Parameter with Auth server
    * @param data    request data
    * @returns {Promise}
    */
    async addUpdateBulkConfigurationParameter(configurationParametersData: ConfigurationParameter[]) {
        let url = "configuration/profile/parameters/update";

        let params = [];

        if (configurationParametersData && configurationParametersData.length > 0) {
            configurationParametersData.forEach(element => {
                let paramBody = {

                    Id: element.id || null,
                    ProfileId: element.configurationProfileId || null,
                    Name: element.name || null,
                    Key: element.key || null,
                    Code: element.code || null,
                    Description: element.description || null,
                    Type: element.valueType || null,
                    Value: element.value || null,


                };

                params.push(paramBody);

            });
        }

        let body = params;


        return await this._http.put(url, body).toPromise();

    }

}
