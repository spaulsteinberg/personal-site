import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiAuthService } from './api-auth.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GITHUB_API } from '../Constants/Constants';

@Injectable({
  providedIn: 'root'
})
export class IndividualRepoStatsService {

  constructor(private http: HttpClient, private auth: ApiAuthService) { }
  
  response;
  async getCommitActivity(repoList){
    let commitObjList = [];
    for (var repo of repoList){
      let endpoint = "https://api.github.com/repos/spaulsteinberg/" + repo + "/commits";
      this.response = await this.http.get(endpoint, this.auth.getHeaders()).toPromise();
      const response = this.response;
      commitObjList.push(response);
    }
    return commitObjList.slice();
  }

  getRepoCommitStatistics(repoName){
     console.log(GITHUB_API.REPO_ENDPOINT);

     const url = GITHUB_API.REPO_ENDPOINT + "/" + repoName + "/stats/contributors";
     return this.http.get(url, this.auth.getHeaders()).pipe(catchError(this.errorHandlerCommit));
  }
  getRepoLanguageStatistics(repoName){
    const url = GITHUB_API.REPO_ENDPOINT + "/" + repoName + "/languages";
    return this.http.get(url, this.auth.getHeaders()).pipe(catchError(this.errorHandlerLanguage));
  }

  getReadMe(repoName){
    const url = GITHUB_API.REPO_ENDPOINT + "/" + repoName + "/readme";
    return this.http.get(url, this.auth.getHeaders()).pipe(catchError(this.errorHandlerLanguage));
  }

  readMeErrorOrNotFound(error:HttpErrorResponse){
    return throwError(error.message || "ReadMe not found in repo.");
  }

  errorHandlerCommit(error: HttpErrorResponse){
    return throwError(error.message || "Some error occurred when gathering commit data.");
  }

  errorHandlerLanguage(error: HttpErrorResponse){
    return throwError(error.message || "Some error occurred gathering language data");
  }
}
