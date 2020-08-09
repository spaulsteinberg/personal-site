import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IndividualRepoStatsService } from 'src/app/shared/individual-repo-stats.service';
import { LanguageParseService } from 'src/app/shared/language-parse.service';

@Component({
  selector: 'app-repo-details-page',
  templateUrl: './repo-details-page.component.html',
  styleUrls: ['./repo-details-page.component.css']
})
export class RepoDetailsPageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private _stats : IndividualRepoStatsService, private _languages: LanguageParseService) { }

  repositoryName:string;
  errorMessageCommit = '';
  errorMessageLanguage = '';
  errorReadMe = '';
  languageData;
  languageListMaster = [];
  commitData;
  temp;
  readMe = null;

  
  doughnutChartLabels = [];
  doughnutChartData = [];
  doughnutChartType = 'doughnut';

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.repositoryName = params.get('repo');
    });
   // this.getLanguages();
    console.log(this.languageListMaster);
    this._stats.getRepoCommitStatistics(this.repositoryName)
            .subscribe(data => {
                console.log(data);
            },
            error => this.errorMessageCommit = error
            );

    this._stats.getRepoLanguageStatistics(this.repositoryName)
            .subscribe(data => {
              this.languageData = data;
              for (const [key, value] of Object.entries(this.languageData)) {
                this.doughnutChartLabels.push(key);
                this.doughnutChartData.push(value);
                console.log(`${key}: ${value}`);
              }
              
            },
            error => this.errorMessageLanguage = error
            );
   /* this._stats.getReadMe(this.repositoryName)
            .subscribe(data => {
              this.temp = data;
              console.log(this.b64DecodeUnicode(this.temp));
            },
            error => this.errorReadMe = error);
  }*/
}
public barChartOptions = {
  scaleShowVerticalLines: false,
  responsive: true
};
public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
public barChartType = 'bar';
public barChartLegend = true;
public barChartData = [
  {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
  {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
];

}
