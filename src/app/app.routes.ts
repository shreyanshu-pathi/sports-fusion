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

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'chatbot', component: Chatbot},
    { path: 'gallery', component: Gallery },
    { path: 'about', component: About },
    { path: 'contact', component: Contact },
    { path: 'register', component: Register },
    { path: 'login', component: Login },
    { path: 'dashboard', component: Dashboard },
    { path: 'activities', component: Activities},
    { path: 'logout', component: Logout }
];
