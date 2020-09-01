import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from 'src/app/shared/services/google-analytics.service';

@Component({
  selector: 'app-master-site-analytics',
  templateUrl: './master-site-analytics.component.html',
  styleUrls: ['./master-site-analytics.component.css']
})
export class MasterSiteAnalyticsComponent implements OnInit {

  constructor(private analytics: GoogleAnalyticsService) { }

  ngOnInit(): void {
    if (window.performance) {
      var timeSincePageLoad = Math.round(performance.now());
      this.analytics.speedEmitter(timeSincePageLoad, 'loading');
    }
  }

}
