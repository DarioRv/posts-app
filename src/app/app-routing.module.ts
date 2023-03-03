import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginFormComponent } from './components/login-form/login-form.component';
import { SigninFormComponent } from './components/signin-form/signin-form.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {path: 'login', title: 'Log In',component: LoginFormComponent},
  {path: 'signin', title: 'Sign In',component: SigninFormComponent},
  {path: 'dashboard', title: 'Dashboard',component: DashboardComponent},
  {path: '', title: 'Home', redirectTo: '', pathMatch: 'full', component: HomeComponent},
	{path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule, HttpClientModule]
})
export class AppRoutingModule { }
