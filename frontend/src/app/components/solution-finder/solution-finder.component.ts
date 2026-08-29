import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SolutionService, CategoryOption, SituationOption, InvestmentTier } from '../../services/solution.service';
import { CrmApiService } from '../../services/crm-api.service';
import { EnquiryRecord, SolutionBlueprint } from '../../models/enquiry.model';

@Component({
  selector: 'app-solution-finder',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="finder-section" id="solutionFinderApp">
      <div class="finder-container">
        
        <div class="wizard-card-wrapper" id="wizardCard" *ngIf="!solutionService.activeDossier()">
          
          <!-- Wizard Header & Progress Bar -->
          <div class="wizard-header">
            <div class="wizard-header-top">
              <div class="wizard-title-badge">
                <i class="fa-solid fa-sliders"></i>
                <span>Interactive Solution Assessment</span>
              </div>
              <div class="step-indicator" id="stepCounterText">
                Step <span>{{ currentStep() }}</span> of 8
              </div>
            </div>

            <!-- Multi-step Visual Progress Bar -->
            <div class="progress-bar-container">
              <div class="progress-bar-fill" [style.width.%]="(currentStep() / 8) * 100"></div>
            </div>

            <!-- Wizard Breadcrumbs Track -->
            <div class="wizard-steps-track" id="wizardStepsTrack">
              <div class="step-node" [class.active]="currentStep() === 1" [class.completed]="currentStep() > 1">1. Category</div>
              <div class="step-node" [class.active]="currentStep() === 2" [class.completed]="currentStep() > 2">2. Goals</div>
              <div class="step-node" [class.active]="currentStep() === 3" [class.completed]="currentStep() > 3">3. Situation</div>
              <div class="step-node" [class.active]="currentStep() === 4" [class.completed]="currentStep() > 4">4. Profile</div>
              <div class="step-node" [class.active]="currentStep() === 5" [class.completed]="currentStep() > 5">5. Success</div>
              <div class="step-node" [class.active]="currentStep() === 6" [class.completed]="currentStep() > 6">6. Investment</div>
              <div class="step-node" [class.active]="currentStep() === 7" [class.completed]="currentStep() > 7">7. Assets</div>
              <div class="step-node" [class.active]="currentStep() === 8" [class.completed]="currentStep() > 8">8. Delivery</div>
            </div>
          </div>

          <!-- Wizard Body Form -->
          <div class="wizard-body">
            
            <!-- STEP 1: What are you looking for? -->
            <div class="wizard-step-pane" [class.active]="currentStep() === 1">
              <div class="step-heading-group">
                <span class="step-tag">Step 1 — Solution Direction</span>
                <h2 class="step-title">What are you looking for?</h2>
                <p class="step-desc">Select the area that best represents your vision, or choose "Not Sure" if you want us to diagnose from scratch.</p>
              </div>

              <div class="cards-grid-step1">
                <div 
                  *ngFor="let cat of solutionService.categories"
                  class="selection-card"
                  [class.highlight-card]="cat.highlight"
                  [class.selected]="selectedCategory === cat.id"
                  (click)="selectCategory(cat)"
                >
                  <div class="card-icon-bubble">{{ cat.icon }}</div>
                  <div class="card-content">
                    <h3 class="card-name">{{ cat.name }}</h3>
                    <p class="card-subtext">{{ cat.subtext }}</p>
                  </div>
                  <div *ngIf="cat.highlight" class="card-badge">Popular for Owners</div>
                  <div class="card-check"><i class="fa-solid fa-circle-check"></i></div>
                </div>
              </div>

              <div class="validation-message" [class.show]="validationMsg() && currentStep() === 1">
                {{ validationMsg() }}
              </div>
            </div>

            <!-- STEP 2: Business Improvement Goals (Multi-Select) -->
            <div class="wizard-step-pane" [class.active]="currentStep() === 2">
              <div class="step-heading-group">
                <span class="step-tag">Step 2 — Business Outcomes</span>
                <h2 class="step-title">What would you like to improve in your business?</h2>
                <p class="step-desc">Select all objectives that apply. We formulate our technical recommendations around these tangible outcomes.</p>
              </div>

              <div class="multi-select-grid">
                <label 
                  *ngFor="let goal of solutionService.goalsList"
                  class="multi-select-item"
                  [class.selected]="isGoalSelected(goal.title)"
                  (click)="toggleGoal(goal.title, $event)"
                >
                  <div class="item-inner">
                    <div class="checkbox-box"><i class="fa-solid fa-check" *ngIf="isGoalSelected(goal.title)"></i></div>
                    <div class="item-label-group">
                      <span class="item-title">{{ goal.icon }} {{ goal.title }}</span>
                      <span class="item-sub">{{ goal.sub }}</span>
                    </div>
                  </div>
                </label>
              </div>

              <div class="validation-message" [class.show]="validationMsg() && currentStep() === 2">
                {{ validationMsg() }}
              </div>
            </div>

            <!-- STEP 3: Current Situation (Dynamic Adaptive) -->
            <div class="wizard-step-pane" [class.active]="currentStep() === 3">
              <div class="step-heading-group">
                <span class="step-tag">Step 3 — Baseline Analysis</span>
                <h2 class="step-title">Where are you currently?</h2>
                <p class="step-desc">{{ currentSituations().subtext }}</p>
              </div>

              <div class="dynamic-situation-grid">
                <div 
                  *ngFor="let opt of currentSituations().options"
                  class="situation-card"
                  [class.selected]="selectedSituation === opt.title"
                  (click)="selectSituation(opt.title)"
                >
                  <div class="situation-radio-circle">
                    <div class="situation-radio-inner"></div>
                  </div>
                  <div class="situation-text-block">
                    <span class="situation-title">{{ opt.title }}</span>
                    <span class="situation-sub">{{ opt.sub }}</span>
                  </div>
                </div>
              </div>

              <div class="validation-message" [class.show]="validationMsg() && currentStep() === 3">
                {{ validationMsg() }}
              </div>
            </div>

            <!-- STEP 4: Business Profile -->
            <div class="wizard-step-pane" [class.active]="currentStep() === 4">
              <div class="step-heading-group">
                <span class="step-tag">Step 4 — Organization Context</span>
                <h2 class="step-title">Tell us a little about your business.</h2>
                <p class="step-desc">This helps us gauge enterprise compliance, scale dynamics, and relevant industry best practices.</p>
              </div>

              <div class="form-grid-three-col">
                <!-- Industry -->
                <div class="form-group-card">
                  <label class="form-label-header"><i class="fa-solid fa-industry"></i> Industry</label>
                  <div class="custom-select-wrapper">
                    <select [(ngModel)]="profile.industry" class="custom-form-select">
                      <option value="" disabled selected>Select Industry</option>
                      <option value="Real Estate">Real Estate & Construction</option>
                      <option value="Healthcare">Healthcare & Life Sciences</option>
                      <option value="Education">Education & EdTech</option>
                      <option value="Retail">Retail & Consumer Goods</option>
                      <option value="Ecommerce">Ecommerce & D2C Brands</option>
                      <option value="Manufacturing">Manufacturing & Engineering</option>
                      <option value="Finance">Finance & FinTech</option>
                      <option value="Insurance">Insurance & InsurTech</option>
                      <option value="Hospitality">Hospitality & Tourism</option>
                      <option value="Professional Services">Professional & Legal Services</option>
                      <option value="Logistics">Logistics & Supply Chain</option>
                      <option value="Startup">Tech Startup / Emerging Venture</option>
                      <option value="Other">Other Specialized Sector</option>
                    </select>
                  </div>
                </div>

                <!-- Company Size -->
                <div class="form-group-card">
                  <label class="form-label-header"><i class="fa-solid fa-users"></i> Company Size (Team)</label>
                  <div class="pill-radio-group">
                    <label 
                      *ngFor="let size of ['1–10', '11–50', '51–200', '201–500', '500+']"
                      class="pill-radio-option"
                      [class.active]="profile.companySize === size"
                      (click)="profile.companySize = size"
                    >
                      <span>{{ size }}</span>
                    </label>
                  </div>
                </div>

                <!-- Business Stage -->
                <div class="form-group-card">
                  <label class="form-label-header"><i class="fa-solid fa-chart-line"></i> Business Stage</label>
                  <div class="pill-radio-group vertical-pills">
                    <label 
                      *ngFor="let st of [
                        { val: 'Idea / Startup', label: '🌱 Idea / Early Startup' },
                        { val: 'Growing business', label: '🚀 Growing Business' },
                        { val: 'Established company', label: '🏛️ Established Company' },
                        { val: 'Enterprise', label: '🏢 Enterprise Corporation' }
                      ]"
                      class="pill-radio-option"
                      [class.active]="profile.businessStage === st.val"
                      (click)="profile.businessStage = st.val"
                    >
                      <span>{{ st.label }}</span>
                    </label>
                  </div>
                </div>
              </div>

              <div class="validation-message" [class.show]="validationMsg() && currentStep() === 4">
                {{ validationMsg() }}
              </div>
            </div>

            <!-- STEP 5: Success Metric -->
            <div class="wizard-step-pane" [class.active]="currentStep() === 5">
              <div class="step-heading-group">
                <span class="step-tag">Step 5 — Target Success Metrics</span>
                <h2 class="step-title">What would success look like for you?</h2>
                <p class="step-desc">Define your North Star metric. What tangible breakthrough must this project deliver for you to consider it a 100% win?</p>
              </div>

              <div class="suggestion-chips-container">
                <span class="chips-label"><i class="fa-solid fa-lightbulb"></i> Click to insert inspiration:</span>
                <div class="chips-wrap">
                  <button type="button" class="chip-btn" (click)="insertSuccess('We want to generate 100+ qualified enquiries and inbound leads every month.')">
                    "100+ qualified leads/mo"
                  </button>
                  <button type="button" class="chip-btn" (click)="insertSuccess('We want to automate our billing, onboarding, and lead assignment process to save 40+ staff hours/week.')">
                    "Automate billing & save 40 hrs/wk"
                  </button>
                  <button type="button" class="chip-btn" (click)="insertSuccess('We want to build and launch our scalable SaaS MVP in 90 days to onboard first 50 paying customers.')">
                    "Launch SaaS MVP in 90 days"
                  </button>
                  <button type="button" class="chip-btn" (click)="insertSuccess('We want a modern, high-converting website redesign that ranks on Google page 1 for key business terms.')">
                    "Redesign website & rank page 1"
                  </button>
                  <button type="button" class="chip-btn" (click)="insertSuccess('We want to eliminate Excel sheets and run company operations on a secure custom ERP portal.')">
                    "Replace Excel with custom ERP"
                  </button>
                </div>
              </div>

              <div class="success-textarea-wrapper">
                <textarea 
                  [(ngModel)]="successVision"
                  class="custom-textarea" 
                  rows="4" 
                  placeholder="Example: “We want to generate 100 qualified enquiries every month,” “We want to automate our billing process,” or “We want to launch our SaaS product.”"
                ></textarea>
                <div class="textarea-footer">
                  <span class="char-tip"><i class="fa-solid fa-circle-info"></i> Specific metrics help our solution architects propose exact ROI timelines.</span>
                </div>
              </div>

              <div class="validation-message" [class.show]="validationMsg() && currentStep() === 5">
                {{ validationMsg() }}
              </div>
            </div>

            <!-- STEP 6: Investment & Timeline -->
            <div class="wizard-step-pane" [class.active]="currentStep() === 6">
              <div class="step-heading-group">
                <span class="step-tag">Step 6 — Budget & Timeline Alignment</span>
                <h2 class="step-title">What level of investment & timeline are you considering?</h2>
                <p class="step-desc">Transparent guidance ensures we design an architecture that maximizes value within your comfortable parameters.</p>
              </div>

              <div class="investment-timeline-container">
                <!-- Investment Level -->
                <div class="investment-box">
                  <div class="box-header-row">
                    <label class="form-label-header"><i class="fa-solid fa-wallet"></i> Level of Investment</label>
                    
                    <!-- Currency Switcher -->
                    <div class="currency-toggle-wrapper">
                      <span class="currency-label">Currency:</span>
                      <div class="currency-switch">
                        <button 
                          *ngFor="let c of ['INR', 'USD', 'EUR', 'GBP']"
                          type="button" 
                          class="curr-btn" 
                          [class.active]="currency === c"
                          (click)="setCurrency(c)"
                        >
                          {{ getCurrencySymbol(c) }} {{ c }}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div class="investment-tier-grid">
                    <div 
                      *ngFor="let tier of currentInvestmentTiers"
                      class="tier-card"
                      [class.selected]="selectedInvestment === tier.title"
                      (click)="selectedInvestment = tier.title"
                    >
                      <span class="tier-title">{{ tier.title }}</span>
                      <span class="tier-sub">{{ tier.sub }}</span>
                    </div>
                  </div>
                </div>

                <!-- Timeline -->
                <div class="timeline-box">
                  <label class="form-label-header"><i class="fa-regular fa-calendar-check"></i> When would you like to start?</label>
                  
                  <div class="timeline-options-grid">
                    <label 
                      *ngFor="let t of [
                        { val: 'Immediately', badge: 'urgent', badgeText: 'High Priority', sub: 'Ready to kick off this week' },
                        { val: 'Within 30 days', badge: 'standard', badgeText: 'Active', sub: 'Planning phase underway' },
                        { val: '1–3 months', badge: 'medium', badgeText: 'Upcoming', sub: 'Next quarter roadmap' },
                        { val: '3–6 months', badge: 'future', badgeText: 'Future', sub: 'Budgeting & evaluation' },
                        { val: 'Just exploring', badge: 'info', badgeText: 'Exploring', sub: 'Gathering ideas & feasibility' }
                      ]"
                      class="timeline-option-card"
                      [class.selected]="selectedTimeline === t.val"
                      (click)="selectedTimeline = t.val"
                    >
                      <div class="timeline-card-inner">
                        <span class="t-badge {{ t.badge }}">{{ t.badgeText }}</span>
                        <span class="t-title">{{ t.val }}</span>
                        <span class="t-sub">{{ t.sub }}</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div class="validation-message" [class.show]="validationMsg() && currentStep() === 6">
                {{ validationMsg() }}
              </div>
            </div>

            <!-- STEP 7: Existing Digital Presence (Optional) -->
            <div class="wizard-step-pane" [class.active]="currentStep() === 7">
              <div class="step-heading-group">
                <span class="step-tag">Step 7 — Digital Footprint (Optional)</span>
                <h2 class="step-title">Share anything you'd like us to review.</h2>
                <p class="step-desc">Provide your current assets, inspiration links, or RFP document so our technical team can conduct a free pre-audit.</p>
              </div>

              <div class="links-form-grid">
                <div class="form-field-wrapper">
                  <label class="input-label"><i class="fa-solid fa-globe"></i> Existing Website URL</label>
                  <div class="input-with-prefix">
                    <span class="url-prefix">https://</span>
                    <input type="text" [(ngModel)]="digitalPresence.websiteUrl" class="custom-text-input" placeholder="yourcompany.com" />
                  </div>
                </div>

                <div class="form-field-wrapper">
                  <label class="input-label"><i class="fa-solid fa-mobile-screen"></i> App / Product / Demo URL</label>
                  <div class="input-with-prefix">
                    <span class="url-prefix">https://</span>
                    <input type="text" [(ngModel)]="digitalPresence.appUrl" class="custom-text-input" placeholder="app.yourcompany.com" />
                  </div>
                </div>

                <div class="form-field-wrapper">
                  <label class="input-label"><i class="fa-solid fa-bullseye"></i> Competitor or Benchmark Inspiration URL</label>
                  <div class="input-with-prefix">
                    <span class="url-prefix">https://</span>
                    <input type="text" [(ngModel)]="digitalPresence.competitorUrl" class="custom-text-input" placeholder="inspiration-company.com" />
                  </div>
                </div>

                <!-- Dropzone -->
                <div class="form-field-wrapper full-width">
                  <label class="input-label"><i class="fa-solid fa-file-arrow-up"></i> Upload Requirement / RFP / Scope Document (Optional)</label>
                  <div class="file-dropzone" (click)="fileInput.click()">
                    <input #fileInput type="file" class="hidden-file-input" (change)="onFileSelected($event)" accept=".pdf,.doc,.docx,.ppt,.pptx,.zip,.png,.jpg" />
                    <div class="dropzone-inner">
                      <div class="dropzone-icon" [style.color]="digitalPresence.fileName ? '#10b981' : '#48cae4'">
                        <i [class]="digitalPresence.fileName ? 'fa-solid fa-file-circle-check' : 'fa-solid fa-cloud-arrow-up'"></i>
                      </div>
                      <span class="dropzone-text" *ngIf="!digitalPresence.fileName">
                        <strong>Click to browse</strong> or drag & drop RFP / Scope Document
                      </span>
                      <span class="dropzone-text" *ngIf="digitalPresence.fileName" style="color:#6ee7b7;">
                        <strong>Attached:</strong> {{ digitalPresence.fileName }}
                      </span>
                      <span class="dropzone-sub">PDF, DOCX, PPTX, ZIP up to 25MB</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="optional-step-note">
                <i class="fa-solid fa-circle-check"></i> This step is optional. You can proceed directly if you don't have existing links.
              </div>
            </div>

            <!-- STEP 8: Contact Details & Recommendation Delivery -->
            <div class="wizard-step-pane" [class.active]="currentStep() === 8">
              <div class="step-heading-group">
                <span class="step-tag">Step 8 — Instant Blueprint Delivery</span>
                <h2 class="step-title">Where should we send your customized recommendations?</h2>
                <p class="step-desc">Enter your business details below to unlock your immediate Recommended Solution blueprint and receive a copy by email.</p>
              </div>

              <div class="contact-form-grid">
                <div class="form-field-wrapper">
                  <label class="input-label"><i class="fa-solid fa-user"></i> Full Name <span class="req">*</span></label>
                  <input type="text" [(ngModel)]="contact.name" class="custom-text-input" placeholder="e.g. Prasad Reddy" required />
                </div>

                <div class="form-field-wrapper">
                  <label class="input-label"><i class="fa-solid fa-building"></i> Company / Organization <span class="req">*</span></label>
                  <input type="text" [(ngModel)]="contact.company" class="custom-text-input" placeholder="e.g. Sunsolv Innovations" required />
                </div>

                <div class="form-field-wrapper">
                  <label class="input-label"><i class="fa-solid fa-envelope"></i> Business Email <span class="req">*</span></label>
                  <input type="email" [(ngModel)]="contact.email" class="custom-text-input" placeholder="prasad@company.com" required />
                </div>

                <div class="form-field-wrapper">
                  <label class="input-label"><i class="fa-brands fa-whatsapp"></i> Phone / WhatsApp Number <span class="req">*</span></label>
                  <input type="tel" [(ngModel)]="contact.phone" class="custom-text-input" placeholder="+91 98765 43210" required />
                </div>

                <div class="form-field-wrapper full-width">
                  <label class="input-label"><i class="fa-solid fa-earth-americas"></i> Country / Region <span class="req">*</span></label>
                  <select [(ngModel)]="contact.country" class="custom-form-select">
                    <option value="India">🇮🇳 India</option>
                    <option value="United States">🇺🇸 United States</option>
                    <option value="United Kingdom">🇬🇧 United Kingdom</option>
                    <option value="United Arab Emirates">🇦🇪 United Arab Emirates</option>
                    <option value="Singapore">🇸🇬 Singapore</option>
                    <option value="Australia">🇦🇺 Australia</option>
                    <option value="Canada">🇨🇦 Canada</option>
                    <option value="Germany">🇩🇪 Germany</option>
                    <option value="Saudi Arabia">🇸🇦 Saudi Arabia</option>
                    <option value="Other">🌍 Other International</option>
                  </select>
                </div>

                <!-- Anti-Spam Security CAPTCHA Challenge -->
                <div class="form-field-wrapper full-width captcha-section-wrapper">
                  <label class="input-label">
                    <i class="fa-solid fa-shield-halved"></i>
                    <span>Security Verification <span class="req">*</span></span>
                  </label>
                  <div class="captcha-box-container">
                    <div class="captcha-visual-badge">
                      <div class="captcha-code-display" title="Security Challenge Code">
                        <span class="captcha-char" *ngFor="let ch of captchaCodeArray">{{ ch }}</span>
                      </div>
                      <button type="button" class="btn-refresh-captcha" (click)="generateCaptcha()" title="Get a new verification code">
                        <i class="fa-solid fa-rotate-right"></i>
                      </button>
                    </div>
                    <div class="captcha-input-wrapper">
                      <input 
                        type="text" 
                        [(ngModel)]="captchaInput" 
                        class="custom-text-input captcha-input" 
                        placeholder="Type the 4 characters shown on left" 
                        maxlength="6"
                        autocomplete="off"
                        required 
                      />
                    </div>
                  </div>
                  <span class="captcha-hint">
                    <i class="fa-solid fa-circle-info"></i> Please enter the 4 security characters above to prevent automated bot submissions.
                  </span>
                </div>
              </div>

              <div class="privacy-guarantee-box">
                <i class="fa-solid fa-lock"></i>
                <span>We respect your privacy. No spam guaranteed. Your requirement is handled under standard mutual non-disclosure policy.</span>
              </div>

              <div class="validation-message" [class.show]="validationMsg() && currentStep() === 8">
                {{ validationMsg() }}
              </div>
            </div>

            <!-- Wizard Footer Action Buttons -->
            <div class="wizard-footer">
              <button 
                type="button" 
                class="btn btn-wizard-back" 
                *ngIf="currentStep() > 1" 
                (click)="prevStep()"
              >
                <i class="fa-solid fa-arrow-left"></i>
                <span>Previous</span>
              </button>

              <div class="wizard-footer-right">
                <button 
                  type="button" 
                  class="btn btn-wizard-next glow-button" 
                  *ngIf="currentStep() < 8" 
                  (click)="nextStep()"
                >
                  <span>Continue</span>
                  <i class="fa-solid fa-arrow-right"></i>
                </button>

                <button 
                  type="button" 
                  class="btn btn-wizard-submit glow-button" 
                  *ngIf="currentStep() === 8" 
                  [disabled]="isSubmitting()"
                  (click)="submitEnquiry()"
                >
                  <i class="fa-solid" [class.fa-wand-magic-sparkles]="!isSubmitting()" [class.fa-spinner]="isSubmitting()" [class.fa-spin]="isSubmitting()"></i>
                  <span>{{ isSubmitting() ? 'Analyzing Solution...' : 'Get My Business Solution' }}</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  `
})
export class SolutionFinderComponent implements OnInit {
  currentStep = signal<number>(1);
  validationMsg = signal<string>('');
  isSubmitting = signal<boolean>(false);

  selectedCategory = 'website';
  selectedCategoryName = 'Build a Website';
  selectedGoals: string[] = [];
  selectedSituation = '';
  
  profile = {
    industry: '',
    companySize: '',
    businessStage: ''
  };

  successVision = '';
  currency = 'INR';
  selectedInvestment = '';
  selectedTimeline = '';

  digitalPresence = {
    websiteUrl: '',
    appUrl: '',
    competitorUrl: '',
    fileName: ''
  };

  contact = {
    name: '',
    company: '',
    email: '',
    phone: '',
    country: 'India'
  };

  // Anti-Spam Security CAPTCHA Challenge State
  captchaCode = '';
  captchaCodeArray: string[] = [];
  captchaInput = '';

  currentSituations = signal<{ subtext: string; options: SituationOption[] }>({ subtext: '', options: [] });
  currentInvestmentTiers: InvestmentTier[] = [];

  constructor(
    public solutionService: SolutionService,
    private crmApi: CrmApiService
  ) {}

  ngOnInit() {
    this.updateDynamicSituations('website');
    this.updateInvestmentTiers('INR');
    this.generateCaptcha();
  }

  generateCaptcha() {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    this.captchaCode = code;
    this.captchaCodeArray = code.split('');
    this.captchaInput = '';
  }

  selectCategory(cat: CategoryOption) {
    this.selectedCategory = cat.id;
    this.selectedCategoryName = cat.name;
    this.validationMsg.set('');
    this.updateDynamicSituations(cat.id);
  }

  updateDynamicSituations(catId: string) {
    const sit = this.solutionService.getSituationsForCategory(catId);
    this.currentSituations.set(sit);
  }

  isGoalSelected(title: string): boolean {
    return this.selectedGoals.includes(title);
  }

  toggleGoal(title: string, event: Event) {
    event.preventDefault();
    if (this.selectedGoals.includes(title)) {
      this.selectedGoals = this.selectedGoals.filter(g => g !== title);
    } else {
      this.selectedGoals.push(title);
    }
    if (this.selectedGoals.length > 0) this.validationMsg.set('');
  }

  selectSituation(title: string) {
    this.selectedSituation = title;
    this.validationMsg.set('');
  }

  insertSuccess(promptText: string) {
    this.successVision = promptText;
    this.validationMsg.set('');
  }

  setCurrency(c: string) {
    this.currency = c;
    this.updateInvestmentTiers(c);
  }

  getCurrencySymbol(c: string): string {
    if (c === 'INR') return '₹';
    if (c === 'USD') return '$';
    if (c === 'EUR') return '€';
    if (c === 'GBP') return '£';
    return '';
  }

  updateInvestmentTiers(c: string) {
    this.currentInvestmentTiers = this.solutionService.getInvestmentTiers(c);
  }

  onFileSelected(event: any) {
    const file = event.target.files?.[0];
    if (file) {
      this.digitalPresence.fileName = file.name;
    }
  }

  validateStep(step: number): boolean {
    this.validationMsg.set('');
    switch (step) {
      case 1:
        if (!this.selectedCategory) {
          this.validationMsg.set('Please select what you are looking for to proceed.');
          return false;
        }
        return true;
      case 2:
        if (this.selectedGoals.length === 0) {
          this.validationMsg.set('Please select at least one business goal or improvement.');
          return false;
        }
        return true;
      case 3:
        if (!this.selectedSituation) {
          this.validationMsg.set('Please select your current baseline situation to proceed.');
          return false;
        }
        return true;
      case 4:
        if (!this.profile.industry || !this.profile.companySize || !this.profile.businessStage) {
          this.validationMsg.set('Please select Industry, Company Size, and Business Stage.');
          return false;
        }
        return true;
      case 5:
        if (!this.successVision.trim()) {
          this.validationMsg.set('Please write a brief sentence or click an example above.');
          return false;
        }
        return true;
      case 6:
        if (!this.selectedInvestment || !this.selectedTimeline) {
          this.validationMsg.set('Please select an investment level and start timeline.');
          return false;
        }
        return true;
      case 7:
        return true; // optional
      case 8:
        if (!this.contact.name?.trim() || !this.contact.company?.trim() || !this.contact.email?.trim() || !this.contact.phone?.trim() || !this.contact.country) {
          this.validationMsg.set('Please complete all required contact fields.');
          return false;
        }
        if (!this.contact.email.includes('@') || !this.contact.email.includes('.')) {
          this.validationMsg.set('Please enter a valid corporate email address.');
          return false;
        }
        if (!this.captchaInput?.trim()) {
          this.validationMsg.set('Please enter the security verification code.');
          return false;
        }
        if (this.captchaInput.trim().toUpperCase() !== this.captchaCode.toUpperCase()) {
          this.validationMsg.set('Security verification code is incorrect. Please re-enter the characters shown in the security box.');
          this.generateCaptcha();
          return false;
        }
        return true;
      default:
        return true;
    }
  }

  nextStep() {
    if (this.validateStep(this.currentStep())) {
      this.currentStep.update(s => s + 1);
    }
  }

  prevStep() {
    if (this.currentStep() > 1) {
      this.currentStep.update(s => s - 1);
    }
  }

  submitEnquiry() {
    if (!this.validateStep(8)) return;

    this.isSubmitting.set(true);

    const payload: Partial<EnquiryRecord> = {
      contact: this.contact,
      category: this.selectedCategory,
      categoryName: this.selectedCategoryName,
      goals: this.selectedGoals,
      situation: this.selectedSituation,
      profile: this.profile,
      successVision: this.successVision,
      investment: this.selectedInvestment,
      currency: this.currency,
      timeline: this.selectedTimeline,
      digitalPresence: this.digitalPresence
    };

    // Generate tailored blueprint via Recommendation Engine
    const blueprint = this.solutionService.computeRecommendation(payload);
    payload.solutionBlueprint = blueprint;

    // Send to dedicated CRM backend API
    this.crmApi.submitEnquiry(payload).subscribe({
      next: (res) => {
        this.isSubmitting.set(false);
        const record = res.data || { ...payload, status: 'New' as const };
        this.solutionService.activeDossier.set(record as EnquiryRecord);
        this.triggerCelebration();
      },
      error: (err) => {
        console.warn('CRM API network error, utilizing client-side fallback blueprint:', err);
        this.isSubmitting.set(false);
        this.solutionService.activeDossier.set(payload as EnquiryRecord);
        this.triggerCelebration();
      }
    });
  }

  triggerCelebration() {
    const el = document.getElementById('solutionFinderApp');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
