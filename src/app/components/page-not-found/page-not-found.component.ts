import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from 'src/app/shared/services/google-analytics.service';

@Component({
  selector: 'page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private _logAnalytics: GoogleAnalyticsService) { }

  ngOnInit(): void {
  }
  logAnalytics = () => this._logAnalytics.eventEmitter('Home Page', "select_content", "go_to", "click", 10);
}
