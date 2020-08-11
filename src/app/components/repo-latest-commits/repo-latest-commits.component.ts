import { Component, OnInit, ViewChild, NgZone, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICommit } from '../../models/ICommit';
import { IndividualRepoStatsService } from '../../shared/individual-repo-stats.service';
import { ApiAuthService } from 'src/app/shared/api-auth.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { RepoServiceService } from 'src/app/shared/repo-service.service';
import * as $ from 'jquery/dist/jquery.min.js';

@Component({
  selector: 'app-repo-latest-commits',
  templateUrl: './repo-latest-commits.component.html',
  styleUrls: ['./repo-latest-commits.component.css']
})
export class RepoLatestCommitsComponent implements OnInit {

  constructor(private http: HttpClient, private commits: IndividualRepoStatsService, private _com: RepoServiceService, private auth: ApiAuthService) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  //set interval to get it immediately, was getting messed up by async call
  ngOnInit(): void {
      let repos;
      this._com.getGitHubRepos().subscribe(data => {
        repos = data;
        for (var repo of repos){
          var indiv = repo["name"]
          let endpoint = "https://api.github.com/repos/spaulsteinberg/" + indiv + "/commits";
          this.http.get(endpoint, this.auth.getHeaders()).subscribe(
            data => {
              for(var d in data){
                
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
            this.dataSource= new MatTableDataSource<ICommit>(this.toRender);
            this.dataSource.paginator = this.paginator;
          }
          );
        }
      },
      error => console.log(error));
  }
  
  toExport = [];
  toRender:ICommit[] = [];
  repoImportedData = [];
  data;
  isError:boolean = true;
  displayedColumns: string[] = ['repo', 'date', 'message', 'url'];
  dataSource;
  /*async getRepos(){
    try {
      this.toExport = [];
      this.data = await this.http.get("https://api.github.com/users/spaulsteinberg/repos", this.auth.getHeaders()).toPromise();
      const data = this.data;
      for (var i = 0; i < data.length; i++){
        this.toExport.push(data[i]["name"]);
      }
      this.repoImportedData = (await this.commits.getCommitActivity(this.toExport)).slice(0);
      console.log(this.repoImportedData);
      this.isError = false;
      this.dataToShow();
      
    } catch {
      this.isError = true;
    }
  }
  dataToShow(){
    console.log("hjere");
    for (var i = 0; i < this.repoImportedData.length; i++){
      console.log("here");
      for (var j = 0; j < this.repoImportedData[i].length; j++){
        console.log("here");
        if (j["author"]["login"] == "spaulsteinberg"){
          console.log("in if");
          this.toRender.push({url: j["html_url"], 
                              message: j["commit"]["message"],
                              date: j["commit"]["author"]["date"],
                              repoName: this.toExport[i]
                              });
         
        }
        console.log("I:" + i + " J: " + j)
      }
      console.log(i);
      if (i==(14)){
        
      }
      
    }
  }*/
  

  ngAfterViewInit(){
    
  }

}
