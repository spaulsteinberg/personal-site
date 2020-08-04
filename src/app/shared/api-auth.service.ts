import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiAuthService {
  constructor() { }

  API_TOKEN = "7333e5dd81c805f0abfee28d450a7878a3677670";
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
