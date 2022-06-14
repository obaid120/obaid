import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { ForgetComponent } from './forget/forget.component';
import { LoginComponent } from './login/login.component';
import { SearchFormComponent } from './search-form/search-form.component';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path : 'login' , component : LoginComponent},
  {path : 'forgetPassword' , component : ForgetComponent},
  {path: 'search', component: SearchFormComponent}
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
