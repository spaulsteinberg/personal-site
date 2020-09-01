import { Component, OnInit } from '@angular/core';
import { ApiAuthService } from 'src/app/shared/services/api-auth.service';
import * as $ from 'jquery/dist/jquery.min.js';
import { GoogleAnalyticsService } from 'src/app/shared/services/google-analytics.service';

@Component({
  selector: 'app-commits-page',
  templateUrl: './commits-page.component.html',
  styleUrls: ['./commits-page.component.css']
})
export class CommitsPageComponent implements OnInit {

  constructor(private auth: ApiAuthService, private analytics: GoogleAnalyticsService) { }

  ngOnInit(): void {
    if (window.performance) {
      var timeSincePageLoad = Math.round(performance.now());
      this.analytics.speedEmitter(timeSincePageLoad, 'loading');
    }
  }

  ngAfterViewInit(){
    $(function(){
      const rootEndpoint = "https://api.github.com/repos/spaulsteinberg/CS361/commits";
      $("#uni").click(function(){
        $.ajax({
          url: rootEndpoint,
          method: 'get',
          dataType: 'JSON',
          success:function(response){
            console.log(response);
          },
          error:function(xhr, ajaxOptions, thrownError){
            console.log(xhr.responseText);
          },
          complete:function(){
            ackComplete();
          }
        })
      });
      function ackComplete(){
        console.log("Call completed");
      }
    });
  }

}
