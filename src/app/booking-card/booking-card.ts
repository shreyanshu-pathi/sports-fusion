import { DatePipe } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-booking-card',
  imports: [DatePipe],
  templateUrl: './booking-card.html',
  styleUrl: './booking-card.scss',
})
export class BookingCard {
  @Input() booking: any;
  @Output() cancelBooking = new EventEmitter<any>();

  cancel(): void {
    this.cancelBooking.emit(this.booking);
  }
}
