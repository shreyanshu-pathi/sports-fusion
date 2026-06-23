import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-revenue',
  imports: [],
  templateUrl: './admin-revenue.html',
  styleUrl: './admin-revenue.scss',
})
export class AdminRevenue implements OnInit {

  totalRevenue = 0;
  todayRevenue = 0;

  revenueBySport: any[] = [];
  revenueByVenue: any[] = [];

  topSport = '';

  ngOnInit(): void {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    this.calculateRevenue(bookings);
  }

  calculateRevenue(bookings: any[]): void {

    this.totalRevenue = 0;
    this.todayRevenue = 0;

    const today = new Date().toDateString();

    const sportMap: any = {};
    const venueMap: any = {};

//     console.log('Today:', new Date().toDateString());

// bookings.forEach((booking: any) => {
//   console.log(
//     booking.date,
//     new Date(booking.date).toDateString()
//   );
// });

    bookings.forEach(booking => {
      const amount = Number(booking.amount) || 0;

      this.totalRevenue += amount;

      if (
        new Date (booking.date).toDateString() === today) {
        this.todayRevenue += amount;
      }

      sportMap[booking.sport] = (sportMap[booking.sport] || 0) + amount;
      venueMap[booking.venue] = (venueMap[booking.venue] || 0) + amount;
    });

    this.revenueBySport = Object.entries(sportMap);
    this.revenueByVenue = Object.entries(venueMap);

    if (this.revenueBySport.length > 0) {
      this.topSport = this.revenueBySport.sort((a: any, b: any) => b[1] - a[1])[0][0];
    }
  }
}
