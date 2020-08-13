import { Component, OnInit } from '@angular/core';
import { IndividualRepoStatsService } from 'src/app/shared/individual-repo-stats.service';
import { RepoServiceService } from 'src/app/shared/repo-service.service';
import { mergeMap, catchError } from 'rxjs/operators';
import { IRepo } from '../../models/IRepo';
import { of } from 'rxjs';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';


@Component({
  selector: 'app-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.css']
})
export class UserStatsComponent implements OnInit {

  constructor(private _stats : IndividualRepoStatsService, private _repo : RepoServiceService) { }

  resourcesLoaded:boolean = false;
  error:string = '';
  languageUsageStats = new Map();
  ngOnInit(): void {
    this._repo.getGitHubRepos()
    .pipe(
      mergeMap(data => this.createLanguageMap(data)),
      catchError(error => of(`Caught error: ${error}`))
    ).subscribe();
    this.hydrateMap();
  }
  
  async createLanguageMap(repos:IRepo[]){
    for (var repo of repos){
      this._stats.getRepoLanguageStatistics(repo["name"])
      .subscribe(data => {
          for (const [key, value] of Object.entries(data)) {
            // in light of a better way just filter stupid vals this way.
            if (value > 190000){
              continue;
            }
            if (!this.languageUsageStats.has(key)){
              this.languageUsageStats.set(key, value);
            }
            else {
              let pre_bytes = this.languageUsageStats.get(key);
              this.languageUsageStats.set(key, pre_bytes + value);
            }
          }
          //sort by value
          this.languageUsageStats = new Map([...this.languageUsageStats.entries()].sort((a, b) => b[1] - a[1]));
      });
    }
  }

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{
      ticks: {
        fontColor: 'white',
      }
    }], yAxes: [
      {
        id: 'y-axis-0',
        position: 'left',
        gridLines: {
            color: 'rgba(255,0,0,0.7)',
        },
        ticks: {
          fontColor: 'white',
        }
      }
    ]},
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        color: 'white'
      }
    },
    title : {
      text: "Language Frequency",
      display: true,
      fontColor: 'white',
      fontSize: 20
    }
  };
  public barChartLabels: Label[];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [pluginDataLabels];
  languageDataKeyLabels = [];
  languageDataValues = [];

  


possibleColorsHex = "0123456789ABCDEF"
colorArray = [];
//generate random hex nums
generateRandomColors(){
  var result = '';
  for (var i = 0; i < this.barChartLabels.length; i++){
    result = '';
    for (var j = 0; j < 5; j++){
      result += this.possibleColorsHex[Math.floor(Math.random() * this.possibleColorsHex.length)];
    }
    this.colorArray.push(`#${result}`);
  }
}
  

public barChartData: ChartDataSets[] = [];

//wait for async call to finish...put a loading bar here
hydrateMap(){
  setTimeout(() => {

    for (const [key, value] of this.languageUsageStats.entries()){
      this.languageDataKeyLabels.push(key);
      this.languageDataValues.push(value);
    }
    console.log(this.languageDataKeyLabels);
    this.barChartLabels = this.languageDataKeyLabels;
    this.barChartData = [{data: this.languageDataValues,
      backgroundColor:[  
        "rgba(255, 99, 132, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 205, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(201, 203, 207, 0.2)",
        "rgba(0, 0, 255, 0.2)",
        "rgba(50, 205, 50, 0.2)",
        "rgba(0, 255, 255, 0.2)",
        "rgba(128, 0 , 255, 0.2)",
        "rgba(255,192,203, 0.2)",
        "rgba(255, 141, 56, 0.2)",
        "rgba(255, 69, 0, 0.2)",
        "rgba(255, 255, 255, 0.2)"
     ],
     borderColor:[  
        "rgb(255, 99, 132)",
        "rgb(255, 159, 64)",
        "rgb(255, 205, 86)",
        "rgb(75, 192, 192)",
        "rgb(54, 162, 235)",
        "rgb(153, 102, 255)",
        "rgb(201, 203, 207)",
        "rgb(0, 0, 255)",
        "rgb(50, 205, 50)",
        "rgb(0, 255, 255)",
        "rgb(128, 0 , 255)",
        "rgb(255, 192 ,203)",
        "rgb(255, 141, 56)",
        "rgb(255, 69, 0)",
        "rgb(255, 255, 255)"
      ],
      borderWidth: 1,
      hoverBackgroundColor: [
        "rgba(255, 99, 132, 0.7)",
        "rgba(255, 159, 64, 0.7)",
        "rgba(255, 205, 86, 0.7)",
        "rgba(75, 192, 192, 0.7)",
        "rgba(54, 162, 235, 0.7)",
        "rgba(153, 102, 255, 0.7)",
        "rgba(201, 203, 207, 0.7)",
        "rgba(0, 0, 255, 0.7)",
        "rgba(50, 205, 50, 0.7)",
        "rgba(0, 255, 255, 0.7)",
        "rgba(128, 0 , 255, 0.7)",
        "rgba(255,192,203, 0.7)",
        "rgba(255, 141, 56, 0.7)",
        "rgba(255, 69, 0, 0.7)",
        "rgba(255, 255, 255, 0.7)"
      ]
      }];
    this.resourcesLoaded = true;
  }, 2000);
  console.log(this.barChartData);
}

}
