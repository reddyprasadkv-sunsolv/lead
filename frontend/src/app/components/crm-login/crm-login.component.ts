import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-crm-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="login-page-container">
      <div class="login-glass-card">
        
        <!-- Header & Brand -->
        <div class="login-brand-header">
          <a routerLink="/" class="login-logo-link" title="Return to Public Site">
            <img src="logo.png" alt="Sunsolv Technologies" class="login-logo-img" />
          </a>
          <div class="login-badge">
            <i class="fa-solid fa-shield-halved"></i>
            <span>Internal Staff & Lead CRM Portal</span>
          </div>
          <h1 class="login-heading">Sales CRM Authentication</h1>
          <p class="login-subheading">Enter your authorized corporate credentials to access customer enquiries, blueprints, and sales pipeline.</p>
        </div>

        <!-- Error Message Alert -->
        <div class="login-alert-box error" *ngIf="errorMessage()">
          <i class="fa-solid fa-triangle-exclamation"></i>
          <span>{{ errorMessage() }}</span>
        </div>

        <!-- Success Message Alert -->
        <div class="login-alert-box success" *ngIf="successMessage()">
          <i class="fa-solid fa-circle-check"></i>
          <span>{{ successMessage() }}</span>
        </div>

        <!-- Login Form -->
        <form class="login-form" (ngSubmit)="handleLogin()">
          <div class="form-group">
            <label class="form-label" for="loginEmail">
              <i class="fa-solid fa-envelope"></i>
              <span>Corporate Email</span>
            </label>
            <div class="input-container">
              <input 
                type="email" 
                id="loginEmail" 
                [(ngModel)]="email" 
                name="email" 
                class="login-input" 
                placeholder="e.g. admin@sunsolv.in" 
                required 
                autocomplete="username"
              />
            </div>
          </div>

          <div class="form-group">
            <div class="password-label-row">
              <label class="form-label" for="loginPassword">
                <i class="fa-solid fa-lock"></i>
                <span>Password</span>
              </label>
            </div>
            <div class="input-container password-container">
              <input 
                [type]="showPassword() ? 'text' : 'password'" 
                id="loginPassword" 
                [(ngModel)]="password" 
                name="password" 
                class="login-input" 
                placeholder="Enter your secure password" 
                required 
                autocomplete="current-password"
              />
              <button 
                type="button" 
                class="btn-toggle-pwd" 
                (click)="togglePasswordVisibility()" 
                [title]="showPassword() ? 'Hide password' : 'Show password'"
              >
                <i class="fa-solid" [class.fa-eye]="!showPassword()" [class.fa-eye-slash]="showPassword()"></i>
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            class="btn-login-submit" 
            [disabled]="isLoading()"
          >
            <i class="fa-solid" [class.fa-right-to-bracket]="!isLoading()" [class.fa-spinner]="isLoading()" [class.fa-spin]="isLoading()"></i>
            <span>{{ isLoading() ? 'Verifying Security Token...' : 'Sign In to Sales CRM' }}</span>
          </button>
        </form>

        <!-- Pre-Configured Secure Credentials Quick Reference -->
        <div class="credentials-helper-card">
          <div class="helper-header">
            <i class="fa-solid fa-key"></i>
            <span>Authorized Enterprise Accounts</span>
          </div>

          <div class="accounts-grid">
            <div class="account-item" (click)="fillCredentials('admin@sunsolv.in', 'Sunsolv@2026Secure!')">
              <div class="account-top">
                <span class="role-badge admin">Super Admin</span>
                <span class="click-hint"><i class="fa-solid fa-arrow-pointer"></i> Auto-fill</span>
              </div>
              <div class="acc-row"><strong>Email:</strong> <code>admin&#64;sunsolv.in</code></div>
              <div class="acc-row"><strong>Password:</strong> <code>Sunsolv&#64;2026Secure!</code></div>
            </div>

            <div class="account-item" (click)="fillCredentials('consultant@sunsolv.in', 'Sunsolv#Advisory2026')">
              <div class="account-top">
                <span class="role-badge consultant">Solution Architect</span>
                <span class="click-hint"><i class="fa-solid fa-arrow-pointer"></i> Auto-fill</span>
              </div>
              <div class="acc-row"><strong>Email:</strong> <code>consultant&#64;sunsolv.in</code></div>
              <div class="acc-row"><strong>Password:</strong> <code>Sunsolv#Advisory2026</code></div>
            </div>
          </div>
        </div>

        <!-- Security Footer -->
        <div class="login-footer">
          <div class="sec-guarantee">
            <i class="fa-solid fa-lock"></i>
            <span>Protected by 256-Bit PBKDF2 & Cryptographic Token Authentication · Sunsolv HQ Hyderabad</span>
          </div>
          <a routerLink="/" class="back-link">
            <i class="fa-solid fa-arrow-left"></i> Back to Public Website
          </a>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .login-page-container {
      min-height: 100vh;
      background: radial-gradient(circle at 50% 10%, #023e8a 0%, #03045e 50%, #010224 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 20px;
    }
    .login-glass-card {
      width: 100%;
      max-width: 540px;
      background: rgba(3, 16, 68, 0.75);
      border: 1px solid rgba(72, 202, 228, 0.3);
      border-radius: 24px;
      padding: 44px 40px;
      backdrop-filter: blur(25px);
      box-shadow: 0 20px 60px rgba(1, 2, 36, 0.8), 0 0 40px rgba(0, 180, 216, 0.15);
    }
    .login-brand-header {
      text-align: center;
      margin-bottom: 28px;
    }
    .login-logo-link {
      display: inline-block;
      margin-bottom: 16px;
      background: #ffffff;
      padding: 10px 20px;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
      transition: transform 0.2s ease;
    }
    .login-logo-link:hover {
      transform: scale(1.03);
    }
    .login-logo-img {
      height: 60px;
      width: auto;
      max-width: 220px;
      display: block;
      object-fit: contain;
    }
    .login-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 12px;
      background: rgba(0, 119, 182, 0.3);
      border: 1px solid rgba(72, 202, 228, 0.4);
      border-radius: 100px;
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--c-cyan-300);
      margin-bottom: 12px;
    }
    .login-heading {
      font-size: 1.8rem;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 6px;
      letter-spacing: -0.3px;
    }
    .login-subheading {
      font-size: 0.88rem;
      color: var(--c-cyan-200);
      line-height: 1.5;
    }
    .login-alert-box {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      border-radius: 10px;
      font-size: 0.88rem;
      margin-bottom: 20px;
      animation: fadeIn 0.3s ease;
    }
    .login-alert-box.error {
      background: rgba(239, 68, 68, 0.2);
      border: 1px solid rgba(239, 68, 68, 0.5);
      color: #fca5a5;
    }
    .login-alert-box.success {
      background: rgba(16, 185, 129, 0.2);
      border: 1px solid rgba(16, 185, 129, 0.5);
      color: #6ee7b7;
    }
    .login-form {
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .form-label {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--c-cyan-200);
    }
    .form-label i {
      color: var(--c-cyan-400);
      width: 14px;
    }
    .input-container {
      position: relative;
    }
    .login-input {
      width: 100%;
      background: rgba(1, 2, 36, 0.65);
      border: 1px solid rgba(72, 202, 228, 0.3);
      border-radius: 10px;
      padding: 12px 16px;
      color: #ffffff;
      font-size: 0.95rem;
      outline: none;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }
    .login-input:focus {
      border-color: var(--c-cyan-400);
      box-shadow: 0 0 12px rgba(0, 180, 216, 0.4);
    }
    .password-container .login-input {
      padding-right: 46px;
    }
    .btn-toggle-pwd {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: var(--c-cyan-300);
      cursor: pointer;
      font-size: 1rem;
      padding: 4px;
    }
    .btn-toggle-pwd:hover {
      color: #ffffff;
    }
    .btn-login-submit {
      margin-top: 8px;
      background: linear-gradient(135deg, var(--c-blue-600), var(--c-cyan-500));
      color: var(--c-navy-900);
      border: none;
      border-radius: 10px;
      padding: 14px 20px;
      font-size: 1rem;
      font-weight: 800;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      box-shadow: 0 4px 18px rgba(0, 180, 216, 0.4);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .btn-login-submit:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 24px rgba(0, 180, 216, 0.6);
    }
    .btn-login-submit:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
    .credentials-helper-card {
      margin-top: 28px;
      background: rgba(2, 62, 138, 0.25);
      border: 1px solid rgba(72, 202, 228, 0.25);
      border-radius: 14px;
      padding: 16px;
    }
    .helper-header {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.8rem;
      font-weight: 800;
      color: var(--c-cyan-300);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 12px;
    }
    .accounts-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    .account-item {
      background: rgba(1, 2, 36, 0.55);
      border: 1px solid rgba(72, 202, 228, 0.2);
      border-radius: 10px;
      padding: 12px;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .account-item:hover {
      background: rgba(0, 119, 182, 0.35);
      border-color: var(--c-cyan-400);
      transform: translateY(-2px);
    }
    .account-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 6px;
    }
    .role-badge {
      font-size: 0.7rem;
      font-weight: 800;
      padding: 2px 8px;
      border-radius: 6px;
    }
    .role-badge.admin {
      background: rgba(239, 68, 68, 0.25);
      color: #fca5a5;
      border: 1px solid rgba(239, 68, 68, 0.4);
    }
    .role-badge.consultant {
      background: rgba(59, 130, 246, 0.25);
      color: #93c5fd;
      border: 1px solid rgba(59, 130, 246, 0.4);
    }
    .click-hint {
      font-size: 0.68rem;
      color: var(--c-cyan-300);
    }
    .acc-row {
      font-size: 0.76rem;
      color: var(--c-cyan-100);
      margin-bottom: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .acc-row code {
      color: #ffffff;
      background: rgba(0, 0, 0, 0.3);
      padding: 1px 4px;
      border-radius: 4px;
      font-size: 0.72rem;
    }
    .login-footer {
      margin-top: 24px;
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 12px;
      align-items: center;
    }
    .sec-guarantee {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.75rem;
      color: var(--c-cyan-300);
    }
    .back-link {
      font-size: 0.85rem;
      color: var(--c-cyan-300);
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: color 0.2s ease;
    }
    .back-link:hover {
      color: #ffffff;
      text-decoration: underline;
    }
    @media (max-width: 600px) {
      .login-glass-card { padding: 28px 20px; }
      .accounts-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class CrmLoginComponent implements OnInit {
  email = 'admin@sunsolv.in';
  password = '';
  showPassword = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');
  successMessage = signal<string>('');
  returnUrl = '/crm';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private seo: SeoService
  ) {}

  ngOnInit() {
    this.seo.setMetaTags({
      title: 'Sales CRM Staff Portal | Sunsolv Technologies',
      description: 'Secure staff login portal for Sunsolv Technologies Sales CRM & Lead Management.',
      url: 'https://sunsolv.com/crm/login'
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/crm';

    // If already logged in, redirect immediately to CRM dashboard
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl(this.returnUrl);
    }
  }

  togglePasswordVisibility() {
    this.showPassword.update(v => !v);
  }

  fillCredentials(e: string, p: string) {
    this.email = e;
    this.password = p;
    this.errorMessage.set('');
  }

  handleLogin() {
    if (!this.email || !this.password) {
      this.errorMessage.set('Please enter both corporate email and password.');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.successMessage.set('Authentication verified. Redirecting to CRM Dashboard...');
        setTimeout(() => {
          this.router.navigateByUrl(this.returnUrl);
        }, 400);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.message || 'Invalid credentials. Please verify your email and password.');
      }
    });
  }
}
