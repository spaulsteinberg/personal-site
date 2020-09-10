import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from 'src/app/shared/services/google-analytics.service';
import { AnalyticsService } from 'src/app/shared/services/analytics.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map, concatMap, catchError } from 'rxjs/operators';
import { AnalyticData } from 'src/app/models/IAnalyticData';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { timer, of } from 'rxjs';
import * as $ from 'jquery/dist/jquery.min.js';

@Component({
  selector: 'app-analytics-charts',
  templateUrl: './analytics-charts.component.html',
  styleUrls: ['./analytics-charts.component.css']
})
export class AnalyticsChartsComponent implements OnInit {

  constructor(private analytics: AnalyticsService, private router: Router, private route: ActivatedRoute, public _logAnalytics: GoogleAnalyticsService) { }

  isError:boolean;
  errMessage;
  analyticData7days:AnalyticData = new AnalyticData();
  analyticData14days:AnalyticData = new AnalyticData();
  analyticData30days:AnalyticData = new AnalyticData();
  isLoading:boolean = true;
  chartChoice:number = 1;
  ngOnInit(): void {
    // 7 days of data -- poll every 15 seconds
    timer(0, 15000).pipe(concatMap(_ => this.analytics.getPageViewsOnTimeOneWeek()),
      map(res => {
      if (res.status === "OK"){
        this.analyticData7days = new AnalyticData();
        res.data.forEach(element => {
          element[0] = `${element[0].substring(0,4)}-${element[0].substring(4,6)}-${element[0].substring(6,8)}`;
          this.analyticData7days.dates.push(element[0]);
          this.analyticData7days.pageviews.push(parseInt(element[1], 10));
          this.analyticData7days.uniquePageviews.push(parseInt(element[2], 10));
          this.analyticData7days.events.push(parseInt(element[3], 10));
          this.analyticData7days.uniqueEvents.push(parseInt(element[4], 10));
          this.analyticData7days.totalHits.push(parseInt(element[5], 10));
          this.analyticData7days.totalSessionDuration.push(parseFloat(element[6]));
          this.analyticData7days.avgSessionDuration.push(parseFloat(element[7]));
          this.analyticData7days.avgEventsPerSession.push(parseInt(element[8]));
        });
        this.isLoading = false;
        this.setData7days();
      }
    }),
    catchError( error => this.errMessage = of(`${error}`)
    ))
    .subscribe(
    () => {},
    error => {
      this.isError = true;
      this.errMessage = error;
    });

    //poll the endpoint every 15 seconds
    timer(0, 15000).pipe(concatMap(_ => this.analytics.getPageViewsOnTime()),
      map(res => {
      if (res.status === "OK"){
        this.analyticData30days = new AnalyticData();
        res.data.forEach(element => {
          element[0] = `${element[0].substring(0,4)}-${element[0].substring(4,6)}-${element[0].substring(6,8)}`;
          this.analyticData30days.dates.push(element[0]);
          this.analyticData30days.pageviews.push(parseInt(element[1], 10));
          this.analyticData30days.uniquePageviews.push(parseInt(element[2], 10));
          this.analyticData30days.events.push(parseInt(element[3], 10));
          this.analyticData30days.uniqueEvents.push(parseInt(element[4], 10));
          this.analyticData30days.totalHits.push(parseInt(element[5], 10));
          this.analyticData30days.totalSessionDuration.push(parseFloat(element[6]));
          this.analyticData30days.avgSessionDuration.push(parseFloat(element[7]));
          this.analyticData30days.avgEventsPerSession.push(parseInt(element[8]));
        });
        this.setData30days();
      }
    }),
    catchError( error => this.errMessage = of(`${error}`)
    ))
    .subscribe(
    () => {},
    error => {
      this.isError = true;
      this.errMessage = error;
    },
    () => {});

    // 14 days of data
    timer(0, 15000).pipe(concatMap(_ => this.analytics.getPageViewsOnTimeTwoWeeks()),
    map(res => {
    if (res.status === "OK"){
      this.analyticData14days = new AnalyticData();
      res.data.forEach(element => {
        element[0] = `${element[0].substring(0,4)}-${element[0].substring(4,6)}-${element[0].substring(6,8)}`;
        this.analyticData14days.dates.push(element[0]);
        this.analyticData14days.pageviews.push(parseInt(element[1], 10));
        this.analyticData14days.uniquePageviews.push(parseInt(element[2], 10));
        this.analyticData14days.events.push(parseInt(element[3], 10));
        this.analyticData14days.uniqueEvents.push(parseInt(element[4], 10));
        this.analyticData14days.totalHits.push(parseInt(element[5], 10));
        this.analyticData14days.totalSessionDuration.push(parseFloat(element[6]));
        this.analyticData14days.avgSessionDuration.push(parseFloat(element[7]));
        this.analyticData14days.avgEventsPerSession.push(parseInt(element[8]));
      });
      this.setData14days();
    }
  }),
  catchError( error => this.errMessage = of(`${error}`)
  ))
  .subscribe(
  () => {},
  error => {
    this.isError = true;
    this.errMessage = error;
  });
  }

