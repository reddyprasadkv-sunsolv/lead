import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-why-outcomes',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="outcome-advantage-section" id="whyOutcomeApproach">
      <div class="section-container">
        <div class="section-badge">Outcome-Driven Engineering</div>
        <h2 class="section-title">Why We Focus on <span class="gradient-text">Business Outcomes</span>, Not Jargon</h2>
        <p class="section-subtitle">
          Most agencies ask "What technology stack do you want?" We believe business leaders care about revenue, automation, reliability, and growth.
        </p>

        <div class="comparison-grid">
          <div class="comparison-card conventional">
            <div class="card-header-badge bad">Traditional Web / IT Agency</div>
            <h3 class="comp-title">The "Service Menu" Pitfall</h3>
            <ul class="comp-list">
              <li><i class="fa-solid fa-xmark"></i> Asks client to pick frameworks & cloud servers they shouldn't have to study</li>
              <li><i class="fa-solid fa-xmark"></i> Delivers disconnected code without marketing, CRM, or lead workflows</li>
              <li><i class="fa-solid fa-xmark"></i> Rigid quotes that don't solve real operational bottlenecks</li>
              <li><i class="fa-solid fa-xmark"></i> Generic templates that look like competitors</li>
            </ul>
          </div>

          <div class="comparison-card sunsolv-approach">
            <div class="card-header-badge good">Sunsolv Solution Architecture</div>
            <h3 class="comp-title">The "Outcome Engineering" Model</h3>
            <ul class="comp-list">
              <li><i class="fa-solid fa-check"></i> Starts with your revenue, lead, and efficiency targets</li>
              <li><i class="fa-solid fa-check"></i> Designs complete end-to-end ecosystems: Web + Cloud + AI Automation + Marketing</li>
              <li><i class="fa-solid fa-check"></i> High ROI architecture that scales from 100 to 1,000,000+ users</li>
              <li><i class="fa-solid fa-check"></i> Direct access to solution architects & dedicated project steering</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  `
})
export class WhyOutcomesComponent {}
