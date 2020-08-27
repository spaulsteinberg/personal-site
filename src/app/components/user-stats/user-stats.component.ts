import { Component, OnInit, ViewChild } from '@angular/core';
import { IndividualRepoStatsService } from 'src/app/shared/services/individual-repo-stats.service';
import { RepoServiceService } from 'src/app/shared/services/repo-service.service';
import { mergeMap, tap, catchError } from 'rxjs/operators';
import { IRepo } from '../../models/IRepo';
import { of } from 'rxjs';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';


@Component({
  selector: 'app-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.css']
})
export class UserStatsComponent implements OnInit {

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;
  constructor(private _stats : IndividualRepoStatsService, private _repo : RepoServiceService) { }

  mySlideOptions = {
    items: 1, 
    loop:false, 
    dots: false, 
    nav: true, //also giving an empty slide
    margin:10, 
    autoplay: true, 
    autoplayTimeout:6000, 
    autoplayHoverPause:true,
    mouseDrag: false, //these options off because of empty slide issue...
    touchDrag: false,
    hover: true
  };
  myCarouselOptions={items: 3, dots: true, nav: true};

  resourcesLoaded:boolean = false;
  error:string = '';
  languageUsageStats = new Map();
  ngOnInit(): void {
    //hydrate the map on complete
    this._repo.getGitHubRepos()
    .pipe( //use pipe when you want to have multiple operators like merging and error catching
      tap(data => this.getPageViewsForEachRepo(data)),
      tap(data => this.getCommitsYearly(data)),
      tap(data => this.getTopReferrers(data)),
      mergeMap(data => this.createLanguageMap(data)), //use mergeMap to use the data from the first subscription in the 2nd
      catchError(error => of(`Caught error: ${error}`))
    ).subscribe({
      complete: () => this.hydrateMaps()
    });
  }

