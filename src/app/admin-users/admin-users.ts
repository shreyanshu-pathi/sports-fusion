import { Component, inject, OnInit, resource } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserDialog } from '../delete-user-dialog/delete-user-dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-admin-users',
  imports: [MatSnackBarModule],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.scss',
})
export class AdminUsers implements OnInit {

  dialog = inject(MatDialog);
  snackBar = inject(MatSnackBar);
  users: any[] = [];

  ngOnInit(): void {
    this.users = JSON.parse(localStorage.getItem('sportUsers') || '[]');
  }

  getBookingCount(email: string): number {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');

    return bookings.filter(
      (booking: any) => booking.userEmail === email).length;
  }

  addUser(): void {

  }

  deleteUser(user: any): void {

    const dialogRef = this.dialog.open(
      DeleteUserDialog, {
      width: '400px',
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '250ms',
      data: user
    }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      const users = JSON.parse(localStorage.getItem('sportUsers') || '[]');
      const updatedUsers = users.filter(
        (u: any) => u.email !== user.email);

      localStorage.setItem('sportUsers', JSON.stringify(updatedUsers));
      this.users = updatedUsers;

      // Success snackbar
      this.snackBar.open('Deleted successfully', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['success-snackbar']
      });
    });
  }
}
