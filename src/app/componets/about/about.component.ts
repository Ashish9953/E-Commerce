import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
    
  constructor() { }
  about:boolean=true;
  news:boolean=false;
  comp:boolean=false;
  ngOnInit(): void {
  }

  changeAbout()
  {
    this.about=true;
    this.news=false;
    this.comp=false;
  }
  changeNews()
  {
    this.about=false;
    this.news=true;
    this.comp=false;
  }
  changeComp()
  {
    this.about=false;
    this.news=false;
    this.comp=true;
  }
}
