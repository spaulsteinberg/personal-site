import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor() { }

  personalEmail:string = "sampaulsteinberg@gmail.com";
  schoolEmail:string = "ssteinb2@vols.utk.edu";
  workEmail:string = "samuel.steinberg@schwab.com"
  gitEmail:string = "githubsps@gmail.com";
  showForm:boolean = false;
  disableMailClick:boolean = false;
  ngOnInit(): void {
  }

}
