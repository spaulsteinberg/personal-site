import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeBarComponent } from './components/welcome-bar/welcome-bar.component';
import { AboutComponent } from './components/about/about.component';
import { NavigateTabComponent } from './components/navigate-tab/navigate-tab.component';
import { ProjectLinksComponent } from './components/project-links/project-links.component';
import { RepoPageComponent } from './components/repo-page/repo-page.component';
import { CommitsPageComponent } from './components/commits-page/commits-page.component';
import { EmailRegisterComponent } from './components/email-register/email-register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RepoDetailsPageComponent } from './components/repo-details-page/repo-details-page.component';
import { ContactComponent } from './components/contact/contact.component';
import { UserStatsComponent } from './components/user-stats/user-stats.component';
import { SiteAnalyticsComponent } from './components/site-analytics/site-analytics.component';
import { SiteNetworkSpeedComponent } from './components/site-network-speed/site-network-speed.component';
import { MasterSiteAnalyticsComponent } from './components/master-site-analytics/master-site-analytics.component';


const routes: Routes = [
  { path: '', redirectTo:'/home', pathMatch: "full"},
  { path: 'home', component: WelcomeBarComponent},
  { path: 'about', component: AboutComponent},
  { path: 'navigate', component: NavigateTabComponent},
  { path: 'links', component: ProjectLinksComponent},
  { path: 'contact', component:ContactComponent},
  { 
    path: 'analytics', 
    component: MasterSiteAnalyticsComponent,
  children: [
    { path: '', redirectTo: 'site', pathMatch: 'full'},
    { path: 'site', component: SiteAnalyticsComponent },
    { path: 'speedandnetwork', component: SiteNetworkSpeedComponent}
  ]
},
  { path: 'analytics/speedandnetwork', component: SiteNetworkSpeedComponent},
  { path: 'links/repos', component: RepoPageComponent},
  { path: 'links/repos/info/:repo', component: RepoDetailsPageComponent},
  { path: 'links/commits', component: CommitsPageComponent},
  { path: 'links/userinfo', component: UserStatsComponent},
  { path: '**', component:PageNotFoundComponent} //wildcard route go to page not found
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
