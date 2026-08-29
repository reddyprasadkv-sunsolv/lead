import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-capabilities',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="services-coverage-section" id="servicesCoverage">
      <div class="section-container">
        <div class="section-badge">Capabilities</div>
        <h2 class="section-title">End-to-End Capabilities <span class="gradient-text">Under One Roof</span></h2>
        <p class="section-subtitle">Whether you need custom software, cloud infrastructure, AI automation, or high-performance digital marketing, Sunsolv delivers.</p>

        <div class="services-six-grid">
          <!-- 1 -->
          <div class="service-box">
            <div class="service-icon"><i class="fa-solid fa-globe"></i></div>
            <h3>Web & Portal Development</h3>
            <p>High-converting corporate websites, bespoke customer portals, enterprise intranet platforms, and lightning-fast web experiences.</p>
            <span class="service-tag">Next.js · React · Node · Headless CMS</span>
          </div>

          <!-- 2 -->
          <div class="service-box">
            <div class="service-icon"><i class="fa-solid fa-mobile-screen-button"></i></div>
            <h3>Custom Mobile & SaaS Apps</h3>
            <p>Native & cross-platform iOS/Android apps, SaaS multi-tenant platforms, and enterprise progressive web applications (PWA).</p>
            <span class="service-tag">Flutter · React Native · Microservices · APIs</span>
          </div>

          <!-- 3 -->
          <div class="service-box">
            <div class="service-icon"><i class="fa-solid fa-robot"></i></div>
            <h3>AI & Workflow Automation</h3>
            <p>Eliminate manual operational drag with custom AI assistants, WhatsApp bots, automated document extraction, and CRM sync.</p>
            <span class="service-tag">LLMs · Make/Zapier · Python · Custom Bots</span>
          </div>

          <!-- 4 -->
          <div class="service-box">
            <div class="service-icon"><i class="fa-solid fa-cloud-arrow-up"></i></div>
            <h3>Cloud & DevOps Architecture</h3>
            <p>Reliable, auto-scaling cloud migrations, AWS/GCP architecture, serverless design, database clustering, and 99.99% uptime SLAs.</p>
            <span class="service-tag">AWS · Google Cloud · Docker · Kubernetes</span>
          </div>

          <!-- 5 -->
          <div class="service-box">
            <div class="service-icon"><i class="fa-solid fa-bullhorn"></i></div>
            <h3>Growth Marketing & GEO/AIO</h3>
            <p>Dominance across search engines and AI engines. Organic SEO, Google Ads, high-intent social campaigns, and conversion rate optimization.</p>
            <span class="service-tag">SEO · Google Ads · GEO · Conversion CRO</span>
          </div>

          <!-- 6 -->
          <div class="service-box">
            <div class="service-icon"><i class="fa-solid fa-cubes-stacked"></i></div>
            <h3>Custom Business Software & ERP</h3>
            <p>Tailor-made ERP, CRM, inventory, and billing software engineered around your unique company workflow rather than forcing you into rigid templates.</p>
            <span class="service-tag">Custom CRM · ERP · Billing · Integrations</span>
          </div>
        </div>
      </div>
    </section>
  `
})
export class CapabilitiesComponent {}
