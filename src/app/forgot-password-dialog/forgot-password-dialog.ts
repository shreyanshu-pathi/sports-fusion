import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password-dialog',
  imports: [FormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './forgot-password-dialog.html',
  styleUrl: './forgot-password-dialog.scss',
})
export class ForgotPasswordDialog {

  dialogRef = inject(MatDialogRef<ForgotPasswordDialog>);
  snackBar = inject(MatSnackBar);

  email = '';
  newPassword = '';
  confirmPassword = '';

  resetPassword(): void {
    if (!this.email || !this.newPassword || !this.confirmPassword) {
      this.snackBar.open('Please fill all details', 'Close', { duration: 3000 });
      return;
    }
    if (this.newPassword !== this.confirmPassword) {
      this.snackBar.open('Passwords do not match', 'Close', { duration: 3000 });
      return;
    }

    const users = JSON.parse(localStorage.getItem('sportUsers') || '[]');

    const userIndex = users.findIndex((u: any) => u.email === this.email);

    if (userIndex === -1) {
      this.snackBar.open('Email not found', 'Close', { duration: 3000 });
      return;
    }
    users[userIndex].password = this.newPassword;

    localStorage.setItem('sportUsers', JSON.stringify(users));

    const snackRef = this.snackBar.open('Password updated succesfully', 'Close', {
      duration: 3000,
      panelClass: ['success-snackBar']
    });
    snackRef.afterDismissed().subscribe(() => {
      this.dialogRef.close();
    })

  }
  close(): void {
    this.dialogRef.close();
  }
}
