import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { Router } from "@angular/router"
import { AuthService } from "../../../services/auth.service"

@Component({
  selector: "app-forgot-password",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div class="w-full max-w-md">
        <!-- Success Message -->
        <div *ngIf="success" class="text-center">
          <div class="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h1 class="text-2xl font-bold text-gray-900 mb-2">Check your email</h1>
            <p class="text-gray-600 mb-6">
              We've sent a password reset link to <strong>{{ email }}</strong>
            </p>
            <div class="space-y-3">
              <button
                (click)="goToLogin()"
                class="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors w-full"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path>
                </svg>
                Back to sign in
              </button>
              <button
                (click)="tryAgain()"
                class="text-blue-600 hover:text-blue-800 font-medium text-sm"
              >
                Didn't receive the email? Try again
              </button>
            </div>
          </div>
        </div>

        <!-- Reset Form -->
        <div *ngIf="!success">
          <!-- Logo and Header -->
          <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Reset Password</h1>
            <p class="text-gray-600">Enter your email to receive a password reset link</p>
          </div>

          <div class="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <form (ngSubmit)="onSubmit()" #resetForm="ngForm" class="space-y-6">
              <!-- Error Message -->
              <div *ngIf="error" class="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
                <svg class="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <p class="text-red-700 text-sm">{{ error }}</p>
              </div>

              <!-- Email Field -->
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    [(ngModel)]="email"
                    (input)="clearError()"
                    class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                [disabled]="isLoading"
                class="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <div *ngIf="isLoading" class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>{{ isLoading ? 'Sending reset link...' : 'Send reset link' }}</span>
                <svg *ngIf="!isLoading" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </button>
            </form>

            <!-- Back to Login -->
            <div class="mt-8 pt-6 border-t border-gray-200 text-center">
              <button
                (click)="goToLogin()"
                class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path>
                </svg>
                Back to sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./forgot-password.component.css"],
})
export class ForgotPasswordComponent {
  isLoading = false
  error = ""
  success = false
  email = ""

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  clearError(): void {
    if (this.error) {
      this.error = ""
    }
  }

  onSubmit(): void {
    this.isLoading = true
    this.error = ""

    this.authService.forgotPassword(this.email).subscribe({
      next: (response) => {
        this.success = true
      },
      error: (error) => {
        this.error = "Failed to send reset email. Please check your email address and try again."
        this.isLoading = false
      },
      complete: () => {
        this.isLoading = false
      },
    })
  }

  goToLogin(): void {
    this.router.navigate(["/login"])
  }

  tryAgain(): void {
    this.success = false
    this.email = ""
  }
}
