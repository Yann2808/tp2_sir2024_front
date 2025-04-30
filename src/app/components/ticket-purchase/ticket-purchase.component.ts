import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import { AuthService } from '../../services/auth/auth.service';
import { EventService } from '../../services/event.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ticket-purchase',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './ticket-purchase.component.html',
  styleUrl: './ticket-purchase.component.scss'
})

export class TicketPurchaseComponent implements OnInit {
  eventId!: number;
  ticketForm: FormGroup;
  user: any;
  event: any;
  availableTickets: number = 0;
  isLoading: boolean = false;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService,
    private authService: AuthService,
    private eventService: EventService // <-- Injecté ici
  ) {
    this.ticketForm = this.fb.group({
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    // Vérifie si l'utilisateur est connecté et récupère l'ID de l'événement
    this.user = this.authService.getCurrentUser();
    if (!this.user) {
      alert('Vous devez être connecté pour effectuer une réservation.');
      this.router.navigate(['/login']);
      return; // Si l'utilisateur n'est pas connecté, ne continue pas l'exécution
    }
  
    if (this.user.role !== 'UTILISATEUR_PARTICULIER') {
      alert('Seuls les utilisateurs particuliers peuvent acheter des tickets.');
      this.router.navigate(['/events']);
      return;
    }
  
    // Récupérer l'ID de l'événement depuis l'URL
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.eventId = Number(idParam);
        this.loadEventDetails();
      } else {
        alert('ID de l\'événement invalide.');
        this.router.navigate(['/events']);
      }
    });
  }
  

  loadEventDetails(): void {
    this.eventService.getEventById(this.eventId).subscribe({
      next: (data) => {
        this.event = data;
        this.availableTickets = data.placesDisponibles;
      },
      error: () => {
        alert('Erreur lors du chargement de l\'événement.');
        this.router.navigate(['/events']);
      }
    });
  }

  onSubmit(): void {
    if (this.ticketForm.invalid) {
      return;
    }

    const quantity = this.ticketForm.value['quantity'];

    if (quantity > this.availableTickets) {
      alert('Désolé, il n\'y a pas assez de tickets disponibles.');
      return;
    }

    // Ajout d'un spinner fictif
    this.isLoading = true;
    // Appel à la méthode d'achat des tickets
    this.ticketService.purchaseTickets(this.eventId, this.user.id, quantity).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Réservation réussie', response);
        alert('Votre réservation a été effectuée avec succès !');
        this.router.navigate(['/events']);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Erreur lors de l\'achat des tickets', err);
        alert('Une erreur s\'est produite lors de la réservation.');
      }
    });
  }
}
