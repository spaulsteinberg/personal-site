import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IndividualRepoStatsService } from 'src/app/shared/individual-repo-stats.service';

@Component({
  selector: 'app-repo-details-page',
  templateUrl: './repo-details-page.component.html',
  styleUrls: ['./repo-details-page.component.css']
})
export class RepoDetailsPageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private _stats : IndividualRepoStatsService) { }

  repositoryName:string;
  errorMessage = '';
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.repositoryName = params.get('repo');
    });
    console.log(this.repositoryName);
    this._stats.getRepoStatistics(this.repositoryName).subscribe(data => {
      console.log(data);
    },
    error => this.errorMessage = error);
  }

}
