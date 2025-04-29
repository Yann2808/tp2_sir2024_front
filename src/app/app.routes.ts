import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { EventCreateComponent } from './components/event-create/event-create.component';
import { TicketPurchaseComponent } from './components/ticket-purchase/ticket-purchase.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'create-event', component: EventCreateComponent },
    { path: 'purchase-tickets', component: TicketPurchaseComponent },
    { path: 'events', component: EventListComponent },
    { path: 'tickets', component:TicketListComponent },
    { path: 'home', component:HomeComponent }
];
