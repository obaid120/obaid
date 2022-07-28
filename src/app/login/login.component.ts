import { ChangeDetectorRef, Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../core/services/user/user.service';
import { User, UserNavigation, UserPermission, UserRole } from '../core/models/user.model';
import { ChevronSerial } from '../core/models/atk.model';
import { AuthService } from '../core/services/auth/auth.service'
import { LogService } from '../core/services/log/log.service';
import { Message } from '../core/models/message.model';
import { UIService } from '../core/services/ui/ui.service';
import { MappingService } from '../core/services/mapping/mapping.service';
import { Role } from '../core/models/role.model';
import { Permission } from '../core/models/permission.model';
import { UtilityService } from '../core/services/utility/utility.service';
import { ConfigurationService } from '../core/services/configuration/configuration.service';
import { ConfigurationParameter } from '../core/models/configuration.model';
import { LoginStateService } from '../core/services/login-state/login-state.service';
import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  
  // emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  loginForm!: FormGroup;
  user: User = new User();
  userEmail: string;
  userPassword: string;
  isSubmitted = false;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _userService: UserService,
    private _authService: AuthService,
    private _logService: LogService,
    private _uiService: UIService,
    private _mappingService: MappingService,
    private _utilityService: UtilityService,
    private _configurationService: ConfigurationService,
    private _router: Router,
    private loginState: LoginStateService,
    private _snackBar: MatSnackBar
  ) { }





  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    })
  }

  onForget() {
    this.router.navigate(['forgetPassword']);
  }

  async onLogin() {
    // async loginOld() {
    this._logService.logMessage('login');
    const msg = new Message();
    // msg.title = '';

    // this.emailFocusOut();
    if (this.loginForm.invalid) {

      if (this.loginForm.controls['email'].hasError('required') && this.loginForm.controls['password'].hasError('required')) {
        msg.msg = 'Email and password are required.';
      } else if (this.loginForm.controls['email'].hasError('required')) {
        msg.msg = 'Email is required.';
      } else if (this.loginForm.controls['email'].hasError('email')) {
        msg.msg = 'Invalid email address.';
      } else if (this.loginForm.controls['email'].hasError('pattern') || this.loginForm.controls['email'].hasError('incorrect')) {
        msg.msg = 'Invalid email address.';
      } else if (this.loginForm.controls['password'].hasError('required')) {
        msg.msg = 'Password is required.';
      }
      this._uiService.showToast(msg, '');

    } else {
      this._uiService.showSpinner();
      this._logService.logMessage("this.userEmail");
      this._logService.logMessage(this.userEmail);
      this._logService.logMessage(this.userPassword);
      this.isSubmitted = true;
      try {
        this.user.email = this.userEmail;
        this.user.password = this.userPassword;
        // const res: any = await this._authService.login(this.user, token);
        const res: any = await this._authService.login1(this.user);
        this._logService.logMessage("res")
        this._logService.logMessage(res)

        let tokenData = res && res.data ? res.data.token || null : null;
        let userData = res && res.data ? res.data.user || null : null;
        let userDataId = userData && userData.id ? userData.id || null : null;

        await this._authService.saveToken(tokenData);

        let isUserData: User = this._mappingService.mapUser(userData);
        this._authService.storeUser(isUserData);
        try {
          const res2: any = await this._userService.getUserDetailViaId(userDataId);

          this._logService.logMessage('get role permission api success: ');
          this._logService.logResponse(res2);


          const array = res2.data || [];

          const roles: Role[] = [];
          const permissions: Permission[] = [];

          let userRoles: UserRole[] = [];
          let userPermissions: UserPermission[] = [];
          let userNavigations: UserNavigation[] = [];

          const isUser = this._mappingService.mapUser(res2.data);

          userRoles = isUser.userRoles;
          userPermissions = isUser.userPermissions;
          userNavigations = isUser.userNavigations;
          userNavigations.sort(this._utilityService.dynamicSort('navigationItem', 'sortOrder'));

          this._authService.storeUser(isUser);
          this._authService.storeUserRole(userRoles);
          this._authService.storeUserPermission(userPermissions);
          this._authService.storeUserNavigation(userNavigations);


          this._authService.loginStatusChanged.next(true);

          this.refreshConfiguration();
          // this.isSubmitted = false;
          this._logService.logMessage("Search")
          // this._uiService.hideSpinner();
          // window.location.reload();
          setTimeout(() => {
            this.loginState.subject.next(true);
            this.router.navigate(['dashboard']);
            this._uiService.hideSpinner();
          }, 200);

        } catch (error) {
          
          this.isSubmitted = false;
          this._uiService.hideSpinner();

          this._logService.logMessage('get role permission api err: ');
          this._logService.logError(error);

          this._authService.errStatusCheckResponse(error);

          // this._authService.logoutUser();
          this._authService.logoutUser_();
          


        }

      } catch (error) {
        // this.reset.nativeElement.click();
        this._uiService.hideSpinner();
        this.isSubmitted = false;
        this._logService.logMessage('connect token api err: ');
        this._logService.logError(error);
        this._authService.errStatusCheckResponseAuth(error);
      }

    }

  }

  async refreshConfiguration() {
    this._logService.logMessage('refreshConfiguration: ');

    const msg = new Message();
    msg.title = '';

    try {

      let res: any = await this._configurationService.getConfigurationProfileViaName();

      this._logService.logMessage('get ConfigurationProfile api success: ');
      this._logService.logResponse(res);

      if (res) {

        let configurationParameters: ConfigurationParameter[] = [];


        const isConfigurationParameter = this._mappingService.mapConfigurationProfile(res.data);
        this._authService.storeConfigurationProfile(isConfigurationParameter);
      }

    } catch (error) {

      this._logService.logMessage('get ConfigurationProfile api err: ');
      this._logService.logError(error);
      
    }
  }
 

}
