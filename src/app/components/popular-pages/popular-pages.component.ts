import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from 'src/app/shared/services/analytics.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GoogleAnalyticsService } from 'src/app/shared/services/google-analytics.service';
import { IViews } from 'src/app/models/IViews';
import { IEvent } from 'src/app/models/IEventData';
import { Color } from 'ng2-charts';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-popular-pages',
  templateUrl: './popular-pages.component.html',
  styleUrls: ['./popular-pages.component.css']
})
export class PopularPagesComponent implements OnInit {

  constructor(private _analytics: AnalyticsService, private router: Router, private route: ActivatedRoute, public _logAnalytics: GoogleAnalyticsService) { }

  visited:IViews[] = [];
  events:IEvent[] = [];
  isError:boolean = false;
  errorMessage:string = '';
  isLoading:boolean = true;
  eventsLoading:boolean = true;
  isErrorEvent:boolean = false;
  isErrorEventMessage:string = '';
  
  ngOnInit(): void {
    this._analytics.getMostVisited30days()
        .subscribe(response => {
          let other = 0;
          let total = 0;
          if (response.status === "OK"){
            response['data'].forEach(element => {
              this.visited.push({
                'path': element[0],
                'views': parseInt(element[2], 10),
                'avgTimeOnPage': (parseInt(element[3], 10) / 60).toFixed(1)
              });
              total += parseInt(element[2], 10);
              if (element[2] > 100){
                this.pathChartLabels.push(element[0]);
                this.pathChartData.push(element[2]);
              }
              else {
                other += parseInt(element[2], 10);
              }
            });
            this.pathChartLabels.push("Other");
            this.pathChartData.push(other);
            for (let i = 0; i < this.pathChartData.length; i++){
              this.pathChartData[i] = ((this.pathChartData[i] / total)*100).toFixed(1);
            }
          }
          else {
            this.isError = true;
            this.errorMessage = response.status;
          }
        },
        error => {
          this.isError = true;
          this.errorMessage = error;
        },
        () => {
          this.isLoading = false;
        });
    this._analytics.getEventData30days().pipe(
      map(response => {
        let other = 0;
        let total = 0;
        response['payload'].forEach(element => {
          this.events.push({
            action: element[0],
            totalEvents: element[1],
            uniqueEvents: element[2]
          });
          total += parseInt(element[1], 10);
          if (element[1] > 30){
            this.eventChartLabels.push(element[0]);
            this.eventChartData.push(element[1]);
          }
          else {
            other += parseInt(element[1], 10);
          }
        });
        this.eventChartLabels.push("Other");
        this.eventChartData.push(other);
        for (let i = 0; i < this.eventChartData.length; i++){
          this.eventChartData[i] = ((this.eventChartData[i] / total)*100).toFixed(1);
        }
      }),
      catchError(this._analytics.getEventDataError)
    ).subscribe({
      error: (error) => {
        console.log(error);
        this.isErrorEvent = true;
        this.isErrorEventMessage = "Error in event."
      },
      complete: () => {
        console.log("Events loaded.", this.events);
        this.eventsLoading = false;
      }
    });
  }
  eventChartLabels = [];
  eventChartData = [];

  navToCharts() {
    this.router.navigate(['../analyticscharts'], {relativeTo: this.route});
  }
  pathChartLabels = [];
  pathChartData = [];
  doughnutChartType = 'doughnut';
  // just make these part of a dataset later
  doughnutChartColors: Color[] = [{
    backgroundColor:[  
      "rgba(255, 99, 132, 0.2)",
      "rgba(255, 159, 64, 0.2)",
      "rgba(255, 0, 86, 0.2)",
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
      "rgba(255, 140, 0, 0.2)",
      "rgba(133, 200, 14, 0.2)"
    ],
    hoverBackgroundColor: ['whitesmoke', 'whitesmoke', 'whitesmoke', 'whitesmoke', 'whitesmoke', 'whitesmoke', 'whitesmoke',
                          'whitesmoke', 'whitesmoke', 'whitesmoke', 'whitesmoke', 'whitesmoke', 'whitesmoke', 'whitesmoke', 'whitesmoke',
                          'whitesmoke'],
    borderColor: ['turquoise', 'turquoise', 'turquoise', 'turquoise', 'turquoise', 'turquoise', 'turquoise', 'turquoise',
                  'turquoise', 'turquoise', 'turquoise', 'turquoise', 'turquoise', 'turquoise', 'turquoise', 'turquoise',
                  'turquoise', 'turquoise']
  }];
  doughnutChartOptions:any = {
    legend : {
        labels : {
          fontColor : 'turquoise',
          fontSize: 18
        }
    },
    plugins: {
      datalabels: {
        color: 'turquoise',
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

}
