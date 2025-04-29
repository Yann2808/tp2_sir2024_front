import { Injectable, inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authService = inject(AuthService); // ✅ façon propre en standalone

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authService.getCurrentUser();

    if (currentUser) {
      const authHeader = 'Basic ' + btoa(`${currentUser.username}:${currentUser.password}`);
      const authReq = req.clone({
        setHeaders: {
          Authorization: authHeader
        }
      });
      return next.handle(authReq);
    }

    return next.handle(req);
  }
}
