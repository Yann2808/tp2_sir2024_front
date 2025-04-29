import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

// Interface utilisateur mise à jour pour inclure l'ID
interface User {
  id: number;
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8111';
  private currentUser: User | null = null;  // Mise à jour du type de currentUser pour inclure l'ID

  constructor(private http: HttpClient) { }

  // Inscription
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/register`, user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text' as 'json'
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Connexion
  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`${username}:${password}`)
    });
  
    return this.http.post(`${this.apiUrl}/users/login`, {}, { headers }).pipe(
      tap((user: any) => {
        // On stocke manuellement le mot de passe saisi par l'utilisateur
        this.currentUser = { ...user, password };
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
  getCurrentUser(): any {
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

  /// Gestion des erreurs
  private handleError(error: any): Observable<never> {
    let errorMessage = 'Une erreur est survenue';

    // Vérifier si c'est une erreur HTTP avec statut
    if (error.status) {
      if (error.status === 401) {
        errorMessage = 'Identifiants incorrects ou utilisateur non autorisé';
      } else if (error.status === 409) {
        errorMessage = 'Nom d\'utilisateur déjà pris';
      } else if (error.status === 400) {
        errorMessage = 'Requête invalide';
      } else {
        // Pour les autres erreurs HTTP (5xx, etc.)
        errorMessage = `Erreur ${error.status}: ${error.message || 'Erreur serveur'}`;
      }
    } else {
      // Pour les erreurs sans statut (erreurs réseau, erreurs de parsing, etc.)
      errorMessage = `Une erreur est survenue : ${error.message || 'Impossible de communiquer avec le serveur'}`;
    }

    console.error('Auth Service Error:', error); // Log l'erreur originale pour le debug
    return throwError(() => new Error(errorMessage));
  }
}
