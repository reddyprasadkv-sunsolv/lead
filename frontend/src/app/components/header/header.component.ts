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
        <!-- Brand Logo with Attached Official Artwork -->
        <a routerLink="/" class="brand-logo" id="brandLogo">
          <img 
            src="logo.png" 
            alt="Sunsolv Technologies" 
            class="sunsolv-official-logo"
          />
        </a>

        <!-- Public Navigation Links -->
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
        </div>
      </div>
    </header>
  `,
  styles: [`
    .sunsolv-official-logo {
      height: 76px;
      width: auto;
      max-width: 280px;
      object-fit: contain;
      display: block;
      transition: transform 0.2s ease;
      filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.06));
    }
    .sunsolv-official-logo:hover {
      transform: scale(1.03);
    }
    @media (max-width: 768px) {
      .sunsolv-official-logo {
        height: 58px;
      }
    }
  `]
})
export class HeaderComponent {
  scrollToFinder() {
    const el = document.getElementById('solutionFinderApp');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
}
