import { Component, inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserDialog } from '../delete-user-dialog/delete-user-dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Dialog } from '../dialog/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-admin-users',
  imports: [MatSnackBarModule, MatTableModule, MatButtonModule, MatIconModule, MatSortModule, MatTooltipModule, MatInputModule],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.scss',
})
export class AdminUsers {

  dialog = inject(MatDialog);
  snackBar = inject(MatSnackBar);
  users: any[] = [];

  displayedColumns: string[] = [
    'name',
    'email',
    'phone',
    'totalBookings',
    'actions'
  ]

  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.loadUsers();

    // this.dataSource.filterPredicate = (user: any, filter: string) => {
    //   const searchText = (user.name + user.email + user.phone).toLowerCase();

    //   return searchText.include(filter);
    // }
    // console.log('users', 1)
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  // Load Users
  loadUsers(): void {
    const users = JSON.parse(localStorage.getItem('sportUsers') || '[]');
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');

    const updatedUsers = users.map((user: any) => ({
      ...user,
      totalBookings: bookings.filter((booking: any) => booking.userEmail === user.email).length
    }));
    this.users = updatedUsers;
    this.dataSource.data = updatedUsers;
  };

  // ngOnInit(): void {
  //   this.users = JSON.parse(localStorage.getItem('sportUsers') || '[]');
  // }

  getBookingCount(email: string): number {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');

    return bookings.filter(
      (booking: any) => booking.userEmail === email).length;
  }
  // Search Filter
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  // Delete User
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
      this.loadUsers();

      // Success snackbar
      this.snackBar.open('Deleted successfully', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['success-snackbar']
      });
    });
  }

  // Edit User
  openEditDialog(user: any): void {
    const dialogRef = this.dialog.open(Dialog, {
      width: '500px',
      disableClose: true,
      data: {
        ...user,
        isAdminEdit: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      const users = JSON.parse(localStorage.getItem('sportUsers') || '[]');
      const index = users.findIndex((u: any) => u.email === result.email);

      if (index !== -1) {
        users[index] = {
          ...users[index], ...result
        };

        localStorage.setItem('sportUsers', JSON.stringify(users));

        this.loadUsers(); //refresh material table 
      };
    });
  }
}
