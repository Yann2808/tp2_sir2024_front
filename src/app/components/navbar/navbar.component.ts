import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; // <-- Importer Router
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth/auth.service'; // <-- Importer AuthService

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [CommonModule, RouterModule, ButtonModule]
})
export class NavbarComponent {
  isMenuOpen = false; // Probablement pas nécessaire pour le toggle Bootstrap standard, mais on peut le laisser.

  // Injecter AuthService et Router
  constructor(public authService: AuthService, private router: Router) { } // <-- Modifier le constructeur (authService est public car utilisé dans le template)

  logout(): void {
    this.authService.logout(); // Appelle la méthode de déconnexion du service
    this.router.navigate(['/login']); // Redirige l'utilisateur vers la page de connexion après déconnexion
    // Ou redirige vers la page d'accueil si tu préfères : this.router.navigate(['/']);
  }
}