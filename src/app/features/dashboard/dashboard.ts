import { Component, inject } from '@angular/core';
import { AuthService } from '../../features/auth/services/auth';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  readonly authService = inject(AuthService);
}
