import { Component, OnInit, ViewChild, NgZone, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICommit } from '../../models/ICommit';
import { IndividualRepoStatsService } from '../../shared/services/individual-repo-stats.service';
import { ApiAuthService } from 'src/app/shared/services/api-auth.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { interval, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { RepoServiceService } from 'src/app/shared/services/repo-service.service';
import * as $ from 'jquery/dist/jquery.min.js';
import { MatSort } from '@angular/material/sort';
import { GITHUB_API } from '../../Constants/Constants';

@Component({
  selector: 'app-repo-latest-commits',
  templateUrl: './repo-latest-commits.component.html',
  styleUrls: ['./repo-latest-commits.component.css']
})
export class RepoLatestCommitsComponent implements OnInit {

  constructor(private http: HttpClient, private commits: IndividualRepoStatsService, private _com: RepoServiceService, private auth: ApiAuthService) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort:MatSort;
  //set interval to get it immediately, was getting messed up by async call
  loadingBar = true;
  toExport = [];
  toRender:ICommit[] = [];
  repoImportedData = [];
  data;
  isError:boolean = false;
  displayedColumns: string[] = ['repoName', 'date', 'message', 'url'];
  dataSource;
  ngOnInit(): void {
    //pipe the observable repos into the commits call, subscribe to an error if caught, on complete close load bar
    this._com.getGitHubRepos().
        pipe(
          tap(data => this.getAllCommits(data)),
          catchError(error => of(`Caught error ${error}`))
          ).subscribe({
            error: () => {
              this.isError = true;
              this.loadingBar = false;
            },
            complete: () => this.loadingBar = false
          });
  }

  getAllCommits(data){
    let repos = data;
    for (let repo of repos){
      let indiv = repo["name"]
      const endpoint = `${GITHUB_API.REPO_ENDPOINT}/${indiv}/commits`;
      this.http.get(endpoint, this.auth.getHeaders()).subscribe(
        data => {
          for(let d in data){
            if (data[d] && data[d]["author"]["login"] == "spaulsteinberg"){
              //extract repo name here -- not explicit in return call
              let url_extract = (data[d]["commit"]["tree"]["url"].match(/spaulsteinberg(.*?)git/g))[0];
              let rName = url_extract.substring(url_extract.indexOf('/') + 1, url_extract.lastIndexOf('/'));
              this.toRender.push({url: data[d]["html_url"], 
                              message: data[d]["commit"]["message"],
                              date: data[d]["commit"]["author"]["date"],
                              repoName: rName
                              });
            }
        }
        this.dataSource = new MatTableDataSource<ICommit>(this.toRender);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => this.isError = true
      );
    }
  }
}
