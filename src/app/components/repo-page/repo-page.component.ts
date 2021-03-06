import { Component, OnInit } from '@angular/core';
import { RepoServiceService } from '../../shared/services/repo-service.service';
import { Router } from '@angular/router';
import * as $ from 'jquery/dist/jquery.min.js';
import { GoogleAnalyticsService } from 'src/app/shared/services/google-analytics.service';

@Component({
  selector: 'app-repo-page',
  templateUrl: './repo-page.component.html',
  styleUrls: ['./repo-page.component.css']
})
export class RepoPageComponent implements OnInit {

  constructor(private repos: RepoServiceService, private router: Router, private analytics: GoogleAnalyticsService) { }

  userRepos:any = [];
  repoLanguages:Set<string> = new Set<string>();
  errorOnRepo = '';
  loadingBar:boolean = true;
  ngOnInit(): void {
    this.loadingBar = true;
    this.repos.getGitHubRepos()
        .subscribe(data => {
          this.loadingBar = false;
          this.userRepos = data
        }, error => {
          this.loadingBar = false;
          this.errorOnRepo = error
        });
  }

  logAnalytics = (name) => this.analytics.eventEmitter(`Repo ${name}`, "select_content", "go_to", "click", 10);
  viewRepoDetails(repository){
    this.router.navigate(['links/repos/info', repository.name])
  }

  mySlideOptions = {
    items: 4,
    margin: 20,
    navigate: true,
    dots: true
  };

  ngAfterViewInit(){
  }

}
