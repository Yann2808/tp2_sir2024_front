import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';

@Injectable({
    providedIn: 'root'
})
export class EventService {
    private apiUrl = 'http://localhost:8111/events';

    constructor(private http: HttpClient) {}

    //createEvent(event: Event): Observable<Event> {

        //  On formate la date
     //   if (event.date instanceof Date) {
            // On vérifie si la date contient 'Z' et on le retire si nécessaire
       //     event.date = event.date.toISOString().slice(0, 19);  // Enlève le 'Z' si présent
      //  }
       // return this.http.post<Event>(`${this.apiUrl}/create`, event);
   // }

    createEvent(event: Event): Observable<Event> {
        if (event.date instanceof Date) {
            // Convertir l'objet Date en chaîne de caractères au format ISO sans 'Z'
            const dateString = event.date.toISOString().slice(0, 19); // Retirer 'Z' du format ISO
            // On assigne la chaîne de caractères au champ 'date' avant de l'envoyer
            event.date = dateString as any; // Forcer le type pour contourner le problème
        }
    
        return this.http.post<Event>(`${this.apiUrl}/create`, event);
    }
    

    getAllEvents(): Observable<Event[]> {
        return this.http.get<Event[]>(`${this.apiUrl}/all`);
    }
}