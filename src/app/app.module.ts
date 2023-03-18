import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SigninFormComponent } from './components/signin-form/signin-form.component';
import { HomeComponent } from './components/home/home.component';
import { UserDataService } from './services/user-data.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { UserSpaceComponent } from './components/user-space/user-space.component';
import { UserAccountSettingsComponent } from './components/user-account-settings/user-account-settings.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { CommunityPostsComponent } from './components/community-posts/community-posts.component';
import { ReportFormComponent } from './components/report-form/report-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    SigninFormComponent,
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
  providers: [UserDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
