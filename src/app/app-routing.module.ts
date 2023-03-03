import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginFormComponent } from './components/login-form/login-form.component';
import { SigninFormComponent } from './components/signin-form/signin-form.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {path: 'login', title: 'Log In',component: LoginFormComponent},
  {path: 'signin', title: 'Sign In',component: SigninFormComponent},
  {path: '', title: 'Home',redirectTo: '', pathMatch: 'full'},
	{path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule, HttpClientModule]
})
export class AppRoutingModule { }
