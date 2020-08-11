import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  mySlideOptions= { 
      items: 1,
      dots: true,
      nav: true,
      loop: true,
      margin: 10, 
      autoplay: true, 
      autoplayTimeout:5000, 
      autoplayHoverPause:true
    };
  myCarouselOptions={items: 3, dots: true, nav: true};
}
