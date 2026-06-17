import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-bookings',
  imports: [FormsModule],
  templateUrl: './admin-bookings.html',
  styleUrl: './admin-bookings.scss',
})
export class AdminBookings implements OnInit {

  bookings: any[] = [];
  filteredBookings: any[] = [];

  selectedSport = '';
  ngOnInit(): void {
    this.bookings = JSON.parse(localStorage.getItem('bookings') || '[]');

    this.filteredBookings = [...this.bookings];
  }

  filterBookings(): void {
    if(!this.selectedSport) {
      this.filteredBookings = [...this.bookings];
      return;
    }

    this.filteredBookings = this.bookings.filter(booking => booking.sport === this.selectedSport);
  }

  cancelBooking(booking: any): void {

    const updatedBookings = this.bookings.filter(
      b => !(b.userEmail === booking.userEmail &&
        b.date === booking.date &&
        b.time === booking.time &&
        b.court === booking.court 
      )
    );

    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    this.bookings = updatedBookings;
    this.filterBookings();
  }
}
