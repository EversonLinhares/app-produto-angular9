import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor() { }

  nick: string = "T";
  preco: number = 2500;

  ngOnInit(): void {
  }

  teste(nick: string) {
    console.log("testando nick: "+ nick );
  }

}
