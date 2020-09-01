import { Injectable } from '@angular/core';
declare let gtag: Function;
@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  constructor() { }
  // create a resusable gtag
  public eventEmitter( 
    eventName: string, 
    eventCategory: string, 
    eventAction: string, 
    eventLabel: string = null,  
    eventValue: number = null ){ 
         gtag('event', eventName, { 
                 eventCategory: eventCategory, 
                 eventLabel: eventLabel, 
                 eventAction: eventAction, 
                 eventValue: eventValue
               })
    }

  public speedEmitter(timeSincePageLoad, name){
    gtag('event', 'timing_complete', {
      'name': 'load',
      'value': timeSincePageLoad,
      'event_category': name
    });
  }
}
