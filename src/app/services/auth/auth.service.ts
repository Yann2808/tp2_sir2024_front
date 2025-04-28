import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8111';
  private currentUser: { username: string, password: string } | null = null;

  constructor(private http: HttpClient) { }

  // Inscription
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/register`, user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Connexion
  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`${username}:${password}`) // Encodage Base64 pour HTTP Basic Auth
    });

    // Tester la connexion avec une requête à un endpoint protégé (par ex. GET /events/all)
    return this.http.get(`${this.apiUrl}/events/all`, { headers }).pipe(
      tap(() => {
        // Si la requête réussit, stocker les identifiants
        this.currentUser = { username, password };
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      }),
      catchError(this.handleError)
    );
  }

  // Vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  // Récupérer les identifiants actuels
  getCurrentUser(): { username: string, password: string } | null {
    if (!this.currentUser) {
      const storedUser = localStorage.getItem('currentUser');
      this.currentUser = storedUser ? JSON.parse(storedUser) : null;
    }
    return this.currentUser;
  }

  // Déconnexion
  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  // Ajouter les headers d'authentification pour les requêtes protégées
  getAuthHeaders(): HttpHeaders {
    const user = this.getCurrentUser();
    if (user) {
      return new HttpHeaders({
        'Authorization': 'Basic ' + btoa(`${user.username}:${user.password}`)
      });
    }
    return new HttpHeaders();
  }

  // Gestion des erreurs
  private handleError(error: any): Observable<never> {
    let errorMessage = 'Une erreur est survenue';
    if (error.status === 401) {
      errorMessage = 'Identifiants incorrects ou utilisateur non autorisé';
    } else if (error.status === 409) {
      errorMessage = 'Nom d\'utilisateur déjà pris';
    } else if (error.status === 400) {
      errorMessage = 'Requête invalide';
    }
    return throwError(() => new Error(errorMessage));
  }
}
