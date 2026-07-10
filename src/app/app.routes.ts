import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login').then(m => m.Login)   // no .component
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register').then(m => m.Register)  // no .component
  },

  // Placeholder for dashboard – we’ll fix in step 2
    { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard').then(m => m.Dashboard) },
  
  { path: '**', redirectTo: '/login' }
];