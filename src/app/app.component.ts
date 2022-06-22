import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './core/services/auth/auth.service';
import { LogService } from './core/services/log/log.service';
import { LoginStateService } from './core/services/login-state/login-state.service';
import { UIService } from './core/services/ui/ui.service';
import { SearchFormComponent } from './search-form/search-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private _authService: AuthService,
    private router: Router,
    private _uiService: UIService,
    private _logService: LogService,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private loginState: LoginStateService
  ) { }

  token: string;
  isNavOpen = false;

  loginSub = new Subscription();
  isLoggedIn = false;

  ngOnInit(): void {
    this.isLoggedIn = this._authService.isLoggedIn();
    this.loginSub = this.loginState.subject.subscribe(
      (value) => {
        this.isLoggedIn = value;
        !this.isLoggedIn ? this.isNavOpen = false : '';
      }
    );
    // if (!this.isLoggedIn) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnDestroy(): void {
    this.loginSub.unsubscribe();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.hideGlobalSpinner();
    }, 2500);
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();

  }

  onLogout() {
    this._uiService.showSpinner();
    // this.showGlobalSpinner();
    this.loginState.subject.next(false);
    this._authService.logoutUser_();
    this._uiService.hideSpinner();
  }


  hideGlobalSpinner() {
    let globalSpinner = this.renderer.selectRootElement('#globalspinner');
    this.renderer.setStyle(globalSpinner, 'display', 'none');
  }

  showGlobalSpinner() {
    let globalSpinner = document.getElementById('globalspinner');
    var content = globalSpinner.innerHTML;
    globalSpinner.innerHTML = content;
  }

  openDashboard() {
    this.router.navigate(['dashboard']);
  }

  openSearch() {
    this.router.navigate(['search']);
  }

  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
    this.cdr.detectChanges();
  }

  title = 'Chevron Portal';
  showFiller = false;
  isExpanded: boolean = false;
}
