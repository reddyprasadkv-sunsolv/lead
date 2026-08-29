import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FaqItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="faq-section" id="faqSection">
      <div class="section-container">
        <div class="section-badge">Got Questions?</div>
        <h2 class="section-title">Frequently Asked <span class="gradient-text">Questions</span></h2>
        <p class="section-subtitle">Everything you need to know about the Solution Finder and partnering with Sunsolv Technologies.</p>

        <div class="faq-accordion-container">
          <div 
            *ngFor="let item of faqs; let i = index" 
            class="faq-item"
            [class.active]="activeIdx() === i"
            (click)="toggle(i)"
          >
            <div class="faq-question">
              <span>{{ item.question }}</span>
              <i class="fa-solid fa-chevron-down"></i>
            </div>
            <div class="faq-answer">
              <p>{{ item.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class FaqComponent {
  activeIdx = signal<number>(0);

  faqs: FaqItem[] = [
    {
      question: "What happens after I complete the Solution Finder?",
      answer: "You instantly receive a personalized solution blueprint on your screen and in your email. One of our dedicated Solution Consultants will review your submission, perform a complimentary initial assessment, and reach out to schedule a focused strategy call."
    },
    {
      question: "What if I don't know the exact technical specifications I need?",
      answer: "That is exactly why we built the Solution Finder! You do not need to know coding languages, cloud infrastructure types, or API protocols. Simply tell us your business problem (e.g. 'We need more leads' or 'We want to automate invoicing'), and our architects will select the best-fitting technology stack for you."
    },
    {
      question: "Is there any cost or commitment to use the Solution Finder?",
      answer: "No, the Solution Finder and the initial discovery consultation are 100% free with zero obligation. We believe in demonstrating clear value and architectural clarity before you make any investment decision."
    },
    {
      question: "Can Sunsolv integrate with our existing software and databases?",
      answer: "Yes. We routinely integrate with Salesforce, Zoho, HubSpot, SAP, custom SQL databases, payment gateways, WhatsApp Business API, and bespoke legacy systems through secure REST/GraphQL APIs and webhooks."
    },
    {
      question: "Do you work with international clients outside India?",
      answer: "Absolutely. We partner with businesses across the United States, UK, UAE, Europe, Singapore, and Australia, providing flexible time-zone coverage, transparent sprint communications, and international invoicing."
    }
  ];

  toggle(index: number) {
    if (this.activeIdx() === index) {
      this.activeIdx.set(-1);
    } else {
      this.activeIdx.set(index);
    }
  }
}
