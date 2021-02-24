import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  id: number;

  constructor(private router: Router) { }

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

  showText(text: string) {    
    this.router.navigate(['/results', text]);
  }

}
