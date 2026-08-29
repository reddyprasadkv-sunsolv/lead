import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-digital-assessment',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="assessment-spotlight-section" id="digitalAssessmentProduct">
      <div class="spotlight-container">
        
        <!-- Section Header Badge -->
        <div class="spotlight-header text-center">
          <div class="product-origin-badge">
            <i class="fa-solid fa-graduation-cap"></i>
            <span>Proprietary Sunsolv Product</span>
          </div>
          <h2 class="spotlight-title">
            Sunsolv Digital Assessment Platform
          </h2>
          <p class="spotlight-subtitle">
            A unified, connected digital assessment ecosystem engineered for <strong>Schools, Colleges, Universities, Coaching Centres & Training Academies</strong>—bringing administrators, faculty, and students into one clear, structured workflow.
          </p>
          
          <div class="spotlight-cta-row">
            <a href="https://digitalassessment.sunsolv.in/" target="_blank" rel="noopener noreferrer" class="btn btn-product-live">
              <span>Explore Live Platform</span>
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
            <button type="button" class="btn btn-product-blueprint" (click)="scrollToFinder()">
              <i class="fa-solid fa-wand-magic-sparkles"></i>
              <span>Get Implementation Blueprint</span>
            </button>
          </div>
        </div>

        <!-- 3 Core Pillars -->
        <div class="pillars-grid">
          <!-- Pillar 1: Admin Experience -->
          <div class="pillar-card admin">
            <div class="pillar-icon-box">
              <i class="fa-solid fa-sliders"></i>
            </div>
            <div class="pillar-role">Administrator & Faculty</div>
            <h3>Structured Institution Operations</h3>
            <p>Complete control over institution structure, branches, team roles, assessment schedules, and real-time activity oversight.</p>
            <ul class="pillar-feature-list">
              <li><i class="fa-solid fa-check"></i> Multi-branch & department hierarchy</li>
              <li><i class="fa-solid fa-check"></i> Role-based team access & coordinators</li>
              <li><i class="fa-solid fa-check"></i> Question bank management & timed tests</li>
              <li><i class="fa-solid fa-check"></i> Real-time student participation tracking</li>
            </ul>
          </div>

          <!-- Pillar 2: Student Journey -->
          <div class="pillar-card student">
            <div class="pillar-icon-box">
              <i class="fa-solid fa-user-graduate"></i>
            </div>
            <div class="pillar-role">Student Experience</div>
            <h3>Calm, Distraction-Free Flow</h3>
            <p>A guided, reassuring interface that keeps the next action obvious and minimizes exam anxiety from access to submission.</p>
            <ul class="pillar-feature-list">
              <li><i class="fa-solid fa-check"></i> One-click assigned assessment access</li>
              <li><i class="fa-solid fa-check"></i> Clean question view & auto-save</li>
              <li><i class="fa-solid fa-check"></i> Responsive across laptops, tablets & mobile</li>
              <li><i class="fa-solid fa-check"></i> Instant completion & verification receipts</li>
            </ul>
          </div>

          <!-- Pillar 3: Architecture & Security -->
          <div class="pillar-card security">
            <div class="pillar-icon-box">
              <i class="fa-solid fa-shield-halved"></i>
            </div>
            <div class="pillar-role">Enterprise Tech Stack</div>
            <h3>High-Concurrency Scalability</h3>
            <p>Cloud-native architecture designed to handle thousands of concurrent test takers with 99.99% uptime and zero latency spikes.</p>
            <ul class="pillar-feature-list">
              <li><i class="fa-solid fa-check"></i> AWS auto-scaling containerized backend</li>
              <li><i class="fa-solid fa-check"></i> Encrypted responses & tamper-proof audit log</li>
              <li><i class="fa-solid fa-check"></i> Browser lockdown & anti-cheating protections</li>
              <li><i class="fa-solid fa-check"></i> Automated scoring & batch performance analytics</li>
            </ul>
          </div>
        </div>

        <!-- Environments Supported Horizontal Scroll/Grid -->
        <div class="supported-institutions-banner">
          <div class="supported-title">
            <i class="fa-solid fa-building-columns"></i>
            <span>Tailored for Every Education Environment:</span>
          </div>
          <div class="institutions-tags">
            <span class="inst-tag">🏫 K-12 Schools</span>
            <span class="inst-tag">🏛️ Colleges & Higher Ed</span>
            <span class="inst-tag">🎓 Universities & Multi-Campus</span>
            <span class="inst-tag">🎯 Coaching & Test Prep Batches</span>
            <span class="inst-tag">🏢 Corporate & Skill Certification</span>
          </div>
        </div>

        <!-- Live Platform Embed / Preview Strip -->
        <div class="product-preview-card">
          <div class="preview-content">
            <div class="preview-tag">Official Product Portal</div>
            <h3>Ready to modernize your institution’s assessment operations?</h3>
            <p>Replace fragmented spreadsheets, paper tests, and disconnected tools with a single unified platform.</p>
          </div>
          <div class="preview-actions">
            <a href="https://digitalassessment.sunsolv.in/" target="_blank" rel="noopener noreferrer" class="btn btn-visit-portal">
              <span>Visit digitalassessment.sunsolv.in</span>
              <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .assessment-spotlight-section {
      padding: 90px 24px;
      background: radial-gradient(circle at 50% 10%, #03045e 0%, #021b4d 50%, #010224 100%);
      border-top: 1px solid rgba(72, 202, 228, 0.2);
      border-bottom: 1px solid rgba(72, 202, 228, 0.2);
      position: relative;
      overflow: hidden;
    }
    .assessment-spotlight-section::before {
      content: '';
      position: absolute;
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, rgba(0, 180, 216, 0.15), transparent 70%);
      top: -100px;
      right: -100px;
      pointer-events: none;
    }
    .spotlight-container {
      max-width: 1240px;
      margin: 0 auto;
      position: relative;
      z-index: 2;
    }
    .spotlight-header {
      max-width: 860px;
      margin: 0 auto 50px;
      text-align: center;
    }
    .product-origin-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 16px;
      background: rgba(0, 180, 216, 0.2);
      border: 1px solid rgba(72, 202, 228, 0.4);
      border-radius: 100px;
      color: var(--c-cyan-300);
      font-size: 0.85rem;
      font-weight: 800;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      margin-bottom: 16px;
    }
    .spotlight-title {
      font-size: 2.5rem;
      font-weight: 900;
      color: #ffffff;
      margin-bottom: 16px;
      letter-spacing: -0.5px;
    }
    .spotlight-subtitle {
      font-size: 1.05rem;
      color: var(--c-cyan-100);
      line-height: 1.7;
      margin-bottom: 28px;
    }
    .spotlight-cta-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      flex-wrap: wrap;
    }
    .btn-product-live {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: #ffffff;
      color: var(--c-navy-900);
      font-weight: 800;
      font-size: 0.95rem;
      padding: 13px 26px;
      border-radius: 10px;
      text-decoration: none;
      box-shadow: 0 4px 18px rgba(0, 0, 0, 0.3);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .btn-product-live:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(255, 255, 255, 0.4);
    }
    .btn-product-blueprint {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: linear-gradient(135deg, var(--c-blue-600), var(--c-cyan-500));
      color: var(--c-navy-900);
      border: none;
      font-weight: 800;
      font-size: 0.95rem;
      padding: 13px 26px;
      border-radius: 10px;
      cursor: pointer;
      box-shadow: 0 4px 18px rgba(0, 180, 216, 0.4);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .btn-product-blueprint:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 180, 216, 0.6);
    }
    .pillars-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
      margin-bottom: 40px;
    }
    .pillar-card {
      background: rgba(3, 16, 68, 0.7);
      border: 1px solid rgba(72, 202, 228, 0.25);
      border-radius: 20px;
      padding: 32px 26px;
      backdrop-filter: blur(20px);
      transition: transform 0.25s ease, border-color 0.25s ease;
      display: flex;
      flex-direction: column;
    }
    .pillar-card:hover {
      transform: translateY(-4px);
      border-color: var(--c-cyan-400);
      box-shadow: 0 12px 36px rgba(1, 2, 36, 0.7);
    }
    .pillar-icon-box {
      width: 52px;
      height: 52px;
      border-radius: 14px;
      background: rgba(0, 180, 216, 0.2);
      border: 1px solid rgba(72, 202, 228, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      color: var(--c-cyan-300);
      margin-bottom: 18px;
    }
    .pillar-role {
      font-size: 0.78rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: var(--c-cyan-400);
      margin-bottom: 6px;
    }
    .pillar-card h3 {
      font-size: 1.3rem;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 12px;
    }
    .pillar-card p {
      font-size: 0.92rem;
      color: var(--c-cyan-100);
      line-height: 1.6;
      margin-bottom: 20px;
      flex-grow: 1;
    }
    .pillar-feature-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding-top: 14px;
      border-top: 1px solid rgba(72, 202, 228, 0.15);
    }
    .pillar-feature-list li {
      font-size: 0.85rem;
      color: var(--c-cyan-100);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .pillar-feature-list li i {
      color: #10b981;
      font-size: 0.8rem;
    }
    .supported-institutions-banner {
      background: rgba(2, 62, 138, 0.3);
      border: 1px solid rgba(72, 202, 228, 0.2);
      border-radius: 14px;
      padding: 18px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
      margin-bottom: 30px;
    }
    .supported-title {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.92rem;
      font-weight: 700;
      color: #ffffff;
    }
    .supported-title i {
      color: var(--c-cyan-400);
    }
    .institutions-tags {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    .inst-tag {
      background: rgba(1, 2, 36, 0.6);
      border: 1px solid rgba(72, 202, 228, 0.25);
      border-radius: 100px;
      padding: 5px 14px;
      font-size: 0.82rem;
      font-weight: 700;
      color: var(--c-cyan-200);
    }
    .product-preview-card {
      background: linear-gradient(135deg, rgba(3, 4, 94, 0.9), rgba(0, 119, 182, 0.5));
      border: 1px solid rgba(72, 202, 228, 0.4);
      border-radius: 18px;
      padding: 28px 36px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
    }
    .preview-tag {
      font-size: 0.75rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--c-cyan-300);
      margin-bottom: 6px;
    }
    .product-preview-card h3 {
      font-size: 1.35rem;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 6px;
    }
    .product-preview-card p {
      font-size: 0.92rem;
      color: var(--c-cyan-100);
      margin: 0;
    }
    .btn-visit-portal {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: var(--c-cyan-400);
      color: var(--c-navy-900);
      font-weight: 800;
      font-size: 0.9rem;
      padding: 12px 22px;
      border-radius: 10px;
      text-decoration: none;
      white-space: nowrap;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .btn-visit-portal:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 180, 216, 0.6);
    }
    @media (max-width: 992px) {
      .pillars-grid { grid-template-columns: 1fr; }
      .product-preview-card { flex-direction: column; text-align: center; }
    }
    @media (max-width: 768px) {
      .spotlight-title { font-size: 2rem; }
      .assessment-spotlight-section { padding: 60px 16px; }
      .supported-institutions-banner { flex-direction: column; align-items: flex-start; }
    }
  `]
})
export class DigitalAssessmentComponent {
  scrollToFinder() {
    const el = document.getElementById('solutionFinderApp');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
}
