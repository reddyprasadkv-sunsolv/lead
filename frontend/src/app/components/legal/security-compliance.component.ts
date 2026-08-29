import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-security-compliance',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="legal-page-wrapper">
      <div class="legal-hero">
        <div class="legal-container">
          <div class="legal-breadcrumb">
            <a routerLink="/"><i class="fa-solid fa-house"></i> Home</a>
            <span>/</span>
            <span>Trust Center</span>
            <span>/</span>
            <span class="active">Security & Compliance</span>
          </div>
          <h1 class="legal-title">Security & Compliance</h1>
          <p class="legal-meta">Enterprise Trust & Architecture Safeguards · Sunsolv Technologies</p>
        </div>
      </div>

      <div class="legal-container legal-content-grid">
        <div class="legal-main-body">
          <div class="legal-intro-box">
            <p>
              At <strong>Sunsolv Technologies</strong>, security, intellectual property integrity, and regulatory compliance are foundational to our engineering DNA. We architect modern web portals, SaaS platforms, cloud infrastructures, and AI automations with a rigorous <strong>Defense-in-Depth</strong> security model to protect client data, source code, and corporate assets at every layer.
            </p>
          </div>

          <!-- Security Highlights Grid -->
          <div class="security-pillars-grid">
            <div class="sec-pillar-card">
              <div class="sec-icon"><i class="fa-solid fa-lock"></i></div>
              <h3>End-to-End Encryption</h3>
              <p>TLS 1.3 for all data in flight and AES-256 for data at rest across databases, backups, and storage buckets.</p>
            </div>
            <div class="sec-pillar-card">
              <div class="sec-icon"><i class="fa-solid fa-cloud-shield"></i></div>
              <h3>Cloud Isolation</h3>
              <p>Isolated Virtual Private Clouds (VPC), private subnets, security groups, and zero public database exposure.</p>
            </div>
            <div class="sec-pillar-card">
              <div class="sec-icon"><i class="fa-solid fa-user-shield"></i></div>
              <h3>Strict Access Control</h3>
              <p>MFA mandatory, role-based access control (RBAC), and least-privilege access enforcement across all environments.</p>
            </div>
            <div class="sec-pillar-card">
              <div class="sec-icon"><i class="fa-solid fa-certificate"></i></div>
              <h3>Compliance Aligned</h3>
              <p>Aligned with ISO/IEC 27001, SOC 2 Type II standards, Indian DPDP Act 2023, and EU GDPR principles.</p>
            </div>
          </div>

          <section class="legal-section" id="cloud-infrastructure">
            <h2>1. Cloud Infrastructure & Hosting Security</h2>
            <p>We deploy client solutions across top-tier enterprise cloud service providers (principally Amazon Web Services and Google Cloud Platform) adhering to certified global standards:</p>
            <ul>
              <li><strong>Certified Tier-IV Data Centers:</strong> Hosting facilities maintain SOC 1/2/3, ISO/IEC 27001, and PCI DSS compliance.</li>
              <li><strong>Network Segmentation:</strong> Microservices, application containers, and databases reside within private VPC subnets shielded by Network Access Control Lists (NACLs) and stateful security groups.</li>
              <li><strong>DDoS Mitigation & Web Application Firewall (WAF):</strong> Enterprise rate limiting, bot protection, and automated Layer 3/4/7 DDoS mitigation powered by AWS Shield and Cloudflare.</li>
            </ul>
          </section>

          <section class="legal-section" id="application-security">
            <h2>2. Application Security & Secure SDLC</h2>
            <p>Our engineering lifecycle embeds security verification from sprint planning through deployment:</p>
            <ul>
              <li><strong>OWASP Top 10 Mitigation:</strong> Built-in defenses against SQL injection, Cross-Site Scripting (XSS), Cross-Site Request Forgery (CSRF), and broken authentication.</li>
              <li><strong>Static & Dynamic Code Analysis (SAST/DAST):</strong> Automated CI/CD security pipelines scanning for vulnerabilities and dependency vulnerabilities before production builds.</li>
              <li><strong>Secret Scanning:</strong> Zero hardcoded API keys or credentials; all environment secrets are managed via AWS Secrets Manager or HashiCorp Vault.</li>
            </ul>
          </section>

          <section class="legal-section" id="data-governance">
            <h2>3. Client Data Governance & Confidentiality</h2>
            <p>We implement strict protocols to safeguard your business logic, client data, and IP:</p>
            <ul>
              <li><strong>Isolated Code Repositories:</strong> Dedicated GitHub/GitLab enterprise repositories accessible strictly by vetted engineers assigned to your Statement of Work.</li>
              <li><strong>Strict Non-Disclosure Agreements (NDAs):</strong> Every team member and partner is bound by enforceable non-disclosure and intellectual property assignment agreements.</li>
              <li><strong>Non-Persistent AI Processing:</strong> When integrating Large Language Models (LLMs) and custom AI agents, client data is processed via zero-retention enterprise API endpoints that do not train public AI models.</li>
            </ul>
          </section>

          <section class="legal-section" id="compliance-frameworks">
            <h2>4. Regulatory Compliance Frameworks</h2>
            <p>Sunsolv Technologies aligns its policies, internal operations, and software delivery standards with leading data protection benchmarks:</p>
            <ul>
              <li><strong>Indian Digital Personal Data Protection (DPDP) Act 2023:</strong> Full adherence to lawful consent, purpose limitation, and data principal rights.</li>
              <li><strong>General Data Protection Regulation (GDPR):</strong> Comprehensive data subject request (DSR) workflows, Right to be Forgotten, and strict Data Processing Agreements.</li>
              <li><strong>ISO/IEC 27001 & SOC 2 Principles:</strong> Continuous risk management, change approval controls, and comprehensive operational audit trails.</li>
            </ul>
          </section>

          <section class="legal-section" id="business-continuity">
            <h2>5. Business Continuity & Disaster Recovery (BCDR)</h2>
            <ul>
              <li><strong>Automated Backups:</strong> Point-in-time database snapshots and automated daily encrypted offsite backups.</li>
              <li><strong>High Availability Architecture:</strong> Multi-Availability Zone (AZ) deployments with automatic failover and load balancing ensuring 99.99% operational uptime targets.</li>
              <li><strong>Disaster Recovery Drills:</strong> Periodic recovery simulations testing Recovery Time Objectives (RTO < 2 hours) and Recovery Point Objectives (RPO < 15 minutes).</li>
            </ul>
          </section>

          <section class="legal-section" id="security-contact">
            <h2>6. Security Incident Response & Contact</h2>
            <p>If you identify a security concern or wish to request our comprehensive compliance package or execute an enterprise DPA, please reach out to our dedicated security desk:</p>
            <div class="legal-contact-card">
              <div class="contact-line">
                <i class="fa-solid fa-shield-virus"></i>
                <strong>Sunsolv Technologies — Information Security & Compliance Desk</strong>
              </div>
              <div class="contact-line">
                <i class="fa-solid fa-location-dot"></i>
                <span>Sunsolv HQ · Hyderabad, Telangana, India</span>
              </div>
              <div class="contact-line">
                <i class="fa-solid fa-envelope"></i>
                <span>Security Inquiries: <a href="mailto:info@sunsolv.in">info&#64;sunsolv.in</a></span>
              </div>
              <div class="contact-line">
                <i class="fa-solid fa-phone"></i>
                <span>Direct Hotline: <a href="tel:+919676868607">+91 9676868607</a></span>
              </div>
            </div>
          </section>

          <div class="legal-footer-nav">
            <a routerLink="/privacy-policy" class="legal-nav-btn">
              <span>View Privacy Policy</span>
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
    .security-pillars-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 36px;
    }
    .sec-pillar-card {
      background: rgba(2, 62, 138, 0.3);
      border: 1px solid rgba(72, 202, 228, 0.25);
      border-radius: 14px;
      padding: 22px;
    }
    .sec-icon {
      width: 44px;
      height: 44px;
      border-radius: 10px;
      background: rgba(0, 180, 216, 0.2);
      color: var(--c-cyan-400);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.3rem;
      margin-bottom: 12px;
    }
    .sec-pillar-card h3 {
      font-size: 1.1rem;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 6px;
    }
    .sec-pillar-card p {
      font-size: 0.88rem;
      color: var(--c-cyan-200);
      line-height: 1.5;
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
      .security-pillars-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class SecurityComplianceComponent implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.setMetaTags({
      title: 'Security & Compliance | Sunsolv Technologies',
      description: 'Security & Compliance standards at Sunsolv Technologies. Learn about our defense-in-depth architecture, encryption, cloud safeguards, and data governance.',
      url: 'https://sunsolv.com/security-compliance'
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
