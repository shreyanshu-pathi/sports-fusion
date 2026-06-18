import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-admin',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin {

  constructor(private router: Router){}

  ngOnInIt(): void {
    const isAdminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    if(!isAdminLoggedIn) {
      this.router.navigate(['/admin-login']);
    }
  }

  logoutAdmin(): void {
    localStorage.removeItem('adminLoggedIn');
    this.router.navigate(['/admin-login']);
  }
}
