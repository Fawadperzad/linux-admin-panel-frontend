import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';  // import withInterceptors
import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth-interceptor';   // if filename is auth-interceptor.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor]))   // register interceptor
  ]
};