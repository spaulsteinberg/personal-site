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

  getRepoStatistics(repoName){
     console.log(GITHUB_API.REPO_ENDPOINT);

     const url = GITHUB_API.REPO_ENDPOINT + "/" + repoName + "/stats/contributors";
     return this.http.get(url, this.auth.getHeaders()).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse){
    return throwError(error.message || "Some error occurred when gathering repository data.");
  }
}
