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
  isAdminLoggedIn = false;

  constructor(private router: Router) {}

  ngOnInit(): void {

    this.updateNavbar();

    // this.isLoggedIn = !!localStorage.getItem('loggedInUser');
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

    this.isAdminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';

    //   console.log('URL:', this.router.url);
    // console.log('LoggedIn:', this.isLoggedIn);

    console.log('isLoggedIn:', this.isLoggedIn);
  console.log('isAdminLoggedIn:', this.isAdminLoggedIn);
  }

  logout(): void {
    localStorage.removeItem('loggedInUser');
    this.isLoggedIn = false;  
    this.router.navigate(['/logout']);
  }
  
  // adminLogout(): void {
  //   localStorage.removeItem('adminLoggedIn');
  //   this.isAdminLoggedIn = false;
  //   this.router.navigate(['/admin-login']);
  // }
}
