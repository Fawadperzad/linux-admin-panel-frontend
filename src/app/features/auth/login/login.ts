import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private authService = inject(AuthService);

  username = '';
  password = '';
  rememberMe = false;
  isSubmitting = false;
  errorMessage = '';

  onSubmit(): void {
    if (!this.username.trim()) {
      this.errorMessage = 'Please enter your username.';
      return;
    }

    if (!this.password) {
      this.errorMessage = 'Please enter your password.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: () => {
        this.isSubmitting = false;
      },
      error: () => {
        this.isSubmitting = false;
        this.errorMessage = 'Login failed. Please try again.';
      }
    });
  }
}
