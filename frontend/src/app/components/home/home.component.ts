import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../hero/hero.component';
import { SolutionFinderComponent } from '../solution-finder/solution-finder.component';
import { SolutionDossierComponent } from '../solution-dossier/solution-dossier.component';
import { WhyOutcomesComponent } from '../why-outcomes/why-outcomes.component';
import { CapabilitiesComponent } from '../capabilities/capabilities.component';
import { ReviewsComponent } from '../reviews/reviews.component';
import { DigitalAssessmentComponent } from '../digital-assessment/digital-assessment.component';
import { FaqComponent } from '../faq/faq.component';
import { BookingModalComponent } from '../booking-modal/booking-modal.component';
import { SolutionService } from '../../services/solution.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    SolutionFinderComponent,
    SolutionDossierComponent,
    WhyOutcomesComponent,
    CapabilitiesComponent,
    DigitalAssessmentComponent,
    ReviewsComponent,
    FaqComponent,
    BookingModalComponent
  ],
  template: `
    <!-- Hero Section -->
    <app-hero 
      (startFinder)="scrollToFinder()" 
      (preselectCategory)="handlePreselect($event)"
    ></app-hero>

    <!-- Main Solution Finder & Post-Submission Dossier -->
    <div id="solutionFinderApp">
      <app-solution-finder #finderComp *ngIf="!solutionService.activeDossier()"></app-solution-finder>
      <app-solution-dossier *ngIf="solutionService.activeDossier()"></app-solution-dossier>
    </div>

    <!-- Proprietary Product Showcase: Digital Assessment Platform -->
    <app-digital-assessment></app-digital-assessment>

    <!-- Strategy & Advantage -->
    <app-why-outcomes></app-why-outcomes>

    <!-- Full Capabilities Grid -->
    <app-capabilities></app-capabilities>

    <!-- Social Proof & Reviews -->
    <app-reviews></app-reviews>

    <!-- SEO FAQ Accordion -->
    <app-faq></app-faq>

    <!-- Bottom Action CTA Banner -->
    <section class="bottom-cta-banner">
      <div class="banner-inner">
        <div class="banner-text">
          <h2>Ready to Engineer Your Next Level of Business Growth?</h2>
          <p>Start your 2-minute diagnostic and discover the exact technology roadmap for your goals.</p>
        </div>
        <div class="banner-cta">
          <button class="btn btn-primary-hero glow-button" (click)="scrollToFinder()">
            <span>Find My Solution Now</span>
            <i class="fa-solid fa-arrow-right-long"></i>
          </button>
        </div>
      </div>
    </section>

    <!-- Consultation Booking Modal -->
    <app-booking-modal></app-booking-modal>
  `
})
export class HomeComponent implements OnInit {
  @ViewChild('finderComp') finderComp?: SolutionFinderComponent;

  constructor(
    public solutionService: SolutionService,
    private seo: SeoService
  ) {}

  ngOnInit() {
    this.seo.setMetaTags({
      title: 'What Are You Looking to Achieve for Your Business? | Sunsolv Technologies',
      description: 'Tell us where you are today and where you want to go. Discover the right technology, digital, cloud, or growth solution for your business.',
      keywords: 'Business Solution Finder, IT Consulting, Digital Transformation, Web Development, Mobile Apps, AI Automation, AWS Cloud, Custom ERP, Sunsolv',
      url: 'https://sunsolv.com/solution-finder'
    });
  }

  scrollToFinder() {
    const el = document.getElementById('solutionFinderApp');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  handlePreselect(catId: string) {
    const cat = this.solutionService.categories.find(c => c.id === catId);
    if (cat && this.finderComp) {
      this.finderComp.selectCategory(cat);
    }
    this.scrollToFinder();
  }
}
