import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket.model';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = 'http://localhost:8111/tickets';

  constructor(private http: HttpClient, private authService: AuthService) {}

  purchaseTickets(evenementId: number, acheteurId: number, nbreTicket: number): Observable<Ticket[]> {
    const body = {
      evenementId: evenementId,
      acheteurId: acheteurId,
      nbreTicketVoulu: nbreTicket
    };

    const headers = this.authService.getAuthHeaders();
  
    return this.http.post<Ticket[]>(`${this.apiUrl}/purchase`, body, { headers }); // Envoie du headers et des données dans le corps de la requête POST
  }
  

    getTicketsByAcheteur(acheteurId: number): Observable<Ticket[]> {
        return this.http.get<Ticket[]>(`${this.apiUrl}/acheteur/${acheteurId}`);
    }
}