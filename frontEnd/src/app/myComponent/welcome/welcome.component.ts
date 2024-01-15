import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  greeting: any;
  constructor() { 
    setTimeout(() => {
      this.greeting=", to MyApp";
    }, 1000);
  }

  ngOnInit(): void {
  }

}