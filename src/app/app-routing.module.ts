import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { MainGuard } from './core/guards/main.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgetComponent } from './forget/forget.component';
import { LoginComponent } from './login/login.component';
import { SearchFormComponent } from './search-form/search-form.component';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path : 'login' , component: LoginComponent, canActivate: [MainGuard]},
  {path : 'forgetPassword' , component: ForgetComponent, canActivate: [MainGuard]},
  {path: 'search', component: SearchFormComponent, canActivate: [AuthGuard]}
];

const config: ExtraOptions = {
  useHash: true,
  relativeLinkResolution: 'legacy'
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
