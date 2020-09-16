import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsSharedInfoService {

  constructor() { }
  private city:string;

  set _city(city:string){
    this.city = city;
  }

  get _city():string{
    return this.city;
  }
}
