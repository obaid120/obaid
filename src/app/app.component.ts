import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth/auth.service';
import { UIService } from './core/services/ui/ui.service';
import { SearchFormComponent } from './search-form/search-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  constructor(
    private _authService: AuthService,
    private router: Router,
    private _uiService: UIService
  ) {}

  token: string;
  isLoggedIn: boolean;
  ngOnInit(): void {
    this.isLoggedIn = this._authService.isLoggedIn();
    if(this.isLoggedIn) {
      this.router.navigate(['/search']);
    }
  }

  onLogout() {
    this._uiService.showSpinner();
    this._authService.logoutUser_();
    setTimeout(() => {
    this._uiService.hideSpinner();
    }, 500);
    // this.router.navigateByUrl('login');
  }
  title = 'login';
  showFiller = false;
  isExpanded: boolean = false;
}
