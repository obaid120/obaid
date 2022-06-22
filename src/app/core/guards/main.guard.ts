import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable, OnDestroy } from "@angular/core";
import { AuthService } from '../services/auth/auth.service';


@Injectable()
export class MainGuard implements CanActivate {

    constructor(private _router: Router,
        private _authService: AuthService) { }

    canActivate(): boolean {

        if (!this._authService.checkLogin()) {
        // if (!this._authService.isLoggedIn()) {
            return true;
        }
        //Redirect the user before denying them access to this route
        this._router.navigate(['/pages/dashboard']);
        return false;
    }
}
