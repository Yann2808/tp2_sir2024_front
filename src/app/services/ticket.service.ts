import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket.model';

@Injectable({
    providedIn: 'root'
})
export class TicketService {
    private apiUrl = 'http://localhost:8111/tickets';

    constructor(private http: HttpClient) {}

    purchaseTickets(evenementId: number, acheteurId: number, nbreTicket: number): Observable<Ticket[]> {
        const params = { evenementId: evenementId.toString(), acheteurId: acheteurId.toString(), nbreTicket: nbreTicket.toString() };
        return this.http.post<Ticket[]>(`${this.apiUrl}/create`, null, { params });
    }

    getTicketsByAcheteur(acheteurId: number): Observable<Ticket[]> {
        return this.http.get<Ticket[]>(`${this.apiUrl}/acheteur/${acheteurId}`);
    }
}