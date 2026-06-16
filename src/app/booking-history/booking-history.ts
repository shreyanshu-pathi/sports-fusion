import { Component, inject, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-history',
  standalone: true,
  imports: [MatSnackBarModule],
  templateUrl: './booking-history.html',
  styleUrl: './booking-history.scss',
})
export class BookingHistory implements OnInit {

  router = inject(Router);
  snackBar = inject(MatSnackBar);
  bookings: any[] = [];
 

  ngOnInit(): void {

    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');

    const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');

    console.log('All Bookings:', allBookings);
    console.log('Current User:', user);

    this.bookings = allBookings.filter((booking: any) => booking.userEmail === user.email);

    console.log('User Bookings:', this.bookings);
  }

  //Cancel Booking 
  cancelBooking(booking: any): void {
    const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');

    const updatedBookings = allBookings.filter((b: any) =>
      !(
        b.userEmail === booking.userEmail &&
        b.date === booking.date &&
        b.time === booking.time &&
        b.court === booking.court
      ));

    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    this.bookings = this.bookings.filter(b => b !== booking);
    this.snackBar.open('Booking cancelled succesfully!', 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar-success']
    })
  }

  // Cancellation allowed only if the booking is more than 6 hours away
  canCancelBooking(booking: any): boolean {
    const now = new Date();

    const bookingDate = new Date(booking.date);

    const time = booking.time;

    const [timePart, modifier] = time.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);

    if (modifier === 'PM' && hours !== 12) {
      hours += 12;
    } else if (modifier === 'AM' && hours === 12) {
      hours = 0;
    }

    bookingDate.setHours(hours, minutes, 0, 0);

    const timeDifference = (bookingDate.getTime() - now.getTime()) / (1000 * 60 * 60);

    return timeDifference >= 6;
  }

  // Reschedule Booking
  selectedBooking: any;

  rescheduleBooking(booking: any): void {
    localStorage.setItem('rescheduleBooking', JSON.stringify(booking));
    this.router.navigate(['/dashboard']);
  }

  // Back to Dashboard
  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
