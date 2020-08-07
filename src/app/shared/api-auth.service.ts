import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { GITHUB_API_TOKEN } from '../Constants/Constants';

@Injectable({
  providedIn: 'root'
})
export class ApiAuthService {
  constructor() { }

  API_TOKEN = GITHUB_API_TOKEN;
  
  options = {
    headers : new HttpHeaders ({
      'Authorization': "token " + this.API_TOKEN
    })
  };
  getHeaders(){
    return this.options;
  }

  getToken(){
    return this.API_TOKEN;
  }

}
