import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="legal-page-wrapper">
      <div class="legal-hero">
        <div class="legal-container">
          <div class="legal-breadcrumb">
            <a routerLink="/"><i class="fa-solid fa-house"></i> Home</a>
            <span>/</span>
            <span>Legal</span>
            <span>/</span>
            <span class="active">Privacy Policy</span>
          </div>
          <h1 class="legal-title">Privacy Policy</h1>
          <p class="legal-meta">Effective Date: August 29, 2026 · Sunsolv Technologies</p>
        </div>
      </div>

      <div class="legal-container legal-content-grid">
        <!-- Main Content -->
        <div class="legal-main-body">
          <div class="legal-intro-box">
            <p>
              At <strong>Sunsolv Technologies</strong> ("Sunsolv", "we", "our", or "us"), we value and respect your privacy. This Privacy Policy details how we collect, use, store, and protect information when you visit our website (<strong>sunsolv.in</strong> / <strong>sunsolv.com</strong>), utilize our interactive <em>Business Solution Finder</em> diagnostic, schedule consultations, or engage our IT consulting and software development services.
            </p>
          </div>

          <section class="legal-section" id="collection">
            <h2>1. Information We Collect</h2>
            <p>We collect information to deliver personalized technology blueprints, architecture recommendations, and seamless business communication:</p>
            <ul>
              <li><strong>Contact Information:</strong> Full name, corporate email address, contact telephone / WhatsApp number, company name, and country/location.</li>
              <li><strong>Business & Project Diagnostics:</strong> Information submitted through the Solution Finder including desired technology category, organizational pain points, current tech stack, industry vertical, team size, investment parameters, and project timelines.</li>
              <li><strong>Digital Assets & Attachments:</strong> URLs (current website, mobile apps, competitor benchmarks) and voluntarily uploaded RFP documents, technical specs, or workflow diagrams.</li>
              <li><strong>Automated & Technical Data:</strong> IP address, browser type, device identifiers, operating system, and anonymous interaction metrics collected via cookies and analytics scripts.</li>
            </ul>
          </section>

          <section class="legal-section" id="use-of-info">
            <h2>2. How We Use Your Information</h2>
            <p>Sunsolv Technologies uses your data solely for legitimate business purposes:</p>
            <ul>
              <li>Generating and delivering tailored technical solution blueprints and investment estimates.</li>
              <li>Facilitating discovery sessions and technical consultations with our senior solution architects.</li>
              <li>Communicating project updates, quotation dossiers, and answering your direct enquiries.</li>
              <li>Improving our diagnostic algorithms, website performance, and user experience.</li>
              <li>Complying with legal, tax, and regulatory requirements.</li>
            </ul>
            <div class="legal-callout info">
              <i class="fa-solid fa-shield-halved"></i>
              <div>
                <strong>Zero Data Selling Guarantee:</strong> We do not sell, rent, lease, or monetize your personal or business data to any third-party advertisers or data brokers under any circumstances.
              </div>
            </div>
          </section>

          <section class="legal-section" id="data-sharing">
            <h2>3. Data Sharing & Third-Party Processors</h2>
            <p>We may share your data only with trusted enterprise service providers operating under strict confidentiality and Data Processing Agreements (DPAs):</p>
            <ul>
              <li><strong>Cloud Infrastructure Providers:</strong> Highly secure AWS and Google Cloud environments located in compliant regional data centers.</li>
              <li><strong>Communication Channels:</strong> Secure email infrastructure and official WhatsApp Business API gateways used exclusively to dispatch requested blueprint dossiers and appointment notices.</li>
              <li><strong>Legal Compliance:</strong> When required by applicable Indian or international law, court orders, or governmental regulations.</li>
            </ul>
          </section>

          <section class="legal-section" id="data-security">
            <h2>4. Data Protection & Security Controls</h2>
            <p>We employ enterprise-grade administrative, technical, and physical safeguards:</p>
            <ul>
              <li><strong>Encryption:</strong> TLS 1.3 encryption for all data in transit across HTTPS, and AES-256 encryption for data at rest.</li>
              <li><strong>Role-Based Access Control (RBAC):</strong> Access to client enquiries is restricted strictly to authorized Solution Architects and assigned project steering teams.</li>
              <li><strong>Regular Audits:</strong> Continuous vulnerability scans and periodic security hygiene reviews.</li>
            </ul>
          </section>

          <section class="legal-section" id="retention">
            <h2>5. Data Retention</h2>
            <p>
              We retain business enquiry details for the duration necessary to deliver the requested solution consultations and maintain continuous client support. If you wish to delete your enquiry history or submitted files, you may request permanent deletion at any time.
            </p>
          </section>

          <section class="legal-section" id="your-rights">
            <h2>6. Your Privacy Rights</h2>
            <p>Under applicable data privacy laws, including the <em>Indian Digital Personal Data Protection (DPDP) Act 2023</em> and the <em>General Data Protection Regulation (GDPR)</em>, you possess the right to:</p>
            <ul>
              <li>Access, review, or request a portable copy of your personal data.</li>
              <li>Request correction or rectification of incomplete or inaccurate information.</li>
              <li>Request erasure / permanent deletion of your records from our systems.</li>
              <li>Withdraw consent for marketing communications or strategic newsletters at any time.</li>
            </ul>
          </section>

          <section class="legal-section" id="cookies">
            <h2>7. Cookies & Tracking Technologies</h2>
            <p>
              We use strictly necessary and performance cookies to maintain session preferences and analyze anonymous traffic flows. You can manage or disable cookies through your individual browser settings.
            </p>
          </section>

          <section class="legal-section" id="contact">
            <h2>8. Contact Our Privacy & Data Protection Team</h2>
            <p>If you have any questions, requests, or privacy concerns regarding this policy, please reach out directly:</p>
            <div class="legal-contact-card">
              <div class="contact-line">
                <i class="fa-solid fa-building"></i>
                <strong>Sunsolv Technologies</strong>
              </div>
              <div class="contact-line">
                <i class="fa-solid fa-location-dot"></i>
                <span>Sunsolv HQ · Hyderabad, Telangana, India</span>
              </div>
              <div class="contact-line">
                <i class="fa-solid fa-envelope"></i>
                <span>Email: <a href="mailto:info@sunsolv.in">info&#64;sunsolv.in</a></span>
              </div>
              <div class="contact-line">
                <i class="fa-solid fa-phone"></i>
                <span>Phone: <a href="tel:+919676868607">+91 9676868607</a></span>
              </div>
            </div>
          </section>

          <div class="legal-footer-nav">
            <a routerLink="/terms-of-service" class="legal-nav-btn">
              <span>View Terms of Service</span>
              <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .legal-page-wrapper {
      padding-bottom: 90px;
    }
    .legal-hero {
      background: radial-gradient(circle at 50% 0%, #023e8a 0%, #03045e 50%, #010224 100%);
      padding: 60px 24px 45px;
      border-bottom: 1px solid rgba(72, 202, 228, 0.2);
    }
    .legal-container {
      max-width: 960px;
      margin: 0 auto;
      padding: 0 20px;
    }
    .legal-breadcrumb {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.85rem;
      color: var(--c-cyan-300);
      margin-bottom: 18px;
    }
    .legal-breadcrumb a {
      color: var(--c-cyan-300);
      text-decoration: none;
      transition: color 0.2s ease;
    }
    .legal-breadcrumb a:hover {
      color: #ffffff;
    }
    .legal-breadcrumb .active {
      color: var(--c-cyan-100);
      font-weight: 700;
    }
    .legal-title {
      font-size: 2.6rem;
      font-weight: 900;
      color: #ffffff;
      margin-bottom: 10px;
      letter-spacing: -0.5px;
    }
    .legal-meta {
      font-size: 0.95rem;
      color: var(--c-cyan-200);
    }
    .legal-content-grid {
      margin-top: 40px;
    }
    .legal-main-body {
      background: rgba(3, 16, 68, 0.65);
      border: 1px solid rgba(72, 202, 228, 0.2);
      border-radius: 20px;
      padding: 44px;
      backdrop-filter: blur(20px);
      box-shadow: 0 10px 40px rgba(1, 2, 36, 0.6);
    }
    .legal-intro-box {
      font-size: 1.1rem;
      color: var(--c-cyan-100);
      line-height: 1.7;
      padding-bottom: 24px;
      margin-bottom: 30px;
      border-bottom: 1px solid rgba(72, 202, 228, 0.15);
    }
    .legal-section {
      margin-bottom: 36px;
    }
    .legal-section h2 {
      font-size: 1.45rem;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 16px;
      padding-bottom: 6px;
      border-bottom: 2px solid rgba(0, 180, 216, 0.3);
      display: inline-block;
    }
    .legal-section p {
      font-size: 0.98rem;
      color: var(--c-cyan-100);
      line-height: 1.7;
      margin-bottom: 14px;
    }
    .legal-section ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-left: 4px;
    }
    .legal-section ul li {
      position: relative;
      padding-left: 24px;
      font-size: 0.95rem;
      color: var(--c-cyan-100);
      line-height: 1.6;
    }
    .legal-section ul li::before {
      content: '■';
      position: absolute;
      left: 4px;
      color: var(--c-cyan-400);
      font-size: 0.75rem;
      top: 2px;
    }
    .legal-callout {
      margin-top: 20px;
      padding: 18px 22px;
      border-radius: 12px;
      display: flex;
      align-items: flex-start;
      gap: 16px;
    }
    .legal-callout.info {
      background: rgba(0, 119, 182, 0.25);
      border: 1px solid rgba(72, 202, 228, 0.4);
      color: var(--c-cyan-100);
    }
    .legal-callout i {
      font-size: 1.4rem;
      color: var(--c-cyan-400);
      margin-top: 2px;
    }
    .legal-contact-card {
      background: rgba(2, 62, 138, 0.3);
      border: 1px solid rgba(72, 202, 228, 0.25);
      border-radius: 14px;
      padding: 22px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: 14px;
    }
    .contact-line {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 0.95rem;
      color: var(--c-cyan-100);
    }
    .contact-line i {
      color: var(--c-cyan-400);
      width: 18px;
    }
    .contact-line a {
      color: var(--c-cyan-300);
      text-decoration: none;
      font-weight: 700;
    }
    .contact-line a:hover {
      text-decoration: underline;
      color: #ffffff;
    }
    .legal-footer-nav {
      margin-top: 40px;
      padding-top: 24px;
      border-top: 1px solid rgba(72, 202, 228, 0.15);
      display: flex;
      justify-content: flex-end;
    }
    .legal-nav-btn {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: linear-gradient(135deg, var(--c-blue-600), var(--c-cyan-500));
      color: var(--c-navy-900);
      font-weight: 800;
      padding: 12px 24px;
      border-radius: 10px;
      text-decoration: none;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .legal-nav-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 180, 216, 0.5);
    }
    @media (max-width: 768px) {
      .legal-title { font-size: 2rem; }
      .legal-main-body { padding: 24px 18px; }
      .legal-hero { padding: 40px 16px 30px; }
    }
  `]
})
export class PrivacyPolicyComponent implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.setMetaTags({
      title: 'Privacy Policy | Sunsolv Technologies',
      description: 'Privacy Policy for Sunsolv Technologies. Learn how we protect your data, diagnostic submissions, and privacy across our IT solutions and consulting services.',
      url: 'https://sunsolv.com/privacy-policy'
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
