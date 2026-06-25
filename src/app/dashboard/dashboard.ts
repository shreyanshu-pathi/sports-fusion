import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GALLERY_IMAGES } from '../constants/constants';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Dialog } from '../dialog/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { QRCodeComponent } from 'angularx-qrcode';
import { BookingCard } from '../booking-card/booking-card';
import { Weather } from '../services/weather';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, MatDialogModule, MatFormFieldModule,
    MatInputModule, MatDatepickerModule, MatNativeDateModule, MatIconModule,
    MatSnackBarModule, DatePipe, QRCodeComponent, RouterLink, RouterOutlet, BookingCard, MatTooltip],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})

export class Dashboard implements OnInit {

  images = GALLERY_IMAGES;

  router = inject(Router);
  dialog = inject(MatDialog);
  snackBar = inject(MatSnackBar);
  weather = inject(Weather)

  // Modals
  showReviewModal = false;
  // showProfileModal = false;
  // isEditingProfile = false;

  // User Details
  username = '';

  userProfile = {
    name: '',
    email: '',
    phone: '',
    image: ''
  };

  memberSince = 'N/A';

  // Booking Statistics
  bookings: any[] = [];
  totalBookings = 0;
  lastBookingDate = 'No bookings';

  // Editing Profile
  // editProfile() {
  //   this.isEditingProfile = true;
  // }

  // Save Profile after editing
  // saveProfile(): void {
  //   localStorage.setItem('loggedInUser', JSON.stringify({ ...this.userProfile, memberSince: this.memberSince }));

  //   this.username = this.userProfile.name;
  //   this.isEditingProfile = false;
  //   alert('Profile uploaded');
  // }

  // Booking Options
  sports = [
    'Cricket',
    'Badminton',
    'Football',
    'Volleyball',
    'Basketball',
    'Tennis'
  ];

  venues = [
    'Jubilee Hills',
    'Madhapur',
    'Gachibowli'
  ];

  courts = [
    'Court A',
    'Court B',
    'Court C',
    'Court D',
    'Court E'
  ];

  slots = [
    '06:00 AM',
    '08:00 AM',
    '10:00 AM',
    '04:00 PM',
    '06:00 PM',
    '08:00 PM',
    '10:00 PM'
  ];

  // Selected Values
  selectedSport = '';
  selectedVenue = '';
  selectedCourt = '';
  selectedDate: Date | null = null;
  selectedSlot = '';
  selectedPlayers: number | null = null;

  // Weather
  weatherMessage = '';
  temperature = 0;
  weatherData: any;

  getWeatherMessage(sport: string, weather: any): string {
    const temp = weather.temperature_2m;
    const wind = weather.wind_speed_10m;

    if (wind > 25) {
      return `🌬 Strong winds expected. Consider indoor courts.`;
    }

    switch (sport) {

      case 'Cricket':
        return temp > 35
          ? '☀ High temperature. Consider morning or evening slots also carry water.'
          : '🏏 Pitch seems to be nice as well excellent weather for cricket.';

      case 'Football':
        return temp > 25
          ? '⚽ Hot weather. Evening slots recommended.'
          : '⚽ Great conditions for football.';

      case 'Volleyball':
        return temp > 30
          ? '🏐 Afternoon heat may affect gameplay.'
          : '🏐 Weather looks good to play volleyball,continue booking ahead! .';

      case 'Tennis':
        return temp > 20
          ? '🎾 Early morning slot recommended.'
          : '🎾 Excellent weather for tennis.';

      case 'Badminton':
        return '🏸 Indoor courts available regardless of weather.';

      case 'Basketball':
        return '🏀 Indoor courts available. Weather impact minimal.';

      default:
        return '✅ Weather conditions look good.';
    }
  }

  venueCoordinates: any = {
    'Jubilee Hills': {
      lat: 17.4326,
      lon: 78.4071
    },

    'Madhapur': {
      lat: 17.4485,
      lon: 78.3915
    },

    'Gachibowli': {
      lat: 17.4401,
      lon: 78.3489
    }
  }

  // Notification Panel
  showNotifications = false;
  weatherNotifications: string[] = [];

