import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Event } from '../../models/event.model';
import { EventService } from '../../services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-list',
  imports: [
    TableModule,
    CommonModule
  ],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss'
})
export class EventListComponent {
  events: Event[] = [];
  successMessage: string | null = null;

  constructor(private eventService: EventService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.successMessage = navigation?.extras.state?.['successMessage'] || null;
  }

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

    if (this.successMessage) {
      setTimeout(() => {
        this.successMessage = null;
      }, 4000);
    }
  }
}
