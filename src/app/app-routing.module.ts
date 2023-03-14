import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginFormComponent } from './components/login-form/login-form.component';
import { SigninFormComponent } from './components/signin-form/signin-form.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserSpaceComponent } from './components/user-space/user-space.component';
import { UserAccountSettingsComponent } from './components/user-account-settings/user-account-settings.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { CommunityPostsComponent } from './components/community-posts/community-posts.component';

const routes: Routes = [
  {path: 'login', title: 'Log In', component: LoginFormComponent},
  {path: 'signin', title: 'Sign In', component: SigninFormComponent},
  {path: 'dashboard', title: 'Dashboard', component: DashboardComponent,children:
  [
    {path: 'my-space', title: 'Dashboard | My Space',component: UserSpaceComponent,children: [
      {path: 'create-post', title: 'Dashboard | Create a post', component: PostFormComponent}
    ]},
    {path: 'community', title: 'Dashboard | Community', component: CommunityPostsComponent},
    {path: 'account-settings', title: 'Dashboard | My Account', component: UserAccountSettingsComponent}
  ]},
  {path: '', title: 'Home', redirectTo: '', pathMatch: 'full', component: HomeComponent},
	{path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule, HttpClientModule]
})
export class AppRoutingModule { }
