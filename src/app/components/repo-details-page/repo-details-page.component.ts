import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IndividualRepoStatsService } from 'src/app/shared/individual-repo-stats.service';
import { LanguageParseService } from 'src/app/shared/language-parse.service';
import { NumberValueAccessor } from '@angular/forms';

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
  repoCommitTotal:number = 0;
  weeks = []; additions = []; deletions = []; changes = [];

  
  doughnutChartLabels = [];
  doughnutChartData = [];
  doughnutChartType = 'doughnut';

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.repositoryName = params.get('repo');
    });
   // this.getLanguages();
    this._stats.getRepoCommitStatistics(this.repositoryName)
            .subscribe(data => {
              console.log("IN REPO");
              for (const [key, value] of Object.entries(data)) {
                for (const [k, v] of Object.entries(value)) {
                  if(k == "total") this.repoCommitTotal = value[k];
                  if(k == "weeks"){
                    for (var week of value[k]){
                      console.log(week["w"]);
                      this.weeks.push(this.convertUNIXtoDate(week["w"]));
                      this.additions.push(week["a"]);
                      this.deletions.push(week["d"]);
                      this.changes.push(week["c"]);
                      console.log(this.weeks);
                    }
                  }
                }
              }
            },
            error => this.errorMessageCommit = error
            );

    this._stats.getRepoLanguageStatistics(this.repositoryName)
            .subscribe(data => {
              this.languageData = data;
              for (const [key, value] of Object.entries(this.languageData)) {
                this.doughnutChartLabels.push(key);
                this.doughnutChartData.push(value);
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
convertUNIXtoDate(UNIX_timestamp){
  var date = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = date.getFullYear();
  var month = months[date.getMonth()];
  var fullDate = date.getDate();
  var hour = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();
  var time = fullDate + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  console.log(time);
  return time;
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
