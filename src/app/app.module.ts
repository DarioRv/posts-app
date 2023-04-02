import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { HomeComponent } from './components/home/home.component';
import { UserDataService } from './services/user-data.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { UserSpaceComponent } from './components/user-space/user-space.component';
import { UserAccountSettingsComponent } from './components/user-account-settings/user-account-settings.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { CommunityPostsComponent } from './components/community-posts/community-posts.component';
import { ReportFormComponent } from './components/report-form/report-form.component';
import { LoginGuardian } from './guardians/login-guardian';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    SignupFormComponent,
    HomeComponent,
    DashboardComponent,
    HeaderComponent,
    UserSpaceComponent,
    UserAccountSettingsComponent,
    PostFormComponent,
    CommunityPostsComponent,
    ReportFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [UserDataService, LoginGuardian],
  bootstrap: [AppComponent]
})
export class AppModule { }
