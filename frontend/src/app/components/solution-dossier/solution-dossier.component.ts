import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolutionService } from '../../services/solution.service';

@Component({
  selector: 'app-solution-dossier',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="solution-dossier-card" id="solutionDossier" *ngIf="dossier()">
      
      <!-- Dossier Top Header -->
      <div class="dossier-header-banner">
        <div class="dossier-status-pill">
          <span class="pulse-dot"></span>
          <span>Tailored Solution Blueprint Generated</span>
        </div>
        <h2 class="dossier-greeting">
          Thank you, <span class="highlight-name">{{ dossier()?.contact?.name || 'Valued Partner' }}</span>. We understand what you're looking for.
        </h2>
        <p class="dossier-subtitle">
          Based on your business profile and growth targets, our solution architects have mapped out your recommended technical and strategic roadmap.
        </p>
      </div>

      <!-- High-Level Executive Summary Grid -->
      <div class="dossier-summary-grid">
        <div class="dossier-summary-card">
          <div class="summary-icon"><i class="fa-solid fa-bullseye"></i></div>
          <div class="summary-details">
            <span class="summary-label">Your Objective</span>
            <strong class="summary-val">{{ primaryGoals() }}</strong>
          </div>
        </div>

        <div class="dossier-summary-card">
          <div class="summary-icon"><i class="fa-solid fa-compass-drafting"></i></div>
          <div class="summary-details">
            <span class="summary-label">Recommended Direction</span>
            <strong class="summary-val">{{ dossier()?.solutionBlueprint?.direction }}</strong>
          </div>
        </div>

        <div class="dossier-summary-card">
          <div class="summary-icon"><i class="fa-solid fa-building-flag"></i></div>
          <div class="summary-details">
            <span class="summary-label">Business Context</span>
            <strong class="summary-val">{{ dossier()?.profile?.businessStage }} · {{ dossier()?.profile?.industry }}</strong>
          </div>
        </div>

        <div class="dossier-summary-card">
          <div class="summary-icon"><i class="fa-solid fa-clock-rotate-left"></i></div>
          <div class="summary-details">
            <span class="summary-label">Target Timeline</span>
            <strong class="summary-val">{{ dossier()?.timeline }}</strong>
          </div>
        </div>
      </div>

      <!-- Main Recommended Package Blueprint -->
      <div class="recommended-blueprint-box">
        <div class="blueprint-header-row">
          <div class="blueprint-badge">Recommended Solution Package</div>
          <h3 class="blueprint-title">{{ dossier()?.solutionBlueprint?.packageTitle }}</h3>
          <p class="blueprint-desc">{{ dossier()?.solutionBlueprint?.packageDesc }}</p>
        </div>

        <div class="blueprint-columns">
          <!-- Modules Breakdown -->
          <div class="blueprint-col">
            <h4 class="col-title"><i class="fa-solid fa-layer-group"></i> Recommended Solution Modules</h4>
            <ul class="solution-modules-list">
              <li *ngFor="let mod of dossier()?.solutionBlueprint?.modules">
                <i class="fa-solid fa-circle-check"></i>
                <span>{{ mod }}</span>
              </li>
            </ul>
          </div>

          <!-- Impact Deliverables -->
          <div class="blueprint-col">
            <h4 class="col-title"><i class="fa-solid fa-chart-pie"></i> Projected Impact & Deliverables</h4>
            <div class="impact-cards-stack">
              <div class="impact-card" *ngFor="let imp of dossier()?.solutionBlueprint?.impacts">
                <div class="impact-icon"><i class="fa-solid fa-chart-line-up"></i></div>
                <div class="impact-text-group">
                  <strong>{{ imp.title }}</strong>
                  <span>{{ imp.desc }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Consultant Notice Box -->
        <div class="consultant-notice-box">
          <div class="consultant-avatar-group">
            <div class="avatar-circle"><i class="fa-solid fa-user-tie"></i></div>
          </div>
          <div class="consultant-notice-text">
            <strong>Dedicated Solution Consultant Assigned</strong>
            <p>One of our senior technology consultants will review your requirement brief and reach out within 2–4 business hours with an architectural breakdown.</p>
          </div>
        </div>

        <!-- Action Bar -->
        <div class="dossier-action-bar">
          <button class="btn btn-consultation-cta glow-button" (click)="openBookingModal()">
            <i class="fa-solid fa-calendar-days"></i>
            <span>Schedule a Consultation</span>
          </button>

          <a [href]="whatsAppUrl()" target="_blank" class="btn btn-whatsapp-cta">
            <i class="fa-brands fa-whatsapp"></i>
            <span>WhatsApp Solution Team</span>
          </a>

          <button class="btn btn-download-brief" (click)="printBlueprint()">
            <i class="fa-solid fa-file-arrow-down"></i>
            <span>Print / Save Blueprint</span>
          </button>

          <button class="btn btn-restart-finder" (click)="restartFinder()">
            <i class="fa-solid fa-arrow-rotate-left"></i>
            <span>Refine Responses</span>
          </button>
        </div>

      </div>

    </div>
  `
})
export class SolutionDossierComponent {
  dossier = this.solutionService.activeDossier;

  primaryGoals = computed(() => {
    const goals = this.dossier()?.goals || [];
    return goals.length > 0 ? goals.slice(0, 3).join(', ') : 'Accelerate growth and modernize systems';
  });

  whatsAppUrl = computed(() => {
    const d = this.dossier();
    if (!d) return '#';
    const text = encodeURIComponent(
      `Hello Sunsolv Team! My name is ${d.contact?.name || 'Client'} from ${d.contact?.company || 'our company'}.\n\nI just generated our business solution blueprint for "${d.solutionBlueprint?.packageTitle}".\n\nIndustry: ${d.profile?.industry}\nObjective: ${d.goals?.join(', ')}\nTimeline: ${d.timeline}\n\nI'd like to discuss the next steps with a Solution Consultant.`
    );
    return `https://wa.me/919676868607?text=${text}`;
  });

  constructor(public solutionService: SolutionService) {}

  openBookingModal() {
    this.solutionService.isBookingModalOpen.set(true);
  }

  printBlueprint() {
    window.print();
  }

  restartFinder() {
    this.solutionService.activeDossier.set(null);
  }
}
