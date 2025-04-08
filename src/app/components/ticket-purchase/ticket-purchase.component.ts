import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TicketService } from '../../services/ticket.service';

@Component({
    selector: 'app-ticket-purchase-component',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './ticket-purchase.component.html',
    styleUrls: ['./ticket-purchase.component.scss']
})
export class TicketPurchaseComponent {
    evenementId: number = 0;
    acheteurId: number = 0;
    nbreTicket: number = 0;

    constructor(private ticketService: TicketService) {}

    purchaseTickets() {
        this.ticketService.purchaseTickets(this.evenementId, this.acheteurId, this.nbreTicket).subscribe({
            next: (tickets) => {
                console.log('Tickets achetés avec succès', tickets);
                alert('Tickets achetés avec succès !');
            },
            error: (error) => {
                console.error('Erreur lors de l’achat des tickets', error);
                alert('Erreur lors de l’achat des tickets');
            }
        });
    }
}