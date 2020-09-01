import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from 'src/app/shared/services/google-analytics.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private analytics: GoogleAnalyticsService) { }

  ngOnInit(): void {
    if (window.performance) {
      var timeSincePageLoad = Math.round(performance.now());
      this.analytics.speedEmitter(timeSincePageLoad, 'loading');
    }
  }
  mySlideOptions= { 
      items: 1,
      dots: true,
      nav: true,
      loop: true,
      margin: 10, 
      autoplay: true, 
      autoplayTimeout:5000, 
      autoplayHoverPause:true
    };
  myCarouselOptions={items: 3, dots: true, nav: true};
}