  // Toggle Notifications
  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
    if (this.showNotifications) {
      this.generateWeatherNotifications();
    }
  }

  // Close Notification Panel
  closeNotifications(): void{
    this.showNotifications = false;
  }

  // Generate Weather Notifications
  generateWeatherNotifications(): void {
    this.weatherNotifications = [];
    this.bookings.forEach((booking: any) => {
      const weather = this.weatherData?.current;

      if (!weather) return;
      const temp = weather.temperature_2m;
      const wind = weather.wind_speed_10m;

      const bookingDate = new Date(booking.date);
      const today = new Date();

      const daysRemaining = Math.ceil(bookingDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

      switch (booking.sport) {

        case 'Cricket':
          if (daysRemaining <= 1) {
            this.weatherNotifications.push(
              `🌧 Rain expected near ${booking.time} at ${booking.venue}. 
              Cricket pitch may become wet and slippery. Consider rescheduling.`
            )
          }

          if (temp > 35) {
            this.weatherNotifications.push(
              `☀ Temperature may reach ${temp}°C at ${booking.venue}. Carry water and avoid long exposure.`
            )
          }
          break;

        case 'Football':
          this.weatherNotifications.push(
            `⚽ Light showers expected during evening hours. 
             Grass surface at ${booking.venue} may be slippery. Wear proper studs.`
          )

          if (wind > 25) {
            this.weatherNotifications.push(
              `⚽ Strong winds expected at
             ${booking.venue}. Gameplay may be affected.`
            )
          }
          break;

        case 'Volleyball':
          this.weatherNotifications.push(
            `🏐 Rain clouds expected in the next few hours.
             Outdoor volleyball courts may become unavailable temporarily.`
          )

          if (temp > 30) {
            this.weatherNotifications.push(
              `🏐 Afternoon heat expected.
             Consider an earlier slot or reschedule.`
            )
          }
          break;

        case 'Tennis':
          this.weatherNotifications.push(
            `🎾 Weather forecast indicates possible rain later today. Early morning sessions are recommended.`
          )

          if (temp > 34) {
            this.weatherNotifications.push(
              `🎾 Hot weather forecast.
             Morning session recommended.`
            )
          }
          break;

        case 'Badminton':
          this.weatherNotifications.push(
            `🏸 Indoor court booked. Weather will not affect gameplay at ${booking.venue}.`
          );
          break;

        case 'Basketball':

          this.weatherNotifications.push(
            `🏀 Indoor booking confirmed. Weather impact minimal.`
          );
          break;
      }
    })
  }

  ngOnInit(): void {

    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');

    console.log('Logged In User:', user);
    console.log('Image:', user.image);

    this.username = user.name || '';

    this.userProfile = {
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      image: user.image || ''
    };

    this.memberSince = user.memberSince || 'N/A';

    this.loadBookings();

    this.loadCourtAvailability();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        this.weather.getWeather(latitude, longitude).subscribe(data => {
          console.log(data);
          this.weatherData = data;
        });

      },
        error => {
          console.error('Location access denied');
        }
      );
    }
  }

  // Load Bookings
  loadBookings(): void {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');

    this.bookings = allBookings.filter((booking: any) =>
      booking.userEmail === loggedInUser.email);

    this.totalBookings = this.bookings.length;

    if (this.bookings.length > 0) {
      this.lastBookingDate =
        this.bookings[this.bookings.length - 1].date;
    } else {
      this.lastBookingDate = 'No bookings';
    }
  }

  // Selection Methods
  selectSport(sport: string): void {

    this.selectedSport = sport;

    this.selectedVenue = '';
    this.selectedCourt = '';
    this.selectedPlayers = 0;
    this.selectedDate = null;
    this.selectedSlot = '';
    this.selectedPaymentMethod = ''
    this.couponCode = '';
    this.discountAmount = 0;

    this.bookingAmount = this.sportPrices[sport]

    this.calculateAmount();
  }

  selectVenue(venue: string): void {

    this.selectedVenue = venue;

    this.selectedCourt = '';
    this.selectedPlayers = null;
    this.selectedDate = null;
    this.selectedSlot = '';

    const location = this.venueCoordinates[venue];

    if (!location) return;

    this.weather.getWeather(location.lat, location.lon).subscribe(data => {
      this.weatherData = data;

      this.weatherMessage = this.getWeatherMessage(this.selectedSport, data.current);
    });
  }

  selectCourt(court: string): void {

    this.selectedCourt = court;

    this.selectedPlayers = null;
    this.selectedDate = null;
    this.selectedSlot = '';
  }

  selectSlot(slot: string): void {
    this.selectedSlot = slot;
  }

  // Live Slot Availability
  isSlotBooked(court: string, slot: string): boolean {
    const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');

    return allBookings.some((booking: any) =>
      new Date(booking.date).toDateString() === this.selectedDate?.toDateString() &&
      booking.court === court &&
      booking.time === slot
    );
  }

  // Slot Availbility Dashboard
  courtAvailabilty: any[] = [];

  loadCourtAvailability(): void {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');

    const courts = [
      'Court A',
      'Court B',
      'Court C',
      'Court D',
      'Court E',
    ];

    this.courtAvailabilty = courts.map(court => {
      const bookedCount = bookings.filter((b: any) => b.court === court).length;
      const totalSlots = this.slots.length;
      const remainingSlots = totalSlots - bookedCount;
      return {
        court, remainingSlots
      };
    });
  }

  // Review Booking
  submitBooking(): void {

    if (
      !this.selectedSport ||
      !this.selectedVenue ||
      !this.selectedCourt ||
      !this.selectedPlayers ||
      !this.selectedDate ||
      !this.selectedSlot
    ) {
      this.snackBar.open('Please complete all booking details', 'Close', {
        duration: 4000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
      return;
    }

    this.showReviewModal = true;
  }

  closeReviewModal(): void {
    this.showReviewModal = false;
  }

  // Payment Summary
  selectedPaymentMethod: string = '';
  bookingAmount: number = 0;

  sportPrices: Record<string, number> = {
    Cricket: 1000,
    Football: 1200,
    Basketball: 800,
    Badminton: 600,
    Volleyball: 700,
    Tennis: 500
  }

  // Coupons
  couponCode = '';
  discountAmount = 0;

  availableCoupons = {
    SPORT100: 100,
    WELCOME50: 50,
    FIRSTBOOK: 150
  };

  // Disable past date
  minDate = new Date();

  // Weekend charges
  get isWeekend(): boolean {
    if (!this.selectedDate) {
      return false;
    }
    const day = this.selectedDate?.getDay();
    return day === 0 || day === 6;
  }

  // Total Amount
  get totalAmount(): number {
    const total = this.bookingAmount + 50 - this.discountAmount;
    return total > 0 ? total : 0;
  }

  onPlayersChange(): void {
    this.calculateAmount();
  }

  applyCoupon(): void {
    const coupon = this.couponCode.trim().toUpperCase();

    if (this.availableCoupons[coupon as keyof typeof this.availableCoupons]) {

      this.discountAmount = this.availableCoupons[coupon as keyof typeof this.availableCoupons];

      this.snackBar.open('Coupon applied successfully', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['success-snackbar']
      })
    } else {

      this.discountAmount = 0;
      this.snackBar.open('Invalid coupon code', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      })
    };
  }
  // Cancel Booking
  cancellationMessage = 'Free cancellation up to 6 hours before the slot.';

  calculateAmount(): void {

    const players = this.selectedPlayers ?? 0;

    let price = this.sportPrices[this.selectedSport] || 0;

    // Group Pricing
    if (players >= 10) {
      price += 500;
    }
    else if (players >= 5) {
      price += 250;
    }

    if (this.isWeekend) {
      price += price * 0.20;
    }

    this.bookingAmount = Math.round(price);
  }

  // Open UPI QR Code
  openQr = false;

  paymentUrl = '';

  openUpiQr() {
    this.selectedPaymentMethod = 'UPI';
    this.paymentUrl = `upi://pay?pa=shreyanshupathi@upi&pn=Shreyanshu Pathi&am=${this.totalAmount}&cu=INR`;
    this.openQr = true;
  }

  closeQr() {
    this.openQr = false;
  }

  onCancelBooking(booking: any): void {

    const bookings = JSON.parse(
      localStorage.getItem('bookings') || '[]'
    );

    const updatedBookings = bookings.filter(
      (b: any) =>
        !(
          b.userEmail === booking.userEmail &&
          b.date === booking.date &&
          b.time === booking.time
        )
    );

    localStorage.setItem(
      'bookings',
      JSON.stringify(updatedBookings)
    );

    this.loadBookings();
  }

  // Confirm Booking
  confirmBooking(): void {

    if (!this.selectedPaymentMethod) {
      this.snackBar.open('PLease select a payment method', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['error-snackBar']
      })
      return;
    }
    this.snackBar.open(`${this.totalAmount} paid succesfully`, 'Close', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    })

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');

    const booking = {
      userEmail: loggedInUser.email,
      username: loggedInUser.name,

      sport: this.selectedSport,
      venue: this.selectedVenue,
      court: this.selectedCourt,
      players: this.selectedPlayers,

      date: this.selectedDate ? new Date(this.selectedDate).toISOString() : '',
      time: this.selectedSlot,

      amount: this.totalAmount,
      paymentMethod: this.selectedPaymentMethod
    };

    const bookings = JSON.parse(
      localStorage.getItem('bookings') || '[]'
    );

    // Existing Bookings
    const bookingExists = bookings.some(
      (b: any) =>
        b.date === this.selectedDate?.toLocaleDateString() &&
        b.time === this.selectedSlot &&
        b.court === this.selectedCourt &&
        b.venue === this.selectedVenue
    );

    if (bookingExists) {
      this.snackBar.open('This slot is already booked', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
      return;
    }



    // Reschedule Booking
    const oldBooking = JSON.parse(localStorage.getItem('rescheduleBooking') || 'null');

    if (oldBooking) {

      const updatedBookings = bookings.filter(
        (b: any) =>
          !(
            b.userEmail === oldBooking.userEmail &&
            b.date === oldBooking.date &&
            b.time === oldBooking.time &&
            b.court === oldBooking.court
          )
      );

      updatedBookings.push(booking);

      localStorage.setItem('bookings', JSON.stringify(updatedBookings));

      localStorage.removeItem('rescheduleBooking');

    } else {
      bookings.push(booking);
      localStorage.setItem('bookings', JSON.stringify(bookings));

    }

    this.loadBookings();

    this.showReviewModal = false;

    this.snackBar.open('Booking Confirmed Successfully', 'Close', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
    this.resetBookingForm();
  }



  // Reset Form
  resetBookingForm(): void {

    this.selectedSport = '';
    this.selectedVenue = '';
    this.selectedCourt = '';
    this.selectedPlayers = null;
    this.selectedDate = null;
    this.selectedSlot = '';
    this.selectedPaymentMethod = '';
    this.bookingAmount = 0;
    this.couponCode = '';
    this.discountAmount = 0;
  }

  // Profile Modal
  openProfileModal(): void {
    // this.showProfileModal = true;
    const dialogRef = this.dialog.open(Dialog, {
      width: '500px',
      disableClose: true,
      data: { ...this.userProfile }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (!result) return;

      this.userProfile = result;
      this.username = result.name;

      const loggedInUser = JSON.parse(
        localStorage.getItem('loggedInUser') || '{}'
      );

      const updatedUser = {
        ...loggedInUser,
        ...result,
        memberSince: this.memberSince
      };

      // Update current session
      localStorage.setItem(
        'loggedInUser',
        JSON.stringify(updatedUser)
      );

      // Update registered users
      const sportUsers = JSON.parse(
        localStorage.getItem('sportUsers') || '[]'
      );

      const index = sportUsers.findIndex(
        (user: any) => user.email === updatedUser.email
      );

      if (index !== -1) {

        sportUsers[index] = {
          ...sportUsers[index],
          ...updatedUser
        };

        localStorage.setItem(
          'sportUsers',
          JSON.stringify(sportUsers)
        );
      }

      console.log('Updated User:', updatedUser);
    });
  }

  // closeProfileModal(): void {
  //   this.showProfileModal = false;
  // }

  // Display Picture
  onImageSelected(event: any): void {

    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.userProfile.image = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  // Logout
  // logout(): void {
  //   localStorage.removeItem('loggedInUser');
  //   this.router.navigate(['/logout']);
  // }
}
