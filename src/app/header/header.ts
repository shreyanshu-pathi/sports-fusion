import { Component, OnInit } from '@angular/core';
import { RouterLink, NavigationEnd } from "@angular/router";
import { Router } from "@angular/router";
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {

  isLoggedIn = false;
  isDashboard = false;

  constructor(private router: Router) { }

  ngOnInit() {

    this.updateNavbar();

    this.isLoggedIn = !!localStorage.getItem('loggedInUser');

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
    this.updateNavbar();

    });
  }

  private updateNavbar() {
    this.isLoggedIn = !!localStorage.getItem('loggedInUser');
    this.isDashboard = this.router.url === '/dashboard';
    
  //   console.log('URL:', this.router.url);
  // console.log('LoggedIn:', this.isLoggedIn);
  }
}
