import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubmitContactService {

  constructor(private http : HttpClient) { }
  _url = "http://localhost:3000/setcontact"; //run the serve here. replace if needed
  submitContactForm(formBodyData){
    return this.http.post<any>(this._url, formBodyData)
            .pipe(catchError(this.errorOnFormSubmission));
  }

  errorOnFormSubmission(error: HttpErrorResponse){
    return throwError(error.message || "Exception occurred sending to server");
  }
}
