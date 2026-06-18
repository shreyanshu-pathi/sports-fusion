import { Component, inject, OnInit, resource, viewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserDialog } from '../delete-user-dialog/delete-user-dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-admin-users',
  imports: [MatSnackBarModule, MatTableModule, MatButtonModule, MatIconModule, MatSort],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.scss',
})
export class AdminUsers implements OnInit {

  dialog = inject(MatDialog);
  snackBar = inject(MatSnackBar);
  users: any[] = [];

  displayedColumns: string[] = [
    'name',
    'email',
    'phone',
    // 'memberSince',
    'totalBookings',
    'actions'
  ]

  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
    this.loadUsers();
    const users = JSON.parse(
      localStorage.getItem('sportUsers') || '[]'
    );
    this.dataSource.data = users;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  loadUsers(): void {
    const users = JSON.parse(localStorage.getItem('sportUsers') || '[]'
    );

    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]'
    );

    this.users = users.map((user: any) => ({
      ...user,
      memberSince: user.memberSince || 'N/A',
      totalBookings: bookings.filter((booking: any) => booking.userEmail === user.email).length
    }));
  }

  // ngOnInit(): void {
  //   this.users = JSON.parse(localStorage.getItem('sportUsers') || '[]');
  // }

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
