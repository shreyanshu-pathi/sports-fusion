import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admindashboard',
  imports: [],
  templateUrl: './admindashboard.html',
  styleUrl: './admindashboard.scss',
})
export class Admindashboard {

  totalUsers = 0;
  totalBookings = 0;
  totalRevenue = 0;
  todayBookings = 0;

  ngOnInit(): void {

    const users = JSON.parse(localStorage.getItem('sportUsers') || '[]');
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');

    this.totalUsers = users.length;

    this.totalBookings = bookings.length;

    // Revenue Calculation
    this.totalRevenue = bookings.reduce(
      (sum: number, booking: any) => sum + (Number(booking.amount) || 0), 0);

    // Today's Bookings
    const today = new Date().toDateString();

    this.todayBookings = bookings.filter(
      (booking: any) =>
        new Date(booking.date).toDateString() === today
    ).length;

    console.log(bookings);
console.log(today);

bookings.forEach((booking: any) => {
  console.log(
    booking.date,
    new Date(booking.date),
    new Date(booking.date).toDateString()
  );
});
  }
}
