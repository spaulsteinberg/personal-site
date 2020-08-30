import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';

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

  getEventData30days(){
    const url = `${this._base}/websiteEventData30days`;
    return this.http.get<any>(url);
  }

  getFeedbackRequestCount(){
    const url = `${this._base}/feedback/count`;
    return this.http.get<any>(url).pipe(catchError(this.getFeedbackRequestCountError));
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
}
