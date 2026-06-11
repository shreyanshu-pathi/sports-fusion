import { Component } from '@angular/core';
import { MatIconModule  } from '@angular/material/icon';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-activities',
  imports: [RouterLink, MatIconModule ],
  templateUrl: './activities.html',
  styleUrl: './activities.scss',
})
export class Activities {

  activities = [
    'Badminton Championship registrations are now open',
    'Football Knockout Cup starts in 10 days',
    'Weekend Challenge rewards updated',
    'Cricket League prize pool increased'
  ];

  tournaments = [
    {
      title: 'Badminton Championship',
      date: '14 June 2026',
      venue: 'Indoor Arena',
      fee: 200,
      prize: '₹2000'
    },
    {
      title: 'Football Knouckout Cup',
      date: '20 June 2026',
      venue: 'Sports Complex',
      fee: 400,
      prize: '₹3000'
    },
    {
      title: 'Cricket Premier League',
      date: '28 June 2026',
      venue: 'Main Ground',
      fee: 700,
      prize: '₹4000'
    }
  ];

  challenges = [
    {
      title: 'Play 5 matches of any sport',
      reward: '50% Discount Coupon'
    },
    {
      title: 'Book 3 Courts This Week',
      reward: '10% Discount Coupon'
    },
  ]

  trainingSessions = [
    {
      sport: 'Badminton',
      coach: 'Rahul Sharma',
      timing: '6:00 AM - 7:30 AM',
      days: ['Monday', 'Wednesday', 'Friday']
    },
    {
      sport: 'Football',
      coach: 'Arjun Verma',
      timing: '5:00 PM - 7:00 PM',
      days: ['Monday', 'Wednesday', 'Friday']
    },
    {
      sport: 'Tennis',
      coach: 'Priya Singh',
      timing: '7:00 AM - 8:00 AM',
      days: ['Monday', 'Wednesday', 'Friday']
    },
    {
      sport: 'Cricket',
      coach: 'Vikram Reddy',
      timing: '4:30 PM - 6:30 PM',
      days: ['Tuesday', 'Thursday', 'Saturday']
    },
    {
      sport: 'Basketball',
      coach: 'Neha Kapoor',
      timing: '6:00 PM - 7:30 PM',
      days: ['Tuesday', 'Thursday', 'Saturday']
    },
    {
      sport: 'Volleyball',
      coach: 'Sandeep Kumar',
      timing: '5:30 PM - 7:00 PM',
      days: ['Monday', 'Wednesday', 'Friday']
    },
  ]
}
