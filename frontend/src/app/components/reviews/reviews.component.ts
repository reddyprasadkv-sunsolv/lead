import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="social-proof-section" id="clientReviews">
      <div class="section-container">
        <div class="section-badge">Client Success</div>
        <h2 class="section-title">Built for Leaders Who Value <span class="gradient-text">Tangible Growth</span></h2>
        <p class="section-subtitle">See how companies transitioned from scattered tools to unified high-performance digital engines.</p>

        <div class="testimonials-slider-grid">
          <div class="testimonial-card">
            <div class="stars-row">
              <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
            </div>
            <p class="test-quote">
              “Instead of just giving us a generic web quote, Sunsolv audited our real estate sales funnel and built a high-converting web portal with WhatsApp automated lead routing. Our qualified inquiries jumped 240% in 90 days.”
            </p>
            <div class="test-author">
              <div class="author-avatar">RK</div>
              <div class="author-info">
                <strong>Rajesh Kumar</strong>
                <span>Managing Director · Apex Realty Group</span>
              </div>
            </div>
          </div>

          <div class="testimonial-card">
            <div class="stars-row">
              <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
            </div>
            <p class="test-quote">
              “We were drowning in Excel sheets across 5 warehouses. Sunsolv built a custom ERP that synchronized inventory and billing in real-time. It cut our operational processing time by half.”
            </p>
            <div class="test-author">
              <div class="author-avatar">AP</div>
              <div class="author-info">
                <strong>Ananya Patel</strong>
                <span>COO · Global Logistics & Supply</span>
              </div>
            </div>
          </div>

          <div class="testimonial-card">
            <div class="stars-row">
              <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
            </div>
            <p class="test-quote">
              “Our SaaS platform needed a robust AWS migration and AI automation layer. Sunsolv handled the full architecture flawlessly with zero downtime and 40% cloud cost reduction.”
            </p>
            <div class="test-author">
              <div class="author-avatar">SM</div>
              <div class="author-info">
                <strong>Siddharth Mehta</strong>
                <span>Founder & CTO · NovaScale Technologies</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ReviewsComponent {}
