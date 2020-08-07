import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeBarComponent } from './components/welcome-bar/welcome-bar.component';
import { AboutComponent } from './components/about/about.component';
import { NavigateTabComponent } from './components/navigate-tab/navigate-tab.component';
import { ProjectLinksComponent } from './components/project-links/project-links.component';
import { RepoPageComponent } from './components/repo-page/repo-page.component';
import { CommitsPageComponent } from './components/commits-page/commits-page.component';
import { EmailRegisterComponent } from './components/email-register/email-register.component';


const routes: Routes = [
  { path: '', redirectTo:'/home', pathMatch: "full"},
  { path: 'home', component: WelcomeBarComponent},
  { path: 'about', component: AboutComponent},
  { path: 'navigate', component: NavigateTabComponent},
  { path: 'links', component: ProjectLinksComponent},
  { path: 'links/repos', component: RepoPageComponent},
  { path: 'links/commits', component: CommitsPageComponent},
  { path: 'links/register', component: EmailRegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
