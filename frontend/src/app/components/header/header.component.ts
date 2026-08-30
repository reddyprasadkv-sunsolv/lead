import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="site-header" id="siteHeader">
      <div class="header-container">
        <!-- Brand Logo with High-Visibility Emblem Badge -->
        <a routerLink="/" class="brand-logo" id="brandLogo">
          <div class="brand-logo-badge">
            <img 
              src="logo.png" 
              alt="Sunsolv Technologies" 
              class="sunsolv-official-logo"
            />
          </div>
          <div class="brand-text-block">
            <span class="brand-main-name">SUNSOLV</span>
            <span class="brand-sub-name">TECHNOLOGIES</span>
          </div>
        </a>

        <!-- Public Navigation Links (Desktop) -->
        <nav class="nav-links">
          <a href="#digitalAssessmentProduct" class="nav-link">Assessment Platform</a>
          <a href="#whyOutcomeApproach" class="nav-link">Our Approach</a>
          <a href="#servicesCoverage" class="nav-link">Capabilities</a>
          <a href="#clientReviews" class="nav-link">Case Studies</a>
          <a href="#faqSection" class="nav-link">FAQ</a>
        </nav>

        <!-- Right Header Actions -->
        <div class="header-actions">
          <button class="btn btn-header-cta" id="headerCtaBtn" (click)="scrollToFinder()">
            <span>Find Solution</span>
            <i class="fa-solid fa-arrow-right"></i>
          </button>
          <button type="button" class="mobile-menu-toggle" id="mobileMenuToggleBtn" aria-label="Toggle navigation menu" (click)="toggleMobileMenu()">
            <i class="fa-solid" [ngClass]="isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'" id="mobileMenuIcon"></i>
          </button>
        </div>
      </div>

      <!-- Mobile Slide-Down Navigation Menu Drawer -->
      <div class="mobile-nav-drawer" [ngClass]="{ 'open': isMobileMenuOpen }" id="mobileNavDrawer">
        <div class="mobile-nav-content">
          <a href="#digitalAssessmentProduct" class="mobile-nav-link" (click)="closeMobileMenu()">
            <i class="fa-solid fa-graduation-cap"></i>
            <span>Assessment Platform</span>
          </a>
          <a href="#whyOutcomeApproach" class="mobile-nav-link" (click)="closeMobileMenu()">
            <i class="fa-solid fa-lightbulb"></i>
            <span>Our Approach</span>
          </a>
          <a href="#servicesCoverage" class="mobile-nav-link" (click)="closeMobileMenu()">
            <i class="fa-solid fa-layer-group"></i>
            <span>Capabilities</span>
          </a>
          <a href="#clientReviews" class="mobile-nav-link" (click)="closeMobileMenu()">
            <i class="fa-solid fa-star"></i>
            <span>Client Results</span>
          </a>
          <a href="#faqSection" class="mobile-nav-link" (click)="closeMobileMenu()">
            <i class="fa-solid fa-circle-question"></i>
            <span>FAQ</span>
          </a>
          <a routerLink="/crm" class="mobile-nav-link crm-link" (click)="closeMobileMenu()">
            <i class="fa-solid fa-shield-halved"></i>
            <span>Staff CRM Portal</span>
          </a>
          <div class="mobile-nav-actions">
            <button type="button" class="btn btn-mobile-finder" (click)="closeMobileMenu(); scrollToFinder();">
              <i class="fa-solid fa-wand-magic-sparkles"></i>
              <span>Launch Solution Finder</span>
            </button>
            <a href="https://wa.me/919676868607?text=Hello%20Sunsolv%20Team%2C%20I%20would%20like%20to%20connect." target="_blank" class="btn btn-mobile-whatsapp" (click)="closeMobileMenu()">
              <i class="fa-brands fa-whatsapp"></i>
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .site-header {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: rgba(3, 8, 46, 0.94);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(72, 202, 228, 0.22);
      box-shadow: 0 8px 30px rgba(1, 2, 36, 0.6);
    }
  `]
})
export class HeaderComponent {
  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  scrollToFinder() {
    this.isMobileMenuOpen = false;
    const el = document.getElementById('solutionFinderApp');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
}
