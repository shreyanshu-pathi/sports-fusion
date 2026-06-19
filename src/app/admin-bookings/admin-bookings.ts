import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltip } from "@angular/material/tooltip";
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminBookingDialog } from '../admin-booking-dialog/admin-booking-dialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-bookings',
  imports: [FormsModule, MatTableModule, MatFormFieldModule, MatInputModule, MatIconModule, MatSortModule, MatTooltip, MatDialogModule],
  templateUrl: './admin-bookings.html',
  styleUrl: './admin-bookings.scss',
})
export class AdminBookings {

  totalBookings = 0;
  snackbar = inject(MatSnackBar);
  dialog = inject(MatDialog);
  bookings: any[] = [];
  filteredBookings: any[] = [];

  displayedColumns: string[] = [
    'user',
    'sport',
    'venue',
    'court',
    'date',
    'time',
    'amount',
    'paymentMethod',
    'actions'
  ];

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatSort) sort !: MatSort;

  selectedSport = '';

  ngOnInit(): void {


    this.filteredBookings = [...this.bookings];

    this.loadBookings();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;

  }

  // Loads All Bookings
  loadBookings(): void {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    this.totalBookings = bookings.length;
    this.dataSource.data = bookings;
  }

  // Search Filter
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  filterBookings(): void {
    if (!this.selectedSport) {
      this.filteredBookings = [...this.bookings];
      return;
    }

    this.filteredBookings = this.bookings.filter(booking => booking.sport === this.selectedSport);
  }

  // View Booking
  viewBooking(booking: any): void {

  }

  // Edit Booking
  editBooking(booking: any): void {
    const dialogRef = this.dialog.open(AdminBookingDialog, {
      width: '600px',
      maxHeight: '90vh',
      disableClose: true,
      data: { ...booking }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return;

      const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      const index = bookings.findIndex(
        (b: any) => 
          b.userEmail === booking.userEmail &&
        b.date === booking.date &&
        b.time === booking.time &&
        b.court === booking.court
      );

      if(index !== -1){
        booking[index] = result;
        localStorage.setItem('bookings',JSON.stringify(bookings));
        this.loadBookings();
      }
    })
  }

  // Delete Booking
  deleteBooking(booking: any): void {

    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const updatedBookings = bookings.filter(
      (b: any) => !(b.userEmail === booking.userEmail &&
        b.date === booking.date &&
        b.time === booking.time &&
        b.court === booking.court
      )
    );

    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    this.loadBookings();

    this.snackbar.open('Booking deleted succesfully', 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar']
    })
    this.bookings = updatedBookings;
    this.filterBookings();

  }
}
