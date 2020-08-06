import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery/dist/jquery.min.js';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  title:string = "Biography";
  ngOnInit(): void {
  }

  ngAfterViewInit(){
    
  }

}
