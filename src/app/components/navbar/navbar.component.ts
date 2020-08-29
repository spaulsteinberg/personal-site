import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from 'src/app/shared/services/google-analytics.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private analytics: GoogleAnalyticsService) { }

  ngOnInit(): void {
  }
  logAnalytics = (linkName) => this.analytics.eventEmitter(linkName, "select_content", "go_to", "click", 10);


}
