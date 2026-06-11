import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Sportservice } from '../sportservice';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ForgotPasswordDialog } from '../forgot-password-dialog/forgot-password-dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from "@angular/material/form-field";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, MatSnackBarModule, MatDialogModule, MatIconModule, MatFormFieldModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  isvalid: boolean = false;
  submitted: boolean = false;
  error: string = '';

  sportservice = inject(Sportservice);
  router = inject(Router);
  snackBar = inject(MatSnackBar);
  dialog = inject(MatDialog);

  loginForm = new FormGroup({

    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),

    password: new FormControl('', [
      Validators.required
    ])
  });

  // Forgot Password
  forgotPassword(): void {
    this.dialog.open(ForgotPasswordDialog, {
      width: '450px',
      disableClose: true
    });
  }

  onLogin(): void {

    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    // Get users from localStorage
    const sportUsers = JSON.parse(localStorage.getItem('sportUsers') || '[]');

    // Check matching user
    const validUser = sportUsers.find((user: any) =>
      user.email === email && user.password === password
    );

    if (validUser) {

      localStorage.setItem('loggedInUser', JSON.stringify(validUser));
      this.isvalid = true;
      this.error = '';
      // alert('Login Successful!');
      this.loginForm.reset();
      this.submitted = false;

      const snackRef = this.snackBar.open(
        'Login Successful!',
        'Close',
        {
          duration: 1000,
          panelClass: ['success-snackbar'],
          horizontalPosition: 'center',
          verticalPosition: 'top'
        }
      );

      snackRef.afterDismissed().subscribe(() => {
        this.router.navigate(['/dashboard']);
      });

    } else {

      this.snackBar.open(
        'Invalid email or password',
        'Close',
        {
          duration: 3000,
          panelClass: ['error-snackbar'],
          horizontalPosition: 'center',
          verticalPosition: 'top'
        }
      );
      // this.router.navigate(['/dashboard']);
      this.isvalid = false;
      this.error = 'Invalid email or password';
    }
  }
}
