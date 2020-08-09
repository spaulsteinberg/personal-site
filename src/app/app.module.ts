import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table' 
import { FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { CommitsPageComponent } from './components/commits-page/commits-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavigateTabComponent } from './components/navigate-tab/navigate-tab.component';
import { ProjectLinksComponent } from './components/project-links/project-links.component';
import { ProjectLinksBodyComponent } from './components/project-links-body/project-links-body.component';
import { RepoLatestCommitsComponent } from './components/repo-latest-commits/repo-latest-commits.component';
import { RepoPageComponent } from './components/repo-page/repo-page.component';
import { WelcomeBarComponent } from './components/welcome-bar/welcome-bar.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EmailRegisterComponent } from './components/email-register/email-register.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RepoDetailsPageComponent } from './components/repo-details-page/repo-details-page.component';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    CommitsPageComponent,
    NavbarComponent,
    NavigateTabComponent,
    ProjectLinksComponent,
    ProjectLinksBodyComponent,
    RepoLatestCommitsComponent,
    RepoPageComponent,
    WelcomeBarComponent,
    EmailRegisterComponent,
    HomeComponent,
    PageNotFoundComponent,
    RepoDetailsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    ChartsModule
  ],
  providers: [FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
