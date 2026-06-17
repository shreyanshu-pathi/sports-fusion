import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-login',
  imports: [ReactiveFormsModule],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.scss',
})
export class AdminLogin {

  router = inject(Router);
  snackBar = inject(MatSnackBar);

  adminForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', Validators.required)
  });

  ngOnInit(): void {

    const isAdminLoggedIn =
      localStorage.getItem('adminLoggedIn') === 'true';

    if (isAdminLoggedIn) {
      this.router.navigate(['/admin']);
    }
  }

  loginAdmin(): void {

    const email = this.adminForm.value.email;
    const password = this.adminForm.value.password;

    const ADMIN_EMAIL = 'admin@sportsfusion.com';
    const ADMIN_PASSWORD = 'admin123';

    if (
      email === ADMIN_EMAIL &&
      password === ADMIN_PASSWORD
    ) {

      localStorage.setItem('adminLoggedIn', 'true');

      this.snackBar.open(
        'Admin Login Successful',
        'Close',
        {
          duration: 3000,
          panelClass: ['success-snackbar']
        }
      );

      this.router.navigate(['/admin']);

    } else {

      this.snackBar.open(
        'Invalid Admin Credentials',
        'Close',
        {
          duration: 3000,
          panelClass: ['error-snackbar']
        }
      );
    }
  }
}
