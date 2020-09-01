import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';
import { IEvent } from 'src/app/models/IEventData';
import { IViews } from 'src/app/models/IViews';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private http: HttpClient) { }

  private readonly _base = "http://localhost:3000";
  getPageViewData30days(){
    const url = `${this._base}/websitePageViews30days`;
    return this.http.get<any>(url).pipe(catchError(this.getPageViewError));
  }

  getEventData30days():Observable<IEvent[]>{
    const url = `${this._base}/websiteEventData30days`;
    return this.http.get<IEvent[]>(url);
  }

  getFeedbackRequestCount(){
    const url = `${this._base}/feedback/count`;
    return this.http.get<any>(url).pipe(catchError(this.getFeedbackRequestCountError));
  }

  getMostVisited30days(){
    const url = `${this._base}/pagevisits`;
    return this.http.get<any>(url).pipe(catchError(this.getPageViewError));
  }

  getTimeMetrics30days(){
    const url = `${this._base}/speed`;
    return this.http.get<any>(url).pipe(catchError(this.getTimeMetricsError));
  }

  getPageViewsOnTime(){
    const url = `${this._base}/pageViewsOnTime`;
    return this.http.get<any>(url).pipe(catchError(this.getPageViewError));
  }

  getPageViewError(error: HttpErrorResponse){
    return throwError(error.message || "An error occurred getting analytics data. Please try again.");
  }

  getEventDataError(error: HttpErrorResponse){
    return throwError(error.message || "An error occurred fetching event data. Please try again.");
  }

  getFeedbackRequestCountError(error: HttpErrorResponse){
    return throwError(error.message || "Error occurred fetching feedback count. Please try again.");
  }

  getTimeMetricsError(error: HttpErrorResponse){
    return throwError(error.message || "An error occurred fetching time metrics. Please try again.");
  }
}
