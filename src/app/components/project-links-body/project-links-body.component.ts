import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from 'src/app/shared/services/google-analytics.service';

@Component({
  selector: 'app-project-links-body',
  templateUrl: './project-links-body.component.html',
  styleUrls: ['./project-links-body.component.css']
})
export class ProjectLinksBodyComponent implements OnInit {

  constructor(private analytics: GoogleAnalyticsService) { }

  ngOnInit(): void {
  }

  logAnalytics = (linkName) => this.analytics.eventEmitter(linkName, "select_content", "go_to", "click", 10);
  //logCommitAnalytics = (linkName) => this.analytics.eventEmitter(linkName, "select_content", "go_to", "click", 10);

}
