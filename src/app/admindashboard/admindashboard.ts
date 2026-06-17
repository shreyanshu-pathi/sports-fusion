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

  ngOnInIt(): void {

    const users = JSON.parse(localStorage.getItem('sportUsers') || '[]');
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');

    this.totalUsers = users.length;
    this.totalBookings = bookings.length;
    this.totalRevenue = bookings.reduce(
      (sum: number, booking: any) => { sum + (bookings.amount || 0), 0}
    );

    const today = new Date().toLocaleDateString();
    this.todayBookings = bookings.filter(
      (booking: any) => booking.date === today).length;
  }
}
