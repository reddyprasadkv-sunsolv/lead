import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <!-- Ambient Background Lighting Orbs -->
    <div class="ambient-glow glow-1"></div>
    <div class="ambient-glow glow-2"></div>
    <div class="ambient-glow glow-3"></div>

    <!-- Header Navigation -->
    <app-header></app-header>

    <!-- Main Dynamic Route Outlet -->
    <main>
      <router-outlet></router-outlet>
    </main>

    <!-- Footer -->
    <app-footer></app-footer>
  `
})
export class AppComponent {}
