import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IRepo } from '../models/IRepo';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RepoServiceService {

  constructor(private http: HttpClient) { }

  getGitHubRepos():Observable<IRepo[]>{
    return this.http.get<IRepo[]>("https://api.github.com/users/spaulsteinberg/repos").pipe(
            catchError(this.errorHandler)
    );
  }

  errorHandler(error: HttpErrorResponse){
    return throwError(error.message || "Some other error happened");
  }
}
