import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from 'src/app/shared/services/google-analytics.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private analytics: GoogleAnalyticsService) { }

  personalEmail:string = "sampaulsteinberg@gmail.com";
  schoolEmail:string = "ssteinb2@vols.utk.edu";
  workEmail:string = "samuel.steinberg@schwab.com"
  gitEmail:string = "githubsps@gmail.com";
  showForm:boolean = false;
  disableMailClick:boolean = false;
  ngOnInit(): void {
  }
  logAnalytics = (linkName) => this.analytics.eventEmitter(linkName, "select_content", "go_to", "click", 10);

}
