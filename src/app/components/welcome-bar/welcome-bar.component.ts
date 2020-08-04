import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-welcome-bar',
  templateUrl: './welcome-bar.component.html',
  styleUrls: ['./welcome-bar.component.css']
})
export class WelcomeBarComponent implements OnInit {

  constructor() { }

  headingText:string[] = ["Use tabs to navigate", "Click the Home tab to go back", "Another Heading 1", "Another Heading 2"];
  headingCurrent = this.headingText[0];
  iterator:number = 0;
  showWelcome:boolean = true;
  ngOnInit(): void {
    this.rotateHeading();
  }

  hideWelcome(){
    setInterval(() => {
      this.showWelcome = false;
    }, 3500);
  }

  rotateHeading(){
    this.hideWelcome();
    const source = interval(9000);
    source.subscribe(val => this.headingCurrent = this.headingText[val%this.headingText.length]);
  }

}
