import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact',
  imports: [RouterLink],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  
activeFaq: number | null = null;

toggleFaq(index: number) {
  this.activeFaq = this.activeFaq === index ? null : index;
}

  faqs = [
    {
      question: 'How do I book a slot?',
      answer: 'Login to your account, select your preferred sport, venue, court, number of players, date, and time slot. Review the details and confirm the booking.'
    },
    {
      question: 'Can I cancel a booking?',
      answer: 'Yes. You can view your bookings in the dashboard and cancel eligible bookings before the scheduled time.'
    },
    {
      question: 'Can multiple players use one booking?',
      answer: 'Yes. Specify the number of players during booking.'
    },
    {
      question: 'How do I know if a slot is available?',
      answer: 'The dashboard displays booked slots, helping you choose an available date and time.'
    },
    {
      question: 'Are there age or weight restrictions?',
      answer: 'Most sports do not have strict restrictions. Certain tournaments may have age-based categories.'
    },
    {
      question: 'What are the entry fees and packages?',
      answer: 'Fees vary by sport, venue, duration, and facilities selected. Membership plans and discounts may also be available.'
    }
  ];

}
