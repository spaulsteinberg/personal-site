import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from 'src/app/shared/services/google-analytics.service';

@Component({
  selector: 'app-navigate-tab',
  templateUrl: './navigate-tab.component.html',
  styleUrls: ['./navigate-tab.component.css']
})
export class NavigateTabComponent implements OnInit {

  constructor(private analytics: GoogleAnalyticsService) { }

  ngOnInit(): void {
    if (window.performance) {
      var timeSincePageLoad = Math.round(performance.now());
      this.analytics.speedEmitter(timeSincePageLoad, 'loading');
    }
  }
  logAnalytics = (linkName) => this.analytics.eventEmitter(linkName, "select_content", "go_to", "click", 10);

}
