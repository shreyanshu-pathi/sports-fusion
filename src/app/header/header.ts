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
    // this.checkLoginStatus();

    this.isLoggedIn = !!localStorage.getItem('loggedInUser');

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.updateNavbar();

    });

    window.addEventListener('storage', () => {
      this.updateNavbar();
    });
  }

  private updateNavbar() {
    this.isLoggedIn = !!localStorage.getItem('loggedInUser');
    this.isDashboard = this.router.url === '/dashboard';

    //   console.log('URL:', this.router.url);
    // console.log('LoggedIn:', this.isLoggedIn);
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.isLoggedIn = false;  
    this.router.navigate(['/logout']);
  }
  // checkLoginStatus(): void {
  //   this.isLoggedIn = !!localStorage.getItem('loggedInUser');
  // }
}
