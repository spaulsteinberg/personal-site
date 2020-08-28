import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
declare let gtag: Function;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Uel Site';
  // configure Google Analytics to keep track of page re-directs
  constructor(public router: Router){   
    this.router.events.subscribe(event => {
       if(event instanceof NavigationEnd){
           gtag('config', 'UA-176711685-1', 
                 {
                   'page_path': event.urlAfterRedirects
                 }
                );
        }
     }
  )}
}
