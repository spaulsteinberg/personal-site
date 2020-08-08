import { Component, OnInit } from '@angular/core';
import { RepoServiceService } from '../../shared/repo-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-repo-page',
  templateUrl: './repo-page.component.html',
  styleUrls: ['./repo-page.component.css']
})
export class RepoPageComponent implements OnInit {

  constructor(private repos: RepoServiceService, private router: Router) { }

  userRepos:any = [];
  repoLanguages:Set<string> = new Set<string>();
  errorOnRepo = '';
  ngOnInit(): void {
    this.repos.getGitHubRepos().subscribe(data => this.userRepos = data,
                                          error => this.errorOnRepo = error);
  }

  viewRepoDetails(repository){
    this.router.navigate(['links/repos/info', repository.name])
  }

}
