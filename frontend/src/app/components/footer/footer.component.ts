import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="site-footer">
      <div class="footer-container">
        <div class="footer-top-grid">
          
          <!-- Brand Info -->
          <div class="footer-brand-col">
            <div class="footer-brand-logo">
              <span class="f-brand-title">SUNSOLV TECHNOLOGIES</span>
            </div>
            <p class="footer-desc">
              Empowering businesses worldwide with end-to-end technology solutions, cloud modernization, digital transformation, custom software, and outcome-focused marketing engines.
            </p>
            <div class="social-links-row">
              <a href="https://www.linkedin.com/company/sunsolv-technologies" target="_blank" rel="noopener noreferrer" class="social-circle" title="LinkedIn" aria-label="Sunsolv LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
              <a href="https://x.com/sunsolv" target="_blank" rel="noopener noreferrer" class="social-circle" title="X (Twitter)" aria-label="Sunsolv X / Twitter"><i class="fa-brands fa-x-twitter"></i></a>
              <a href="https://www.facebook.com/sunsolv" target="_blank" rel="noopener noreferrer" class="social-circle" title="Facebook" aria-label="Sunsolv Facebook"><i class="fa-brands fa-facebook-f"></i></a>
              <a href="https://www.instagram.com/sunsolvtechnologies" target="_blank" rel="noopener noreferrer" class="social-circle" title="Instagram" aria-label="Sunsolv Instagram"><i class="fa-brands fa-instagram"></i></a>
              <a href="https://wa.me/919676868607" target="_blank" rel="noopener noreferrer" class="social-circle" title="WhatsApp" aria-label="Sunsolv WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
            </div>
          </div>

          <!-- Quick Links -->
          <div class="footer-links-col">
            <h4 class="f-col-title">Solution Areas</h4>
            <ul>
              <li><a href="https://digitalassessment.sunsolv.in/" target="_blank" style="color: var(--c-cyan-300); font-weight: 700;">Digital Assessment Platform ↗</a></li>
              <li><a href="#solutionFinderApp">Websites & Portals</a></li>
              <li><a href="#solutionFinderApp">Mobile & SaaS Apps</a></li>
              <li><a href="#solutionFinderApp">AI & Workflow Automation</a></li>
              <li><a href="#solutionFinderApp">Cloud Infrastructure (AWS)</a></li>
              <li><a href="#solutionFinderApp">Custom ERP & CRM</a></li>
              <li><a href="#solutionFinderApp">Growth SEO & GEO/AIO</a></li>
            </ul>
          </div>

          <!-- Solutions for Industries -->
          <div class="footer-links-col">
            <h4 class="f-col-title">Industries Served</h4>
            <ul>
              <li><a href="#solutionFinderApp">Real Estate & Construction</a></li>
              <li><a href="#solutionFinderApp">Healthcare & Clinics</a></li>
              <li><a href="#solutionFinderApp">Ecommerce & Retail</a></li>
              <li><a href="#solutionFinderApp">Manufacturing & Logistics</a></li>
              <li><a href="#solutionFinderApp">EdTech & Institutes</a></li>
              <li><a href="#solutionFinderApp">FinTech & Professional Services</a></li>
            </ul>
          </div>

          <!-- Direct Contact (CRM Link removed from public view) -->
          <div class="footer-links-col">
            <h4 class="f-col-title">Direct Contact</h4>
            <ul class="contact-info-list">
              <li>
                <i class="fa-solid fa-location-dot"></i>
                <span>Sunsolv HQ · Hyderabad, India</span>
              </li>
              <li>
                <i class="fa-solid fa-envelope"></i>
                <a href="mailto:info@sunsolv.in" style="color: var(--c-cyan-200); text-decoration: none;">info&#64;sunsolv.in</a>
              </li>
              <li>
                <i class="fa-solid fa-clock"></i>
                <span>Mon – Fri: 9:00 AM – 7:00 PM</span>
              </li>
            </ul>
          </div>

        </div>

        <div class="footer-bottom-bar">
          <p>&copy; 2026 Sunsolv Technologies. All rights reserved.</p>
          <div class="legal-links">
            <a routerLink="/privacy-policy">Privacy Policy</a>
            <a routerLink="/terms-of-service">Terms of Service</a>
            <a routerLink="/security-compliance">Security & Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer-logo-badge {
      background: #ffffff;
      padding: 8px 18px;
      border-radius: 12px;
      display: inline-flex;
      align-items: center;
      box-shadow: 0 4px 18px rgba(0, 0, 0, 0.25);
    }
    .footer-logo-img {
      height: 64px;
      width: auto;
      object-fit: contain;
      display: block;
    }
  `]
})
export class FooterComponent {}
