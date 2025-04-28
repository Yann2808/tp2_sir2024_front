import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], // Ajouter les modules nécessaires
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    this.errorMessage = null;
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/events']);
      },
      error: (err) => {
        this.errorMessage = err.message;
      }
    });
  }
}