  referMap = new Map();
  topReferrer;
  topReferrerCount;
  getTopReferrers(repos){
    for (let repo of repos){
      this._stats.getReferrers(repo["name"])
      .subscribe(data => {
        for (let referral of data){
          if(!this.referMap.has(referral['referrer'])){
            this.referMap.set(referral['referrer'], referral['count']);
          }
          else {
            this.referMap.set(referral['referrer'], this.referMap.get(referral['referrer']) + referral['count']);
          }
        }
        },
        error => console.log(error))
    }
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

  viewMap = new Map();
  totalViews:number = 0;
  sortedViewMap;
  getPageViewsForEachRepo(repos){
    for (var repo of repos){
      let name = repo["name"];
      this._stats.getPageViews(name).subscribe(data => {
        for (var view of data.views){
          if (!this.viewMap.has(view["timestamp"])){
            this.viewMap.set(view["timestamp"], {count: view["count"], uniques: view["uniques"]});
          }
          else {
            var obj = this.viewMap.get(view["timestamp"]);
            var newCount = view["count"] + obj.count;
            var newUniques = view["uniques"] + obj.uniques;
            this.viewMap.set(view["timestamp"], {count: newCount, uniques: newUniques});
          }
        }
        this.totalViews += data.count;
    });
    }
  }

  totalCommitsYearly = 0;
  commitMap = new Map();
  getCommitsYearly(repos){
    for (var repo of repos){
      let name = repo["name"];
      this._stats.getLastYearOfCommitActivity(repo["name"])
      .subscribe(data => {
        for (var i = 0; i < data["owner"].length; i++){
          if (data["owner"][i] > 0){
            this.commitMap.set(name, data["owner"]);
            break;
          }
        }
      });
    }
  }

  public barChartLanguagesOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{
      ticks: {
        fontColor: 'white',
      },
      scaleLabel: {
        display: true,
        labelString: 'Languages',
        fontColor: 'whitesmoke',
        fontSize: 18
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
        },
        scaleLabel: {
          display: true,
          labelString: 'Number of Bytes',
          fontColor: 'whitesmoke',
          fontSize: 18
        }
      },
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
  public barChartLanguagesLabels: Label[];
  public barChartLanguagesType: ChartType = 'bar';
  public barChartLanguagesLegend = false;
  public barChartPlugins = [pluginDataLabels];
  languageDataKeyLabels = [];
  languageDataValues = [];

  


possibleColorsHex = "0123456789ABCDEF"
colorArray = [];
//generate random hex nums
generateRandomColors(){
  var result = '';
  for (var i = 0; i < this.barChartLanguagesLabels.length; i++){
    result = '';
    for (var j = 0; j < 5; j++){
      result += this.possibleColorsHex[Math.floor(Math.random() * this.possibleColorsHex.length)];
    }
    this.colorArray.push(`#${result}`);
  }
}
  

public barChartLanguagesData: ChartDataSets[] = [];

commitData = [];
commitLabels = [];
commitsLineChart: ChartDataSets[] = [];
commitLineLabels: Label[] = [];
commitLineOptions: (ChartOptions & { annotation: any }) = {
  responsive: true,
  legend : {
    labels : {
      fontColor : 'whitesmoke',
      fontSize: 14  
    }
  },
  scales: {
    // We use this empty structure as a placeholder for dynamic theming.
    xAxes: [
      {
        ticks: {
          fontColor: 'white',
        },
        scaleLabel: {
          display: true,
          labelString: 'Weeks Ago From Present',
          fontColor: 'whitesmoke',
          fontSize: 18
        }
      }
    ],
    yAxes: [
      {
        id: 'y-axis-0',
        position: 'left',
        ticks: {
          fontColor: 'white'
        },
        scaleLabel: {
          display: true,
          labelString: 'Number of Commits',
          fontColor: 'whitesmoke',
          fontSize: 18
        }
      }
    ]
  },
  annotation: {
    annotations: [
      {
        type: 'line',
        mode: 'vertical',
        scaleID: 'x-axis-0',
        value: 'March',
        borderColor: 'white',
        borderWidth: 2,
        label: {
          enabled: true,
          fontColor: 'white',
          content: 'LineAnno'
        }
      },
    ],
  },
  title : {
    text: "Weekly Commits Over One Year",
    display: true,
    fontColor: 'whitesmoke',
    fontSize: 20
  },
  plugins: {
    datalabels: {
      display: false
    }
  }
};

public commitLineLegend = true;
public lineChartType = 'line';
viewsLineChart: ChartDataSets[] = [];
viewsLineLabels: Label[] = [];
viewsLineOptions: (ChartOptions & { annotation: any }) = {
  responsive: true,
  legend : {
    labels : {
      fontColor : 'whitesmoke',
      fontSize: 14  
    }
  },
  scales: {
    // We use this empty structure as a placeholder for dynamic theming.
    xAxes: [
      {
        ticks: {
          fontColor: 'white',
        },
        scaleLabel: {
          display: true,
          labelString: 'Date',
          fontColor: 'whitesmoke',
          fontSize: 18
        }
      }
    ],
    yAxes: [
      {
        id: 'y-axis-0',
        position: 'left',
        ticks: {
          fontColor: 'white',
          beginAtZero: true
        },
        scaleLabel: {
          display: true,
          labelString: 'Views',
          fontColor: 'whitesmoke',
          fontSize: 18
        }
      }
    ]
  },
  annotation: {
    annotations: [
      {
        type: 'line',
        mode: 'vertical',
        scaleID: 'x-axis-0',
        value: 'March',
        borderColor: 'white',
        borderWidth: 2,
        label: {
          enabled: false,
          fontColor: 'white',
          content: 'LineAnno'
        }
      },
    ],
  },
  title : {
    text: "Visitors to GitHub Page",
    display: true,
    fontColor: 'whitesmoke',
    fontSize: 20
  },
  hover: {
    mode: 'nearest',
    intersect: true
  },
  plugins: {
    datalabels: {
      display: false
    }
  }
};


//wait for async call to finish...put a loading bar here
hydrateMaps(){
  setTimeout(() => {

    for (const [key, value] of this.languageUsageStats.entries()){
      this.languageDataKeyLabels.push(key);
      this.languageDataValues.push(value);
    }
    this.assignChartLabelsForHydrate();
      

    for (const [key, value] of this.commitMap.entries()){
      this.commitsLineChart.push({data: value, label: key});
      for (var commits of value){
        this.totalCommitsYearly += commits;
      }
    }
    this.commitLineLabels = this.getWeeksAgo();
    
    let general = []; let uniques = []; 
    this.viewMap = new Map([...this.viewMap.entries()].sort());
    for (const [key, value] of this.viewMap.entries()){
      general.push(value.count);
      uniques.push(value.uniques);
    }
    this.viewsLineLabels = Array.from(this.viewMap.keys());
    this.viewsLineChart = [
      { data: general, label: "Total Visitors", hoverBackgroundColor: 'red'},
      { data: uniques, label: "Unique Visitors", hoverBackgroundColor: 'blue'}
    ]
    console.log(this.commitsLineChart);
    console.log(this.viewsLineChart);
    this.resourcesLoaded = true;
    let ref = [...this.referMap.entries()].reduce((a, e ) => e[1] > a[1] ? e : a);
    this.topReferrer = ref[0]; this.topReferrerCount = ref[1];
  }, 3000);
}

getWeeksAgo(){
  let weeksAgo = [];
  for (var i = 51; i >= 0; i--) weeksAgo[i] = 51 - i;
  return weeksAgo;
}

assignChartLabelsForHydrate(){
  this.barChartLanguagesLabels = this.languageDataKeyLabels;
    this.barChartLanguagesData = [{data: this.languageDataValues,
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
        "rgba(255, 255, 255, 0.2)",
        "rgba(255, 140, 0, 0.2)"
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
        "rgb(255, 255, 255)",
        "rgb(255, 140, 0)"
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
        "rgba(255, 255, 255, 0.7)",
        "rgba(255, 140, 0, 0.7)"
      ]
      }];
}
 

}
