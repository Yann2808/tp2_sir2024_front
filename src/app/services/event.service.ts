import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';
import { AuthService } from './auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class EventService {
    private apiUrl = 'http://localhost:8111/events';

    constructor(private http: HttpClient, private authService: AuthService) {}

    createEvent(event: Event): Observable<Event> {
        const headers = this.authService.getAuthHeaders();

        if (event.date instanceof Date) {
            // Convertir l'objet Date en chaîne de caractères au format ISO sans 'Z'
            const dateString = event.date.toISOString().slice(0, 19); // Retirer 'Z' du format ISO
            // On assigne la chaîne de caractères au champ 'date' avant de l'envoyer
            event.date = dateString as any; // Forcer le type pour contourner le problème
        }
    
        return this.http.post<Event>(`${this.apiUrl}/create`, event, { headers });
    }
    

    getAllEvents(headers: HttpHeaders): Observable<Event[]> {
        return this.http.get<Event[]>(`${this.apiUrl}/all`, { headers });
    }
}