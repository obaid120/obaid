import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable, OnDestroy } from "@angular/core";
import { AuthService } from '../services/auth/auth.service';
import { LogService } from '../services/log/log.service';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private _router: Router,
        private _authService: AuthService,
        private _logService: LogService
    ) { }

    canActivate(): boolean {

        if (this._authService.checkLogin()) {
        // if (this._authService.isLoggedIn()) {
            this._logService.logMessage("logged in");
            return true;
        }
        this._logService.logMessage("logged out");
        //Redirect the user before denying them access to this route
        // this._router.navigate(['/']);
        this._router.navigate(['/login']);
        return false;
    }
}
