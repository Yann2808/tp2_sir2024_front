import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

//bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimationsAsync(),
    provideRouter(routes),
    provideHttpClient()
  ]
}).catch(err => console.error(err));