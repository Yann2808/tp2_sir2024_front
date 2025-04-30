import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { EventCreateComponent } from './components/event-create/event-create.component';
import { TicketPurchaseComponent } from './components/ticket-purchase/ticket-purchase.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { HomeComponent } from './components/home/home.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'create-event', component: EventCreateComponent },
    { path: 'purchase-tickets/:id', component: TicketPurchaseComponent },
    { path: 'events', component: EventListComponent },
    { path: 'events/:id', component: EventDetailsComponent},
    { path: 'tickets', component:TicketListComponent },
    { path: 'home', component:HomeComponent }
];
