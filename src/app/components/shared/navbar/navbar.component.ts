import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  id: number;

  constructor() { }

  ngOnInit(): void {
    switch (location.pathname) {
      case '/home':
        this.id = 1;
        break;
      case '/create':
        this.id = 2;
        break;
    }
  }

  setActive(id: number) {
    this.id = id;
  }

}
