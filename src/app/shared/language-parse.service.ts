import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, pipe, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LanguageParseService {

  constructor(private http: HttpClient) { }

  getLanguageList(){
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    const url = "assets/languages.txt";
    return this.http.get(url, {responseType: 'text'}).pipe(
              catchError(this.errorOnLoad)
    );
  }

  errorOnLoad(error:HttpErrorResponse){
    return throwError(error.message || "Bad language load");
  }
}
