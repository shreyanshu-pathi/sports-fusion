import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { ForgotPasswordDialog } from '../forgot-password-dialog/forgot-password-dialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-login',
  imports: [ReactiveFormsModule, MatSnackBarModule, MatIconModule, MatDialogModule],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.scss',
})
export class AdminLogin implements OnInit {

  router = inject(Router);
  snackBar = inject(MatSnackBar);
  dialog = inject(MatDialog)

  submitted = false;
  error = '';

  adminForm = new FormGroup({

    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])

  });

  ngOnInit(): void {
    const isAdminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    if (isAdminLoggedIn) {
      this.router.navigate(['/admin/admindashboard']);
    }
  }

  // Forgot Password
  forgotPassword(): void {
    this.dialog.open(ForgotPasswordDialog, {
      width: '450px',
      disableClose: true
    });
  }

  // Login
  loginAdmin(): void {
    this.submitted = true;
    if (this.adminForm.invalid) {
      return;
    }

    const email = this.adminForm.value.email;
    const password = this.adminForm.value.password;

    const adminEmail = 'admin@sportsfusion.com';
    const adminPassword = 'Admin@12345';

    if (email === adminEmail && password === adminPassword) {
      localStorage.setItem('adminLoggedIn', 'true');
      this.router.navigate(['/admin/admindashboard']);

      this.snackBar.open('Admin Login Successful', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['success-snackbar']
      });
    } else {
      this.error = 'Invalid admin credentials';

      this.snackBar.open('Invalid admin credentials', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
    }
  }
}
