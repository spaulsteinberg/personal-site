import { Component, OnInit } from '@angular/core';
import { sharedStylesheetJitUrl } from '@angular/compiler';
declare var $:any;

@Component({
  selector: 'app-commits-page',
  templateUrl: './commits-page.component.html',
  styleUrls: ['./commits-page.component.css']
})
export class CommitsPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    $(function(){
      const rootEndpoint = "https://api.github.com/users/spaulsteinberg/CS361/commits";
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
        });
      });
      function ackComplete(){
        console.log("Call completed");
      }
    });
  }

}
