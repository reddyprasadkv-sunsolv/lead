import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero-section" id="heroSection">
      <div class="hero-wrapper">
        <div class="hero-badge animate-fade-in">
          <span class="pulse-dot"></span>
          <span>Intelligent Business Solution Finder 2.0</span>
        </div>

        <h1 class="hero-headline animate-slide-up" id="mainHeadline">
          What Are You Looking to <span class="gradient-text">Achieve for Your Business?</span>
        </h1>

        <p class="hero-subheadline animate-slide-up delay-1">
          Tell us where you are today and where you want to go. We’ll help identify the right technology, digital, cloud, or growth solution for your business.
        </p>

        <div class="hero-cta-group animate-slide-up delay-2">
          <button class="btn btn-primary-hero glow-button" id="startSolutionFinderBtn" (click)="onStartClick()">
            <span>Find My Solution</span>
            <i class="fa-solid fa-arrow-right-long icon-bounce"></i>
          </button>
          <a href="#whyOutcomeApproach" class="btn btn-secondary-hero">
            <i class="fa-regular fa-circle-play"></i>
            <span>Why Outcomes Beat Services</span>
          </a>
        </div>

        <!-- Quick Trust Indicators -->
        <div class="hero-trust-bar animate-fade-in delay-3">
          <div class="trust-item">
            <div class="trust-icon"><i class="fa-solid fa-clock-rotate-left"></i></div>
            <div class="trust-text">
              <strong>Takes Only 2 Mins</strong>
              <span>No jargon, pure business focus</span>
            </div>
          </div>
          <div class="trust-divider"></div>
          <div class="trust-item">
            <div class="trust-icon"><i class="fa-solid fa-brain"></i></div>
            <div class="trust-text">
              <strong>Dynamic Solution Matching</strong>
              <span>Instant customized blueprint</span>
            </div>
          </div>
          <div class="trust-divider"></div>
          <div class="trust-item">
            <div class="trust-icon"><i class="fa-solid fa-shield-halved"></i></div>
            <div class="trust-text">
              <strong>100% Confidential & Free</strong>
              <span>No obligation consultation</span>
            </div>
          </div>
        </div>

        <!-- Hero Interactive Teaser Preview Cards -->
        <div class="hero-preview-cards animate-slide-up delay-4">
          <div class="preview-card" (click)="onPreselect('website')">
            <span class="preview-icon">🌐</span>
            <span class="preview-title">Websites & Portals</span>
            <span class="preview-action">Explore <i class="fa-solid fa-chevron-right"></i></span>
          </div>
          <div class="preview-card" (click)="onPreselect('app')">
            <span class="preview-icon">📱</span>
            <span class="preview-title">Mobile & SaaS Apps</span>
            <span class="preview-action">Explore <i class="fa-solid fa-chevron-right"></i></span>
          </div>
          <div class="preview-card" (click)="onPreselect('digital_transformation')">
            <span class="preview-icon">🔄</span>
            <span class="preview-title">Digital Transformation</span>
            <span class="preview-action">Explore <i class="fa-solid fa-chevron-right"></i></span>
          </div>
          <div class="preview-card" (click)="onPreselect('ai_automation')">
            <span class="preview-icon">🤖</span>
            <span class="preview-title">AI & Automation</span>
            <span class="preview-action">Explore <i class="fa-solid fa-chevron-right"></i></span>
          </div>
          <div class="preview-card" (click)="onPreselect('marketing')">
            <span class="preview-icon">📈</span>
            <span class="preview-title">Digital Marketing & SEO</span>
            <span class="preview-action">Explore <i class="fa-solid fa-chevron-right"></i></span>
          </div>
        </div>
      </div>
    </section>
  `
})
export class HeroComponent {
  @Output() startFinder = new EventEmitter<void>();
  @Output() preselectCategory = new EventEmitter<string>();

  onStartClick() {
    this.startFinder.emit();
  }

  onPreselect(catId: string) {
    this.preselectCategory.emit(catId);
  }
}
