import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IndividualRepoStatsService {

  constructor(private http: HttpClient) { }

  response;
  async getCommitActivity(repoList){
    let commitObjList = [];
    for (var repo of repoList){
      let endpoint = "https://api.github.com/repos/spaulsteinberg/" + repo + "/commits";
      this.response = await this.http.get(endpoint).toPromise();
      console.log(this.response);
      const response = this.response;
      commitObjList.push(response);
    }
    return commitObjList.slice();
  }
}
