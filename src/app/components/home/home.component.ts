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
  mySlideImages = ["https://cdn.britannica.com/86/34386-050-25B31B35/Great-horned-owl.jpg","https://nas-national-prod.s3.amazonaws.com/styles/hero_cover_bird_page/s3/web_a1_3751_8_barn-owl_shlomo_neuman_kk-adult-male_copy.jpg?itok=oaskJaPd"];
  myCarouselImages =["https://cdn.britannica.com/86/34386-050-25B31B35/Great-horned-owl.jpg","https://nas-national-prod.s3.amazonaws.com/styles/hero_cover_bird_page/s3/web_a1_3751_8_barn-owl_shlomo_neuman_kk-adult-male_copy.jpg?itok=oaskJaPd"];
  mySlideOptions={items: 1, dots: true, nav: true};
  myCarouselOptions={items: 3, dots: true, nav: true};

}
