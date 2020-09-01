import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from 'src/app/shared/services/google-analytics.service';

@Component({
  selector: 'app-project-links',
  templateUrl: './project-links.component.html',
  styleUrls: ['./project-links.component.css']
})
export class ProjectLinksComponent implements OnInit {

  constructor(private analytics: GoogleAnalyticsService) { }

  ngOnInit(): void {
    if (window.performance) {
      var timeSincePageLoad = Math.round(performance.now());
      this.analytics.speedEmitter(timeSincePageLoad, 'loading');
    }
  }

}
