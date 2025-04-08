import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-event-create',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    InputTextModule,
    DatePickerModule,
    InputNumberModule
  ],
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss']
})
export class EventCreateComponent {
  event: Event = {
    nom: '',
    description: '',
    date: new Date(),
    lieu: '',
    prix: 0,
    placesDisponibles: 0,
    organisateurId: 0
  };



  constructor(private eventService: EventService) {

  }

  createEvent() {
    const eventToSend = {
      ...this.event,
      date: this.formatDate(this.event.date) // Pour formater la date pour le back
    };

    this.eventService.createEvent(this.event).subscribe({
      next: (response) => {
        console.log('Événement créé avec succès', response);
        alert('Événement créé avec succès !');
      },
      error: (error) => {
        console.error('Erreur lors de la création de l’événement', error);
        alert('Erreur lors de la création de l’événement');
      }
    });
  }

  private formatDate(date: Date): string {
    const d = new Date();
    const day = String(d.getDay());
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Mois 1 à 12
    const year = d.getFullYear();
    return `${month}/${year}`;
  }
}