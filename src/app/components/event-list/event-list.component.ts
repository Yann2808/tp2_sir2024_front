import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Event } from '../../models/event.model';
import { EventService } from '../../services/event.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

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
  userEvents: Event[] = [];
  otherEvents: Event[] = [];

  successMessage: string | null = null;

  constructor(private eventService: EventService, private router: Router, private authService: AuthService) {
    const navigation = this.router.getCurrentNavigation();
    this.successMessage = navigation?.extras.state?.['successMessage'] || null;
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  ngOnInit() {
    const user = this.authService.getCurrentUser();
  
    if (user) {
      const headers = this.authService.getAuthHeaders();
      this.loadEvents(headers);
    } else {
      // Attendre un court instant que le localStorage charge
      setTimeout(() => {
        const delayedUser = this.authService.getCurrentUser();
        if (delayedUser) {
          const headers = this.authService.getAuthHeaders();
          this.loadEvents(headers);
        } else {
          console.error("Utilisateur non connecté ou headers non disponibles.");
        }
      }, 300); // tu peux adapter ce délai
    }
  
    if (this.successMessage) {
      setTimeout(() => {
        this.successMessage = null;
      }, 4000);
    }
  }
  
  private loadEvents(headers: any) {
    this.eventService.getAllEvents(headers).subscribe({
      next: (data) => {
        this.events = data;

        const currentUser = this.authService.getCurrentUser();
        if (currentUser) {
          this.userEvents = data.filter(event => event.organisateurId === currentUser.id);
          this.otherEvents = data.filter(event => event.organisateurId !== currentUser.id);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des événements', err);
      }
    });
  }
}
