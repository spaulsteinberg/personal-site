import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICommit } from '../../models/ICommit';
import { IndividualRepoStatsService } from '../../shared/individual-repo-stats.service';


@Component({
  selector: 'app-repo-latest-commits',
  templateUrl: './repo-latest-commits.component.html',
  styleUrls: ['./repo-latest-commits.component.css']
})
export class RepoLatestCommitsComponent implements OnInit {

  constructor(private http: HttpClient, private commits: IndividualRepoStatsService) { }

  ngOnInit(): void {
  }
  toExport = [];
  toRender:ICommit[] = [];
  repoImportedData = [];
  data;
  isError:boolean = false;
  async getRepos(){
    try {
      this.toExport = [];
      this.data = await this.http.get("https://api.github.com/users/spaulsteinberg/repos").toPromise();
      const data = this.data;
      for (var i = 0; i < data.length; i++){
        this.toExport.push(data[i]["name"]);
      }
      this.repoImportedData = (await this.commits.getCommitActivity(this.toExport)).slice(0);
      this.isError = false;
      this.dataToShow();
    } catch {
      this.isError = true;
    }
  }
  dataToShow(){
    let i = 0;
    for (var commits of this.repoImportedData){
      for (var data of commits){
        if (data["author"]["login"] == "spaulsteinberg"){
          this.toRender.push({url: data["html_url"], 
                              message: data["commit"]["message"],
                              date: data["commit"]["author"]["date"],
                              repoName: this.toExport[i]
                              });
        }
      }
      i++;
    }
  }

}
