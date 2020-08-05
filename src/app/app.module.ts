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
    WelcomeBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
