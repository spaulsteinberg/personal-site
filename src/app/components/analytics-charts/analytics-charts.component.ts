import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from 'src/app/shared/services/google-analytics.service';
import { AnalyticsService } from 'src/app/shared/services/analytics.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { AnalyticData } from 'src/app/models/IAnalyticData';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-analytics-charts',
  templateUrl: './analytics-charts.component.html',
  styleUrls: ['./analytics-charts.component.css']
})
export class AnalyticsChartsComponent implements OnInit {

  constructor(private analytics: AnalyticsService, private router: Router, private route: ActivatedRoute) { }

  isError:boolean;
  errMessage;
  analyticData:AnalyticData = new AnalyticData();
  isLoading:boolean = true;
  ngOnInit(): void {
    this.analytics.getPageViewsOnTime()
        .pipe(map(res => {
          console.log(res);
          if (res.status === "OK"){
            res.data.forEach(element => {
              element[0] = `${element[0].substring(0,4)}-${element[0].substring(4,6)}-${element[0].substring(6,8)}`;
              this.analyticData.dates.push(element[0]);
              this.analyticData.pageviews.push(parseInt(element[1], 10));
              this.analyticData.uniquePageviews.push(parseInt(element[2], 10));
              this.analyticData.events.push(parseInt(element[3], 10));
              this.analyticData.uniqueEvents.push(parseInt(element[4], 10));
              this.analyticData.totalHits.push(parseInt(element[5], 10));
              this.analyticData.totalSessionDuration.push(parseFloat(element[6]));
              this.analyticData.avgSessionDuration.push(parseFloat(element[7]));
              this.analyticData.avgEventsPerSession.push(parseInt(element[8]));
            });
          }
        }))
        .subscribe(
        () => {},
        error => {
          this.isError = true;
          this.errMessage = error;
        },
        () => {
          console.log("Im done");
          this.isLoading = false;
          this.labels = this.analyticData.dates;
          this.eventDatasets = [
            { data: this.analyticData.events, label: "Events", backgroundColor: 'transparent', borderColor: 'orange', hoverBackgroundColor: 'orange'},
            { data: this.analyticData.uniqueEvents, label: "Unique Events", backgroundColor: 'transparent', borderColor: 'yellow', hoverBackgroundColor: 'yellow'}
          ];
          this.pageviewDatasets = [
            { data: this.analyticData.pageviews, label: "Pageviews", backgroundColor: 'transparent', borderColor: 'purple', hoverBackgroundColor: 'orange'},
            { data: this.analyticData.uniquePageviews, label: "Unique Pageviews", backgroundColor: 'transparent', borderColor: 'red', hoverBackgroundColor: 'yellow'}
          ];
          this.sessionDatasets = [
            { data: this.analyticData.totalSessionDuration, label: "Total Session Duration", backgroundColor: 'transparent', borderColor: 'blue', hoverBackgroundColor: 'orange'},
            { data: this.analyticData.avgSessionDuration, label: "Avg Session Duration", backgroundColor: 'transparent', borderColor: 'magenta', hoverBackgroundColor: 'yellow'}
          ];
          this.hitsVsEventsPerSessionDatasets = [
            { data: this.analyticData.totalHits, label: "Total Hits", backgroundColor: 'transparent', borderColor: 'limegreen', hoverBackgroundColor: 'orange'},
            { data: this.analyticData.avgEventsPerSession, label: "Events/Session", backgroundColor: 'transparent', borderColor: 'whitesmoke', hoverBackgroundColor: 'yellow'}
          ];
        });
  }

