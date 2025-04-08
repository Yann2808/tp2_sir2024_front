import { Routes } from '@angular/router';
import { EventCreateComponent } from './components/event-create/event-create.component';
import { TicketPurchaseComponent } from './components/ticket-purchase/ticket-purchase.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';

export const routes: Routes = [
    { path: 'create-event', component: EventCreateComponent },
    { path: 'purchase-tickets', component: TicketPurchaseComponent },
    { path: 'events', component: EventListComponent },
    { path: 'tickets', component:TicketListComponent },
    { path: '', redirectTo: '/create-event', pathMatch: 'full' }
];
