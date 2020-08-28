import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from '../../shared/services/google-analytics.service';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private analytics: GoogleAnalyticsService) { }

  title:string = "Summary";
  ngOnInit(): void {
  }

  ngAfterViewInit(){
    console.log(screen.height);
  }
  sendToAnalytics= () => this.analytics.eventEmitter("LinkedIn", "select_content", "go_to", "click", 10);

}