  navToSiteSpeed(){
    this.router.navigate(['../speedandnetwork'], {relativeTo: this.route});
  }

legend = true;
lineChartType = 'line';
eventDatasets: ChartDataSets[] = [];
pageviewDatasets: ChartDataSets[] = [];
sessionDatasets: ChartDataSets[] = [];
hitsVsEventsPerSessionDatasets: ChartDataSets[] = [];
labels:Label[] = [];
eventOptions: (ChartOptions & { annotation: any }) = {
  responsive: true,
  legend : {
    labels : {
      fontColor : 'turquoise',
      fontSize: 14  
    }
  },
  elements: {
    line: {
      tension: 0
    }
  },
  scales: {
    // We use this empty structure as a placeholder for dynamic theming.
    xAxes: [
      {
        ticks: {
          fontColor: 'turquoise',
        },
        scaleLabel: {
          display: true,
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
          fontColor: 'turquoise',
          beginAtZero: true
        },
        scaleLabel: {
          display: true,
          fontColor: 'whitesmoke',
          fontSize: 18
        },
        gridLines: {
          color: 'turquoise'
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
        borderColor: 'turquoise',
        borderWidth: 2,
        label: {
          enabled: false,
          fontColor: 'turquoise',
          content: 'LineAnno'
        }
      },
    ],
  },
  title : {
    text: "Event Data",
    display: true,
    fontColor: 'turquoise',
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
pageviewOptions: (ChartOptions & { annotation: any }) = {
  responsive: true,
  legend : {
    labels : {
      fontColor : 'turquoise',
      fontSize: 14  
    }
  },
  elements: {
    line: {
      tension: 0
    }
  },
  scales: {
    // We use this empty structure as a placeholder for dynamic theming.
    xAxes: [
      {
        ticks: {
          fontColor: 'turquoise',
        },
        scaleLabel: {
          display: true,
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
          fontColor: 'turquoise',
          beginAtZero: true
        },
        scaleLabel: {
          display: true,
          fontColor: 'whitesmoke',
          fontSize: 18
        },
        gridLines: {
          color: 'turquoise'
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
        borderColor: 'turquoise',
        borderWidth: 2,
        label: {
          enabled: false,
          fontColor: 'turquoise',
          content: 'LineAnno'
        }
      },
    ],
  },
  title : {
    text: "Pageview Data",
    display: true,
    fontColor: 'turquoise',
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
sessionOptions: (ChartOptions & { annotation: any }) = {
  responsive: true,
  legend : {
    labels : {
      fontColor : 'turquoise',
      fontSize: 14  
    }
  },
  elements: {
    line: {
      tension: 0
    }
  },
  scales: {
    // We use this empty structure as a placeholder for dynamic theming.
    xAxes: [
      {
        ticks: {
          fontColor: 'turquoise',
        },
        scaleLabel: {
          display: true,
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
          fontColor: 'turquoise',
          beginAtZero: true
        },
        scaleLabel: {
          display: true,
          fontColor: 'whitesmoke',
          fontSize: 18
        },
        gridLines: {
          color: 'turquoise'
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
        borderColor: 'turquoise',
        borderWidth: 2,
        label: {
          enabled: false,
          fontColor: 'turquoise',
          content: 'LineAnno'
        }
      },
    ],
  },
  title : {
    text: "Session Data",
    display: true,
    fontColor: 'turquoise',
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
hitsVsEventsPerSessionOptions: (ChartOptions & { annotation: any }) = {
  responsive: true,
  legend : {
    labels : {
      fontColor : 'turquoise',
      fontSize: 14  
    }
  },
  elements: {
    line: {
      tension: 0
    }
  },
  scales: {
    // We use this empty structure as a placeholder for dynamic theming.
    xAxes: [
      {
        ticks: {
          fontColor: 'turquoise',
        },
        scaleLabel: {
          display: true,
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
          fontColor: 'turquoise',
          beginAtZero: true
        },
        scaleLabel: {
          display: true,
          fontColor: 'whitesmoke',
          fontSize: 18
        },
        gridLines: {
          color: 'turquoise'
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
        borderColor: 'turquoise',
        borderWidth: 2,
        label: {
          enabled: false,
          fontColor: 'turquoise',
          content: 'LineAnno'
        }
      },
    ],
  },
  title : {
    text: "Hits vs. Events/Session",
    display: true,
    fontColor: 'turquoise',
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


}
