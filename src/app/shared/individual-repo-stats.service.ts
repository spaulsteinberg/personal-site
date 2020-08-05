import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiAuthService } from './api-auth.service';
import { Observable } from 'rxjs';

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
}