  navToSiteSpeed(){
    this.router.navigate(['../speedandnetwork'], {relativeTo: this.route});
  }
  navToMostPopular(){
    console.log(this.router.url);
    this.router.navigate(['../popular'], {relativeTo: this.route});
  }

  //switch on span click to toggle to X days of data
  switchTo7Days(){
    this.chartChoice = 1;
  }
  switchTo14Days(){
    this.chartChoice = 2;
  }
  switchTo30Days(){
    this.chartChoice = 3;
  }

  //populate the datasets for X number of days
  setData30days(){
    this.labels30days = this.analyticData30days.dates;
    this.eventDatasets30days = [
      { data: this.analyticData30days.events, label: "Events", backgroundColor: 'transparent', borderColor: 'orange', hoverBackgroundColor: 'orange'},
      { data: this.analyticData30days.uniqueEvents, label: "Unique Events", backgroundColor: 'transparent', borderColor: 'yellow', hoverBackgroundColor: 'yellow'}
    ];
    this.pageviewDatasets30days = [
      { data: this.analyticData30days.pageviews, label: "Pageviews", backgroundColor: 'transparent', borderColor: 'purple', hoverBackgroundColor: 'orange'},
      { data: this.analyticData30days.uniquePageviews, label: "Unique Pageviews", backgroundColor: 'transparent', borderColor: 'red', hoverBackgroundColor: 'yellow'}
    ];
    this.sessionDatasets30days = [
      { data: this.analyticData30days.totalSessionDuration, label: "Total Session Duration", backgroundColor: 'transparent', borderColor: 'blue', hoverBackgroundColor: 'orange'},
      { data: this.analyticData30days.avgSessionDuration, label: "Avg Session Duration", backgroundColor: 'transparent', borderColor: 'magenta', hoverBackgroundColor: 'yellow'}
    ];
    this.hitsVsEventsPerSessionDatasets30days = [
      { data: this.analyticData30days.totalHits, label: "Total Hits", backgroundColor: 'transparent', borderColor: 'limegreen', hoverBackgroundColor: 'orange'},
      { data: this.analyticData30days.avgEventsPerSession, label: "Events/Session", backgroundColor: 'transparent', borderColor: 'whitesmoke', hoverBackgroundColor: 'yellow'}
    ];
  }
  setData14days(){
    this.labels14days = this.analyticData14days.dates;
    this.eventDatasets14days = [
      { data: this.analyticData14days.events, label: "Events", backgroundColor: 'transparent', borderColor: 'orange', hoverBackgroundColor: 'orange'},
      { data: this.analyticData14days.uniqueEvents, label: "Unique Events", backgroundColor: 'transparent', borderColor: 'yellow', hoverBackgroundColor: 'yellow'}
    ];
    this.pageviewDatasets14days = [
      { data: this.analyticData14days.pageviews, label: "Pageviews", backgroundColor: 'transparent', borderColor: 'purple', hoverBackgroundColor: 'orange'},
      { data: this.analyticData14days.uniquePageviews, label: "Unique Pageviews", backgroundColor: 'transparent', borderColor: 'red', hoverBackgroundColor: 'yellow'}
    ];
    this.sessionDatasets14days = [
      { data: this.analyticData14days.totalSessionDuration, label: "Total Session Duration", backgroundColor: 'transparent', borderColor: 'blue', hoverBackgroundColor: 'orange'},
      { data: this.analyticData14days.avgSessionDuration, label: "Avg Session Duration", backgroundColor: 'transparent', borderColor: 'magenta', hoverBackgroundColor: 'yellow'}
    ];
    this.hitsVsEventsPerSessionDatasets14days = [
      { data: this.analyticData14days.totalHits, label: "Total Hits", backgroundColor: 'transparent', borderColor: 'limegreen', hoverBackgroundColor: 'orange'},
      { data: this.analyticData14days.avgEventsPerSession, label: "Events/Session", backgroundColor: 'transparent', borderColor: 'whitesmoke', hoverBackgroundColor: 'yellow'}
    ];
  }
  setData7days(){
    this.labels7days = this.analyticData7days.dates;
    this.eventDatasets7days = [
      { data: this.analyticData7days.events, label: "Events", backgroundColor: 'transparent', borderColor: 'orange', hoverBackgroundColor: 'orange'},
      { data: this.analyticData7days.uniqueEvents, label: "Unique Events", backgroundColor: 'transparent', borderColor: 'yellow', hoverBackgroundColor: 'yellow'}
    ];
    this.pageviewDatasets7days = [
      { data: this.analyticData7days.pageviews, label: "Pageviews", backgroundColor: 'transparent', borderColor: 'purple', hoverBackgroundColor: 'orange'},
      { data: this.analyticData7days.uniquePageviews, label: "Unique Pageviews", backgroundColor: 'transparent', borderColor: 'red', hoverBackgroundColor: 'yellow'}
    ];
    this.sessionDatasets7days = [
      { data: this.analyticData7days.totalSessionDuration, label: "Total Session Duration", backgroundColor: 'transparent', borderColor: 'blue', hoverBackgroundColor: 'orange'},
      { data: this.analyticData7days.avgSessionDuration, label: "Avg Session Duration", backgroundColor: 'transparent', borderColor: 'magenta', hoverBackgroundColor: 'yellow'}
    ];
    this.hitsVsEventsPerSessionDatasets7days = [
      { data: this.analyticData7days.totalHits, label: "Total Hits", backgroundColor: 'transparent', borderColor: 'limegreen', hoverBackgroundColor: 'orange'},
      { data: this.analyticData7days.avgEventsPerSession, label: "Events/Session", backgroundColor: 'transparent', borderColor: 'whitesmoke', hoverBackgroundColor: 'yellow'}
    ];
  }

