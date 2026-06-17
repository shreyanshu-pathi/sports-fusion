import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Register } from './register/register';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { Gallery } from './gallery/gallery';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { Logout } from './logout/logout';
import { Activities } from './activities/activities';
import { Chatbot } from './chatbot/chatbot';
import { BookingHistory } from './booking-history/booking-history';
import { Admin } from './admin/admin';
import { Admindashboard } from './admindashboard/admindashboard';
import { AdminUsers } from './admin-users/admin-users';
import { AdminBookings } from './admin-bookings/admin-bookings';
import { AdminRevenue } from './admin-revenue/admin-revenue';
import { AdminLogin } from './admin-login/admin-login';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'chatbot', component: Chatbot},
    { path: 'gallery', component: Gallery },
    { path: 'about', component: About },
    { path: 'contact', component: Contact },
    { path: 'register', component: Register },
    { path: 'login', component: Login },
    { path: 'admin-login', component: AdminLogin },
    { path: 'dashboard', component: Dashboard, 
        // children: [
        //     { path: 'bookinghistory', component: BookingHistory },
        // ]
     },
    { path: 'bookinghistory', component: BookingHistory },
    { path: 'admin', component: Admin, 
        children: [
            { path: '', redirectTo: 'admindashboard', pathMatch: 'full' },
            { path: 'admindashboard', component: Admindashboard },
            { path: 'adminusers', component: AdminUsers },
            { path:'adminbookings', component: AdminBookings },
            { path: 'adminrevenue', component: AdminRevenue }
        ]
    },
    { path: 'activities', component: Activities},
    { path: 'logout', component: Logout }
];
