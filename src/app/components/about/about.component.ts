import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from '../../shared/services/google-analytics.service';
declare let gtag: Function;
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private analytics: GoogleAnalyticsService) { }

  title:string = "Summary";
  ngOnInit(): void {
// Feature detects Navigation Timing API support.
  }

  ngAfterViewInit(){
    console.log(screen.height);
  }
  sendLinkedInAnalytics = () => this.analytics.eventEmitter("LinkedIn", "select_content", "go_to", "click", 10);
  sendFacebookAnalytics = () => this.analytics.eventEmitter("Facebook", "select_content", "go_to", "click", 10);
  sendGithubAnalytics = () => this.analytics.eventEmitter("GitHub", "select_content", "go_to", "click", 10);

}
