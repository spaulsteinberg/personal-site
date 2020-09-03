import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IndividualRepoStatsService } from 'src/app/shared/services/individual-repo-stats.service';
import { LanguageParseService } from 'src/app/shared/services/language-parse.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { GoogleAnalyticsService } from 'src/app/shared/services/google-analytics.service';

@Component({
  selector: 'app-repo-details-page',
  templateUrl: './repo-details-page.component.html',
  styleUrls: ['./repo-details-page.component.css']
})
export class RepoDetailsPageComponent implements OnInit {
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;
  constructor(private route: ActivatedRoute, private _stats : IndividualRepoStatsService, private analytics: GoogleAnalyticsService) { }

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
  mostRecentCommitWeek:any;

  mySlideOptions = {
        items: 1, 
        loop:true, 
        dots: true, 
        nav: false, //also giving an empty slide
        margin:10, 
        autoplay: true, 
        autoplayTimeout:10000, 
        autoplayHoverPause:true,
        mouseDrag: false, //these options off because of empty slide issue...
        touchDrag: false
      };
  myCarouselOptions={items: 1, dots: true, nav: true};

  doughnutChartLabels = [];
  doughnutChartData = [];
  doughnutChartType = 'doughnut';
  doughnutChartOptions:any = {
    legend : {
        labels : {
          fontColor : 'white',
          fontSize: 18
        }
    },
    plugins: {
      datalabels: {
        color: 'whitesmoke',
        formatter: function(value){ //pass % in here and have the label display accordingly rounded
          return (Math.round(value * 10) / 10) + '%';
        },
        font: {
          weight: 'bold',
          size: 15
        }
      }
    }
  };

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
                      this.weeks.push(this.convertUNIXtoDate(week["w"]));
                      this.additions.push(week["a"]);
                      this.deletions.push(week["d"]);
                      this.changes.push(week["c"]);
                    }
                    for (var i = 0; i < this.additions.length; i++){
                      if (this.additions[i] > 0 || this.deletions[i] > 0 || this.changes[i] > 0){
                        this.mostRecentCommitWeek = this.weeks[i];
                      }
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
              let total = 0;
              for (const [key, value] of Object.entries(this.languageData)) {
                total += this.languageData[key];
              }
              let percentage = "";
              for (const [key, value] of Object.entries(this.languageData)) {
                percentage = ((this.languageData[key]/total)*100).toFixed(1);
                if (parseInt(percentage) == 0.0) this.doughnutChartLabels.push(key.concat(" - ", "<1%"));
                else this.doughnutChartLabels.push(key.concat(" - ", percentage.toString(), "%"));
                this.doughnutChartData.push(percentage);
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
  var time = fullDate + ' ' + month + ' ' + year;
  return time;
}

/* Line Chart creation: Mainly borrowed from documentation */

lineChartData: ChartDataSets[] = [
  { data: this.additions, label: 'Additions' },
  { data: this.deletions, label: 'Deletions' },
  { data: this.changes, label: 'Changes', yAxisID: 'y-axis-1' }
];
lineChartLabels: Label[] = this.weeks;
lineChartOptions: (ChartOptions & { annotation: any }) = {
  responsive: true,
  legend : {
    labels : {
      fontColor : '#ffffff',
      fontSize: 18
    }
  },
  scales: {
    // We use this empty structure as a placeholder for dynamic theming.
    xAxes: [
      {
        ticks: {
          fontColor: 'white',
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
        }
      },
      {
        id: 'y-axis-1',
        position: 'right',
        gridLines: {
          color: 'rgba(255,0,0,0.7)',
        },
        ticks: {
          fontColor: 'white',
          beginAtZero: true
        }
      }
    ]
  },
  annotation: {
    annotations: [
      {
        type: 'line',
        mode: 'vertical',
        scaleID: 'y-axis-0',
        value: 'March',
        borderColor: 'white',
        borderWidth: 2,
        label: {
          enabled: true,
          fontColor: 'orange'
        }
      },
    ],
  },
  plugins: {
    datalabels: {
      display: false
    }
  }
};
public lineChartColors: Color[] = [
  { // lightgreen
    backgroundColor: 'rgba(144,238,144,0.2)',
    borderColor: 'rgba(144,238,144,1)',
    pointBackgroundColor: 'rgba(144,238,144,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(144,238,144,0.8)'
  },
  { // blue
    backgroundColor: 'rgba(44,130,201,0.2)',
    borderColor: 'rgba(44,130,201,1)',
    pointBackgroundColor: 'rgba(44,130,201,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(44,130,201,1)'
  },
  { // red
    backgroundColor: 'rgba(255,0,0,0.3)',
    borderColor: 'red',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }
];
public lineChartLegend = true;
public lineChartType = 'line';
public lineChartPlugins = [pluginAnnotations];

ngAfterViewInit(){
  console.log(this.lineChartData);
}



}
