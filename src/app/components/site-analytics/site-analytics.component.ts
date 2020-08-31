import { Component, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery/dist/jquery.min.js';
import { AnalyticsService } from 'src/app/shared/services/analytics.service';
import { map, catchError, tap } from 'rxjs/operators';
import { IEvent } from '../../models/IEventData';
import { IViews } from 'src/app/models/IViews';
import { MatSort } from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { GoogleAnalyticsService } from 'src/app/shared/services/google-analytics.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-site-analytics',
  templateUrl: './site-analytics.component.html',
  styleUrls: ['./site-analytics.component.css']
})
export class SiteAnalyticsComponent implements OnInit {
  //need to specify which paginators/sort use which
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild('sortView') sortView:MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('paginatorView', {static: true}) paginatorView: MatPaginator;
  constructor(private _analytics: AnalyticsService, private _logAnalytics: GoogleAnalyticsService, private router: Router) { }

  pageviews;
  avgPageTime;
  errorMessage;
  errorMessageEvent;
  errorMessageFeedback;
  errorMessageMostVisited;
  totalEvents;
  sessionsWithEvents;
  uniqueEvents;
  events:IEvent[] = [];
  feedbackCount:number;
  mostVisitedToRender:IViews[] = [];
  displayedColumnsEvents: string[] = ['totalEvents', 'uniqueEvents', 'action'];
  dataSourceEvents;
  displayedColumnsViews: string[] = ['path', 'views'];
  dataSourceViews;
  eventsLoading:boolean = true;
  viewsLoading:boolean = true;

  isErrorPage:boolean = false;
  isErrorEvent:boolean = false;
  isErrorFeedback:boolean = false;
  isErrorMostVisited:boolean = false;
  ngOnInit(): void {
    this._analytics.getPageViewData30days().subscribe({
      next: (response) => {
        if (response.status === 200){
          this.pageviews = response.pageviews;
          this.avgPageTime = (parseInt(response.avgTimeOnPage, 10) / 60).toFixed(1);
          console.log(response.status, response.data);
        }
      },
      error: (error) => {
        this.isErrorPage = true;
        this.errorMessage = error;
        console.log(error);
      },
      complete: () => console.log("Execution completed.")
    });
    this._analytics.getEventData30days().pipe(
      map(response => {
        console.log(response);
        response['payload'].forEach(element => {
          this.events.push({
            action: element[0],
            totalEvents: element[1],
            uniqueEvents: element[2]
          });
        });
      }),
      catchError(this._analytics.getEventDataError)
    ).subscribe({
      error: (error) => {
        console.log(error);
        this.isErrorEvent = true;
        this.errorMessageEvent = "Error in event."
      },
      complete: () => {
        console.log("Events loaded.", this.events);
        this.dataSourceEvents = new MatTableDataSource<IEvent>(this.events);
        this.dataSourceEvents.paginator = this.paginator;
        this.dataSourceEvents.sort = this.sort;
        this.eventsLoading = false;
      }
    });
    this._analytics.getFeedbackRequestCount().
      subscribe(
        response => {
        if (response.status === "OK"){
          this.feedbackCount = response.count;
        }
        else {
          this.isErrorFeedback = true;
          this.errorMessageFeedback = response.status;
        }
      },
      error => {
        this.isErrorFeedback = true;
        this.errorMessageFeedback = error;
      });

    this._analytics.getMostVisited30days()
        .subscribe(response => {
          if (response.status === "OK"){
            response['data'].forEach(element => {
              this.mostVisitedToRender.push({
                'path': element[0],
                'views': element[2]
              });
            });
          }
          else {
            this.isErrorMostVisited = true;
            this.errorMessageMostVisited = response.status;
          }
        },
        error => {
          this.isErrorMostVisited = true;
          this.errorMessageMostVisited = error;
        },
        () => {
          console.log(this.mostVisitedToRender);
          this.dataSourceViews = new MatTableDataSource<IViews>(this.mostVisitedToRender);
          this.dataSourceViews.paginator = this.paginatorView;
          this.dataSourceViews.sort = this.sortView;
          this.viewsLoading = false;
        });
  }
  logAnalytics = () => this._logAnalytics.eventEmitter(`Speed Analytics`, "select_content", "go_to", "click", 10);
  navToSpeedAndNetwork(){
    this.router.navigate([`${this.router.url}/speedandnetwork`]);
  }
  ngAfterViewInit(){
    
  }

}
