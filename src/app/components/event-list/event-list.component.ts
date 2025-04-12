import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Event } from '../../models/event.model';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-list',
  imports: [TableModule],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss'
})
export class EventListComponent {
  events: Event[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit() {
    // On appelle la méthode du service pour récupérer les évènements depuis l'API
    this.eventService.getAllEvents().subscribe ({
      next: (data) => {
        this.events = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des évènelents',err);
      }

      // possible d'ajouter une toast en rouge au lieu de la console
    });
  }
}
