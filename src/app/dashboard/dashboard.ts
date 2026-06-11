import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, FormsModule, MatDialogModule, MatFormFieldModule,
    MatInputModule, MatDatepickerModule, MatNativeDateModule, MatIconModule, MatSnackBarModule, DatePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {

  images = GALLERY_IMAGES;

  router = inject(Router);
  dialog = inject(MatDialog);
  snackBar = inject(MatSnackBar);

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
    'Jubliee Hills',
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
      // alert('Please complete all booking details');
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
      // alert('Coupon Applied successfully');
    } else {

      this.discountAmount = 0;
      this.snackBar.open('Invalid coupon code', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      })
      // alert('Invalid Coupon Code');
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

    // Weekend Pricing
    // if (this.selectedDate) {
    //   const day = new Date(this.selectedDate).getDay();

    //   const isWeekend = day === 0 || day === 6;

    if (this.isWeekend) {
      price += price * 0.20;
    }

    this.bookingAmount = Math.round(price);
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
      // alert('Please select a payment method');
      return;
    }
    this.snackBar.open(`${this.totalAmount} paid succesfully`, 'Close', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    })
    // alert(`Payment Successfull!\nAmount: ${this.totalAmount}`);

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');

    const booking = {
      userEmail: loggedInUser.email,
      username: loggedInUser.name,

      sport: this.selectedSport,
      venue: this.selectedVenue,
      court: this.selectedCourt,
      players: this.selectedPlayers,

      date: this.selectedDate?.toLocaleDateString(),
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
      const snackRef = this.snackBar.open('This slot is already booked', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
      return;
    }

    bookings.push(booking);

    localStorage.setItem('bookings', JSON.stringify(bookings));

    this.loadBookings();

    this.showReviewModal = false;

    this.snackBar.open('Booking Confirmed Successfully', 'Close', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
    // alert('Booking Confirmed Successfully');

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

      localStorage.setItem('loggedInUser', JSON.stringify({
        ...this.userProfile, memberSince: this.memberSince
      }));
    });
  };

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
  logout(): void {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/logout']);
  }
}
