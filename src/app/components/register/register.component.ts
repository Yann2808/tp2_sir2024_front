import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importer CommonModule pour *ngIf
import { FormsModule } from '@angular/forms'; // Importer FormsModule pour ngModel
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true, // Confirmer que c'est un composant standalone
  imports: [CommonModule, FormsModule], // Ajouter les modules nécessaires
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  user = {
    username: '',
    password: '',
    email: '',
    type: 'ORGANISATEUR',
    nomEntreprise: '',
    siret: '',
    nom: '',
    prenom: '',
    adresse: '',
    codePostal: '',
    ville: '',
    telephone: '',
    dateNaissance: ''
  };

  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  register(): void {
    this.errorMessage = null;
    this.successMessage = null;

    const userData = this.user.type === 'ORGANISATEUR' ? {
      username: this.user.username,
      password: this.user.password,
      email: this.user.email,
      type: this.user.type,
      nomEntreprise: this.user.nomEntreprise,
      siret: this.user.siret
    } : {
      username: this.user.username,
      password: this.user.password,
      email: this.user.email,
      type: this.user.type,
      nom: this.user.nom,
      prenom: this.user.prenom,
      adresse: this.user.adresse,
      codePostal: this.user.codePostal,
      ville: this.user.ville,
      telephone: this.user.telephone,
      dateNaissance: this.user.dateNaissance
    };

    this.authService.register(userData).subscribe({
      next: () => {
        this.successMessage = 'Inscription réussie ! Vous pouvez maintenant vous connecter.';

        setTimeout(() => {
          this.router.navigate(['/']);
        }, 3000);
      },
      error: (err) => {
        this.errorMessage = err.message;
      }
    });
  }

  onTypeChange(): void {
    if (this.user.type === 'ORGANISATEUR') {
      this.user.nom = '';
      this.user.prenom = '';
      this.user.adresse = '';
      this.user.codePostal = '';
      this.user.ville = '';
      this.user.telephone = '';
      this.user.dateNaissance = '';
    } else {
      this.user.nomEntreprise = '';
      this.user.siret = '';
    }
  }
}