// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {

   logoName : "ATK",
   configurationProfile : "",
   baseHref : "atk-dev",
   production : true,
   showLog : true,
   dynamicSideNav : true,
   permissionHandling : true,
   fontPack : "",

   authBaseUrl : "",
   authRevokeUrl : "",
   // apiBaseUrl : "http://localhost:5001/api/",
   // hubConnection : "http://localhost:5001/",

   apiBaseUrl : "https://apichevron.atksrv.net/portalapi//api/",
   hubConnection : "https://apichevron.atksrv.net/portalapi/",

   // apiBaseUrl : "http://18.142.220.9/api/", // Linux environment
   // hubConnection : "http://18.142.220.9/",

   device : "web",
   grant_type : "password",
   client_id : "ro.web.client",
   client_secret : "secret"
};

// export const environment = {
//   production: true
// };






/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