  legend = true;
  lineChartType = 'line';
  eventDatasets7days: ChartDataSets[] = [];
  pageviewDatasets7days: ChartDataSets[] = [];
  sessionDatasets7days: ChartDataSets[] = [];
  hitsVsEventsPerSessionDatasets7days: ChartDataSets[] = [];
  labels7days:Label[] = [];
  eventDatasets14days: ChartDataSets[] = [];
  pageviewDatasets14days: ChartDataSets[] = [];
  sessionDatasets14days: ChartDataSets[] = [];
  hitsVsEventsPerSessionDatasets14days: ChartDataSets[] = [];
  labels14days:Label[] = [];
  eventDatasets30days: ChartDataSets[] = [];
  pageviewDatasets30days: ChartDataSets[] = [];
  sessionDatasets30days: ChartDataSets[] = [];
  hitsVsEventsPerSessionDatasets30days: ChartDataSets[] = [];
  labels30days:Label[] = [];
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

  //mimic links/toggling of select box for horizontal options
  ngAfterViewInit(){
    $(function(){
      $(".chart-7days").click(function(){
        $(this).css('color', 'red');
        $(".chart-14days").css('color', 'turquoise');
        $(".chart-30days").css('color', 'turquoise');
      });
      $(".chart-14days").click(function(){
        $(this).css('color', 'red');
        $(".chart-7days").css('color', 'turquoise');
        $(".chart-30days").css('color', 'turquoise');
      });
      $(".chart-30days").click(function(){
        $(this).css('color', 'red');
        $(".chart-7days").css('color', 'turquoise');
        $(".chart-14days").css('color', 'turquoise');
      });
    });
  }

}
