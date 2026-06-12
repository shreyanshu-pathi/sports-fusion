import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking-history',
  imports: [],
  templateUrl: './booking-history.html',
  styleUrl: './booking-history.scss',
})
export class BookingHistory implements OnInit {

  bookings: any[] = [];

  ngOnInit(): void {

    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');

    const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');

    console.log('All Bookings:', allBookings);
    console.log('Current User:', user);

    this.bookings = allBookings.filter((booking: any) => booking.userEmail === user.email);

    console.log('User Bookings:', this.bookings);
  }
}
