import { Component } from '@angular/core';
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
          <p class="spotlight-tagline">
            Assessment operations, connected from setup to submission.
          </p>
          <p class="spotlight-subtitle">
            A unified, enterprise digital assessment ecosystem engineered for <strong>Schools, Colleges, Universities, Coaching Centres & Training Academies</strong>—bringing administrators, faculty coordinators, and students into one structured, seamless workflow.
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
            <a href="https://wa.me/919676868607?text=Hello%20Sunsolv%20Team%2C%20I%20would%20like%20to%20schedule%20a%20demo%20for%20the%20Digital%20Assessment%20Platform." target="_blank" class="btn btn-product-whatsapp">
              <i class="fa-brands fa-whatsapp"></i>
              <span>Book Demo on WhatsApp</span>
            </a>
          </div>
        </div>

        <!-- 6 Connected Stages Workflow Grid -->
        <div class="workflow-overview-wrapper">
          <div class="workflow-header-row">
            <span class="workflow-badge">End-to-End Operational Lifecycle</span>
            <h3>6 Connected Stages of Assessment Operations</h3>
          </div>
          <div class="workflow-steps-grid">
            <div class="step-card">
              <div class="step-num">01</div>
              <h4>Institution Setup</h4>
              <p>Configure institution structure, departments, and multi-branch rules.</p>
            </div>
            <div class="step-card">
              <div class="step-num">02</div>
              <h4>Team & Branch</h4>
              <p>Organise administrators, faculty coordinators, and role permissions.</p>
            </div>
            <div class="step-card">
              <div class="step-num">03</div>
              <h4>Assessment Creation</h4>
              <p>Create question banks, section rules, and timed test schedules.</p>
            </div>
            <div class="step-card">
              <div class="step-num">04</div>
              <h4>Student Access</h4>
              <p>Assign secure, distraction-free test access with credentials or links.</p>
            </div>
            <div class="step-card">
              <div class="step-num">05</div>
              <h4>Participation</h4>
              <p>Calm, guided test taking with auto-save and responsive interfaces.</p>
            </div>
            <div class="step-card">
              <div class="step-num">06</div>
              <h4>Review & Insights</h4>
              <p>Automated grading, scorecards, batch analytics, and exportable reports.</p>
            </div>
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

        <!-- Environments Supported Grid -->
        <div class="environments-section-card">
          <div class="env-header">
            <span class="env-badge">Versatile Institutional Fit</span>
            <h3>Engineered for Varied Education Environments</h3>
            <p>Whether managing a single campus or a multi-state network of institutions, Sunsolv scales effortlessly.</p>
          </div>
          <div class="environments-grid">
            <div class="env-item">
              <div class="env-icon">🏫</div>
              <h4>K-12 Schools</h4>
              <p>Coordinate structured periodic tests and term examinations for classes.</p>
            </div>
            <div class="env-item">
              <div class="env-icon">🏛️</div>
              <h4>Colleges & Higher Ed</h4>
              <p>Bring departments, faculty coordinators, and semester batches into one flow.</p>
            </div>
            <div class="env-item">
              <div class="env-icon">🎓</div>
              <h4>Universities</h4>
              <p>Support institution-wide exam journeys across multiple colleges and campuses.</p>
            </div>
            <div class="env-item">
              <div class="env-icon">🎯</div>
              <h4>Coaching & Test Prep</h4>
              <p>Create focused timed mock tests, batch rankings, and instant student analytics.</p>
            </div>
            <div class="env-item">
              <div class="env-icon">🏢</div>
              <h4>Training Academies</h4>
              <p>Manage standardized digital skill evaluations and certification exams.</p>
            </div>
          </div>
        </div>

        <!-- Live Platform Embed / Preview Strip -->
        <div class="product-preview-card">
          <div class="preview-content">
            <div class="preview-tag">Official Product Portal</div>
            <h3>Ready to modernize your institution’s assessment operations?</h3>
            <p>Replace fragmented spreadsheets, paper tests, and disconnected tools with Sunsolv Digital Assessment Platform.</p>
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
      max-width: 880px;
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
      font-size: 2.6rem;
      font-weight: 900;
      color: #ffffff;
      margin-bottom: 10px;
      letter-spacing: -0.5px;
    }
    .spotlight-tagline {
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--c-cyan-300);
      margin-bottom: 14px;
    }
    .spotlight-subtitle {
      font-size: 1.05rem;
      color: var(--c-cyan-100);
      line-height: 1.7;
      margin-bottom: 30px;
    }
    .spotlight-cta-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 14px;
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
    .btn-product-whatsapp {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #25d366;
      color: #ffffff;
      font-weight: 700;
      font-size: 0.95rem;
      padding: 13px 24px;
      border-radius: 10px;
      text-decoration: none;
      transition: transform 0.2s ease;
    }
    .btn-product-whatsapp:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(37, 211, 102, 0.5);
    }
    .workflow-overview-wrapper {
      background: rgba(3, 16, 68, 0.6);
      border: 1px solid rgba(72, 202, 228, 0.25);
      border-radius: 20px;
      padding: 36px 30px;
      margin-bottom: 40px;
    }
    .workflow-header-row {
      text-align: center;
      margin-bottom: 30px;
    }
    .workflow-badge {
      font-size: 0.75rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: var(--c-cyan-400);
      display: inline-block;
      margin-bottom: 6px;
    }
    .workflow-header-row h3 {
      font-size: 1.6rem;
      font-weight: 800;
      color: #ffffff;
    }
    .workflow-steps-grid {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 16px;
    }
    .step-card {
      background: rgba(1, 2, 36, 0.6);
      border: 1px solid rgba(72, 202, 228, 0.2);
      border-radius: 14px;
      padding: 20px 14px;
      text-align: center;
      transition: transform 0.2s ease, border-color 0.2s ease;
    }
    .step-card:hover {
      transform: translateY(-3px);
      border-color: var(--c-cyan-400);
    }
    .step-num {
      font-size: 1.2rem;
      font-weight: 900;
      color: var(--c-cyan-400);
      margin-bottom: 8px;
    }
    .step-card h4 {
      font-size: 0.92rem;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 6px;
    }
    .step-card p {
      font-size: 0.78rem;
      color: var(--c-cyan-100);
      line-height: 1.4;
      margin: 0;
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
    .environments-section-card {
      background: rgba(2, 62, 138, 0.25);
      border: 1px solid rgba(72, 202, 228, 0.25);
      border-radius: 20px;
      padding: 36px 30px;
      margin-bottom: 40px;
    }
    .env-header {
      text-align: center;
      margin-bottom: 28px;
    }
    .env-badge {
      font-size: 0.75rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: var(--c-cyan-400);
      display: inline-block;
      margin-bottom: 6px;
    }
    .env-header h3 {
      font-size: 1.5rem;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 8px;
    }
    .env-header p {
      font-size: 0.92rem;
      color: var(--c-cyan-100);
      margin: 0;
    }
    .environments-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 16px;
    }
    .env-item {
      background: rgba(1, 2, 36, 0.6);
      border: 1px solid rgba(72, 202, 228, 0.2);
      border-radius: 14px;
      padding: 20px 16px;
      text-align: center;
      transition: transform 0.2s ease, border-color 0.2s ease;
    }
    .env-item:hover {
      transform: translateY(-3px);
      border-color: var(--c-cyan-400);
    }
    .env-icon {
      font-size: 2rem;
      margin-bottom: 10px;
    }
    .env-item h4 {
      font-size: 0.95rem;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 6px;
    }
    .env-item p {
      font-size: 0.8rem;
      color: var(--c-cyan-100);
      line-height: 1.45;
      margin: 0;
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
    @media (max-width: 1024px) {
      .workflow-steps-grid { grid-template-columns: repeat(3, 1fr); }
      .environments-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 992px) {
      .pillars-grid { grid-template-columns: 1fr; }
      .product-preview-card { flex-direction: column; text-align: center; }
    }
    @media (max-width: 768px) {
      .spotlight-title { font-size: 2rem; }
      .assessment-spotlight-section { padding: 60px 16px; }
      .workflow-steps-grid { grid-template-columns: 1fr; }
      .environments-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class DigitalAssessmentComponent {
  scrollToFinder() {
    const el = document.getElementById('solutionFinderApp');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
