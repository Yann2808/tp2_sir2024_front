import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-event-create',
    standalone: true,
    imports: [
        FormsModule,
        CommonModule,
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
        date: '', // Format attendu : "yyyy-MM-ddTHH:mm"
        lieu: '',
        prix: 0,
        placesDisponibles: 0,
        organisateurId: 0
    };
    submitted = false;

    constructor(
        private eventService: EventService, 
        private router: Router,
        private authService: AuthService
    ) {}

    ngOnInit() {
        const user = this.authService.getCurrentUser();
        // Assurez-vous que l'utilisateur existe et a un id
        if (user && user.id) {
            this.event.organisateurId = user.id; // Utilisation de l'ID de l'utilisateur connecté
        }
    }

    createEvent() {
        this.submitted = true;
        const eventToSend = {
            ...this.event,
            date: this.event.date ? `${this.event.date}:00` : '' // Ajoute les secondes (:00) pour LocalDateTime
        };

        this.eventService.createEvent(eventToSend).subscribe({
            next: (response) => {
                this.router.navigate(['/events'], {
                    state: { successMessage: 'Événement créé avec succès 🎉' }
                });
                this.submitted = false;
            },
            error: (error) => {
                console.error('Erreur lors de la création de l’événement', error);
                alert('Erreur lors de la création de l’événement');
            }
        });


    }
}