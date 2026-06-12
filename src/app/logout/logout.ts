import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [RouterLink],
  templateUrl: './logout.html',
  styleUrl: './logout.scss',
})
export class Logout implements OnInit {
  constructor(private router: Router) {}

  // router = inject(Router);
  ngOnInit(): void {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/logout']);
  }

}
