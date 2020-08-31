import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table' 
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { OwlModule } from 'ngx-owl-carousel';
import { ContactComponent } from './components/contact/contact.component';
import { UserStatsComponent } from './components/user-stats/user-stats.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { PhoneNumberDirective } from './shared/directives/phone-number.directive';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { SiteAnalyticsComponent } from './components/site-analytics/site-analytics.component';
import { SiteNetworkSpeedComponent } from './components/site-network-speed/site-network-speed.component';
import { MasterSiteAnalyticsComponent } from './components/master-site-analytics/master-site-analytics.component';



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
    RepoDetailsPageComponent,
    ContactComponent,
    UserStatsComponent,
    PhoneNumberDirective,
    SiteAnalyticsComponent,
    SiteNetworkSpeedComponent,
    MasterSiteAnalyticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    ChartsModule,
    OwlModule,
    MatProgressSpinnerModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule
  ],
  providers: [FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
