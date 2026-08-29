/**
 * SUNSOLV TECHNOLOGIES - BUSINESS SOLUTION FINDER ENGINE
 * State Management, Dynamic Branching, Recommendation System, Multi-Currency, and Actions
 */

// Global Application State
const finderState = {
  currentStep: 1,
  totalSteps: 8,
  selectedCategory: '',
  selectedCategoryName: '',
  selectedGoals: [],
  selectedSituation: '',
  profile: {
    industry: '',
    companySize: '',
    businessStage: ''
  },
  successVision: '',
  currency: 'INR',
  selectedInvestment: '',
  selectedTimeline: '',
  digitalPresence: {
    websiteUrl: '',
    appUrl: '',
    competitorUrl: '',
    fileName: ''
  },
  contact: {
    name: '',
    company: '',
    email: '',
    phone: '',
    country: 'India'
  }
};

// Dynamic Situation Database per Category
const situationDatabase = {
  website: {
    subtext: "What is the primary challenge or status with your website?",
    options: [
      { id: "no_site", title: "I don't have a website yet", sub: "Looking to build a strong initial digital presence" },
      { id: "outdated_site", title: "I have an outdated website", sub: "Visuals and tech feel obsolete and unengaging" },
      { id: "no_leads", title: "My website doesn't generate enquiries", sub: "Traffic visits but bounces without converting" },
      { id: "complete_redesign", title: "I need a complete redesign & revamp", sub: "Brand refresh with modern speed and aesthetics" },
      { id: "ecommerce_needed", title: "I need an ecommerce online store", sub: "Product catalog, payments & order handling" },
      { id: "better_seo", title: "I need better SEO & Google rankings", sub: "Want to appear on Page 1 for high-intent keywords" },
      { id: "speed_performance", title: "I need better speed & mobile performance", sub: "Current site is slow and fails Core Web Vitals" }
    ]
  },
  app: {
    subtext: "Where are you in your application development lifecycle?",
    options: [
      { id: "concept_wireframe", title: "Have a concept / wireframes ready", sub: "Need a full development team to build the MVP" },
      { id: "cross_platform_mobile", title: "Need iOS + Android Mobile App", sub: "Cross-platform Flutter / React Native build" },
      { id: "saas_web_app", title: "Need a scalable SaaS Web Application", sub: "Multi-tenant architecture with user auth & billing" },
      { id: "app_overhaul", title: "Existing app needs complete overhaul", sub: "Bug fixes, speed optimization, UI modernization" },
      { id: "backend_api", title: "Need robust backend, APIs & Database", sub: "Reliable microservices and cloud infrastructure" }
    ]
  },
  digital_transformation: {
    subtext: "What part of your operation needs digital modernisation?",
    options: [
      { id: "paper_manual", title: "Still dependent on paper & manual approvals", sub: "Prone to human error, delays and missing records" },
      { id: "siloed_tools", title: "Multiple disconnected tools creating data silos", sub: "Staff waste hours duplicating data across systems" },
      { id: "client_onboarding", title: "Need digital client onboarding & self-service", sub: "Customers expect instant mobile-first service" },
      { id: "analytics_dashboards", title: "Lack real-time operational insights", sub: "Management lacks live visibility on KPIs & revenue" }
    ]
  },
  cloud: {
    subtext: "What is your current cloud infrastructure setup?",
    options: [
      { id: "migrate_to_aws", title: "Currently on legacy servers, want to migrate to AWS/GCP", sub: "Need zero-downtime structured migration" },
      { id: "high_cloud_cost", title: "High hosting bills, need cost optimization", sub: "Architecture review to cut cloud waste by 30-50%" },
      { id: "frequent_downtime", title: "Experiencing downtime during traffic spikes", sub: "Need auto-scaling, load balancing and high availability" },
      { id: "devops_cicd", title: "Need automated CI/CD and disaster recovery", sub: "Reliable staging, automated tests and instant rollbacks" }
    ]
  },
  ai_automation: {
    subtext: "Where is manual effort draining your company resources?",
    options: [
      { id: "repetitive_data", title: "Repetitive data entry & manual email tasks", sub: "Want automated workflow pipelines (Zapier/Make/Python)" },
      { id: "whatsapp_bot", title: "Need AI WhatsApp & Website Assistant", sub: "24/7 intelligent lead qualification and support bot" },
      { id: "doc_processing", title: "Need automated document & invoice extraction", sub: "OCR and LLM extraction from PDFs directly into ERP" },
      { id: "custom_llm", title: "Want custom AI models on company data", sub: "Secure internal intelligence and search assistant" }
    ]
  },
  marketing: {
    subtext: "What is the biggest hurdle in your marketing funnel?",
    options: [
      { id: "low_google_traffic", title: "Low organic traffic on Google", sub: "Competitors outrank us on search keywords" },
      { id: "high_ad_cpa", title: "High Google / Meta Ad costs with low ROAS", sub: "Need optimized landing pages and targeted campaigns" },
      { id: "local_visibility", title: "Weak local Google Map presence", sub: "Missing high-intent local customer phone enquiries" },
      { id: "ai_search_geo", title: "Need GEO / AIO visibility for AI search", sub: "Want to be recommended by ChatGPT, Perplexity & Gemini" }
    ]
  },
  ecommerce: {
    subtext: "What is your ecommerce expansion status?",
    options: [
      { id: "launch_d2c", title: "Launching a new D2C / B2C brand", sub: "Need high-converting Shopify / custom storefront" },
      { id: "poor_conversion", title: "Have a store but visitors don't buy", sub: "Need UX redesign, fast checkout and speed boost" },
      { id: "b2b_portal", title: "Need B2B wholesale / dealer order portal", sub: "Tiered pricing, credit terms and bulk ordering" },
      { id: "erp_sync", title: "Need inventory, ERP and shipping automation", sub: "Automatic order routing to courier & warehouse" }
    ]
  },
  software: {
    subtext: "What is your current business software situation?",
    options: [
      { id: "excel_manual", title: "Currently using Excel / manual processes", sub: "Outgrowing spreadsheets, need centralized database" },
      { id: "unhappy_software", title: "Using existing software but unhappy with it", sub: "Clunky UI, missing features, poor support" },
      { id: "bespoke_custom", title: "Need custom software tailored to our workflow", sub: "Standard SaaS doesn't fit our unique business model" },
      { id: "integrate_systems", title: "Need to integrate multiple internal systems", sub: "Connect CRM, accounting, inventory and website" },
      { id: "mobile_web_portal", title: "Need mobile + web applications for team & clients", sub: "Role-based portals for executives, staff & buyers" }
    ]
  },
  improve_system: {
    subtext: "What is wrong with your current system?",
    options: [
      { id: "slow_loading", title: "Slow loading times and laggy database", sub: "Performance is hurting user retention and sales" },
      { id: "outdated_ui", title: "Outdated UI/UX causing user drop-offs", sub: "Need modern, intuitive interface overhaul" },
      { id: "bugs_crashes", title: "Frequent bugs, crashes and security risks", sub: "Need code audit, refactoring and stability patches" },
      { id: "api_integrations", title: "Need new 3rd party APIs & payment gateways", sub: "Syncing with modern SaaS, payment APIs and webhooks" }
    ]
  },
  idea: {
    subtext: "What stage is your product idea currently in?",
    options: [
      { id: "rough_concept", title: "Rough concept looking for technical roadmap", sub: "Need feasibility study, tech stack selection and architecture" },
      { id: "need_prototype", title: "Need interactive prototype & investor demo", sub: "Figma clickable prototype to raise seed funding" },
      { id: "ready_to_build", title: "Ready to build MVP in 60-90 days", sub: "Looking for dedicated full-stack development team" },
      { id: "tech_partner", title: "Looking for long-term CTO / Tech Partner", sub: "Strategic engineering partner without hiring expensive team" }
    ]
  },
  not_sure: {
    subtext: "What best describes your general business goal?",
    options: [
      { id: "diagnose_needs", title: "We know our business problems, but not the tech", sub: "Need Sunsolv architects to conduct a diagnostic audit" },
      { id: "growth_strategy", title: "We want to grow revenue & digital customer acquisition", sub: "Need an integrated digital marketing & web strategy" },
      { id: "operational_efficiency", title: "We want to reduce staff time on repetitive work", sub: "Need process automation & software recommendations" },
      { id: "build_vs_buy", title: "Need advice on building custom vs buying SaaS", sub: "Cost and scalability evaluation for our business model" }
    ]
  }
};

// Investment Tiers Database
const investmentDatabase = {
  INR: [
    { title: "Not sure yet — need guidance", sub: "Help me evaluate ROI first" },
    { title: "₹50,000 – ₹1 Lakh", sub: "Essential digital solutions & starter sprints" },
    { title: "₹1 Lakh – ₹3 Lakh", sub: "Standard web/app, SEO & basic automation" },
    { title: "₹3 Lakh – ₹5 Lakh", sub: "Comprehensive custom web, software or growth engine" },
    { title: "₹5 Lakh – ₹10 Lakh", sub: "Advanced SaaS, custom ERP or full digital stack" },
    { title: "₹10 Lakh+", sub: "Enterprise transformation & end-to-end ecosystems" },
    { title: "Let's discuss", sub: "Flexible milestone-based investment" }
  ],
  USD: [
    { title: "Not sure yet — need guidance", sub: "Help me evaluate ROI first" },
    { title: "$1,000 – $2,500", sub: "Essential starter solutions" },
    { title: "$2,500 – $5,000", sub: "Professional web, mobile & SEO sprint" },
    { title: "$5,000 – $10,000", sub: "Custom web app, AI automation & growth engine" },
    { title: "$10,000 – $25,000", sub: "Full SaaS MVP, custom portal & cloud architecture" },
    { title: "$25,000+", sub: "Enterprise scale software & multi-tier platforms" },
    { title: "Let's discuss", sub: "Custom scoped roadmap" }
  ],
  EUR: [
    { title: "Not sure yet — need guidance", sub: "Help me evaluate ROI first" },
    { title: "€1,000 – €2,500", sub: "Essential starter solutions" },
    { title: "€2,500 – €5,000", sub: "Professional web & digital sprint" },
    { title: "€5,000 – €10,000", sub: "Custom web app & workflow automation" },
    { title: "€10,000 – €20,000", sub: "Full SaaS build & cloud architecture" },
    { title: "€20,000+", sub: "Enterprise digital transformation" },
    { title: "Let's discuss", sub: "Custom scoped roadmap" }
  ],
  GBP: [
    { title: "Not sure yet — need guidance", sub: "Help me evaluate ROI first" },
    { title: "£800 – £2,000", sub: "Essential starter solutions" },
    { title: "£2,000 – £4,000", sub: "Professional web & SEO sprint" },
    { title: "£4,000 – £8,000", sub: "Custom web app & AI automation" },
    { title: "£8,000 – £18,000", sub: "Full SaaS MVP & custom software" },
    { title: "£18,000+", sub: "Enterprise transformation" },
    { title: "Let's discuss", sub: "Custom scoped roadmap" }
  ]
};

// Anti-Spam CAPTCHA State & Generator
let currentCaptchaCode = '';

function generateCaptchaCode() {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  currentCaptchaCode = code;
  const container = document.getElementById('captchaCodeDisplay');
  if (container) {
    container.innerHTML = code.split('').map(ch => `<span class="captcha-char">${ch}</span>`).join('');
  }
  const input = document.getElementById('captchaInput');
  if (input) {
    input.value = '';
  }
}

function refreshCaptcha() {
  generateCaptchaCode();
}

// Initialization on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  renderInvestmentTiers('INR');
  renderDynamicSituation('website');
  setupKeyboardShortcuts();
  generateCaptchaCode();
  
  // Set default booking date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dateInput = document.getElementById('bookingDate');
  if (dateInput) {
    dateInput.value = tomorrow.toISOString().split('T')[0];
    dateInput.min = new Date().toISOString().split('T')[0];
  }
});

// Scroll to Solution Finder
function scrollToSolutionFinder() {
  const target = document.getElementById('solutionFinderApp');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

// Hero Teaser Quick Pre-select and Scroll
function preselectAndStart(categoryKey) {
  const card = document.querySelector(`.selection-card[data-category="${categoryKey}"]`);
  if (card) {
    selectCategory(categoryKey, card);
  }
  scrollToSolutionFinder();
}

// Step 1: Category Selection
function selectCategory(categoryKey, cardElement) {
  document.querySelectorAll('.selection-card').forEach(c => c.classList.remove('selected'));
  cardElement.classList.add('selected');
  
  finderState.selectedCategory = categoryKey;
  const nameElement = cardElement.querySelector('.card-name');
  finderState.selectedCategoryName = nameElement ? nameElement.textContent : categoryKey;
  
  hideValidation(1);
  
  // Render Step 3 dynamic situation based on this category
  renderDynamicSituation(categoryKey);
}

// Step 2: Multi-select Goals Toggle
function toggleMultiSelect(labelElement) {
  const checkbox = labelElement.querySelector('input[type="checkbox"]');
  if (!checkbox) return;
  
  // Handled by default click, update active class
  setTimeout(() => {
    if (checkbox.checked) {
      labelElement.classList.add('selected');
    } else {
      labelElement.classList.remove('selected');
    }
    
    // Update state
    const checkedBoxes = document.querySelectorAll('input[name="goals"]:checked');
    finderState.selectedGoals = Array.from(checkedBoxes).map(cb => cb.value);
    
    if (finderState.selectedGoals.length > 0) {
      hideValidation(2);
    }
  }, 10);
}

// Step 3: Render Dynamic Situation based on Category
function renderDynamicSituation(categoryKey) {
  const container = document.getElementById('dynamicSituationContainer');
  const subtextElem = document.getElementById('step3DynamicSubtext');
  if (!container) return;
  
  const categoryData = situationDatabase[categoryKey] || situationDatabase['not_sure'];
  
  if (subtextElem) {
    subtextElem.textContent = categoryData.subtext;
  }
  
  let html = '';
  categoryData.options.forEach((opt, idx) => {
    const isSelected = (finderState.selectedSituation === opt.title) ? 'selected' : '';
    html += `
      <div class="situation-card ${isSelected}" onclick="selectSituation('${escapeQuotes(opt.title)}', this)">
        <div class="situation-radio-circle">
          <div class="situation-radio-inner"></div>
        </div>
        <div class="situation-text-block">
          <span class="situation-title">${opt.title}</span>
          <span class="situation-sub">${opt.sub}</span>
        </div>
      </div>
    `;
  });
  
  container.innerHTML = html;
}

function selectSituation(situationTitle, cardElem) {
  document.querySelectorAll('.situation-card').forEach(c => c.classList.remove('selected'));
  cardElem.classList.add('selected');
  finderState.selectedSituation = situationTitle;
  hideValidation(3);
}

// Step 4: Radio Pill Selection Helper
function selectRadioPill(pillElem, fieldName) {
  const parent = pillElem.closest('.pill-radio-group');
  if (parent) {
    parent.querySelectorAll('.pill-radio-option').forEach(p => p.classList.remove('active'));
  }
  pillElem.classList.add('active');
  const radio = pillElem.querySelector('input[type="radio"]');
  if (radio) {
    radio.checked = true;
    if (fieldName === 'company_size') finderState.profile.companySize = radio.value;
    if (fieldName === 'business_stage') finderState.profile.businessStage = radio.value;
  }
  hideValidation(4);
}

function validateField(elem) {
  if (elem.value) {
    finderState.profile.industry = elem.value;
    hideValidation(4);
  }
}

// Step 5: Success Prompt Chips Insertion
function insertSuccessPrompt(text) {
  const textarea = document.getElementById('successVisionInput');
  if (textarea) {
    textarea.value = text;
    textarea.focus();
    finderState.successVision = text;
    hideValidation(5);
  }
}

// Step 6: Currency Switcher & Dynamic Tiers
function setCurrency(currCode) {
  finderState.currency = currCode;
  document.querySelectorAll('.curr-btn').forEach(b => b.classList.remove('active'));
  const targetBtn = document.querySelector(`.curr-btn[data-curr="${currCode}"]`);
  if (targetBtn) targetBtn.classList.add('active');
  
  renderInvestmentTiers(currCode);
}

function renderInvestmentTiers(currCode) {
  const container = document.getElementById('investmentTierContainer');
  if (!container) return;
  
  const tiers = investmentDatabase[currCode] || investmentDatabase['INR'];
  let html = '';
  
  tiers.forEach((tier) => {
    const isSelected = (finderState.selectedInvestment === tier.title) ? 'selected' : '';
    html += `
      <div class="tier-card ${isSelected}" onclick="selectInvestment('${escapeQuotes(tier.title)}', this)">
        <span class="tier-title">${tier.title}</span>
        <span class="tier-sub">${tier.sub}</span>
      </div>
    `;
  });
  
  container.innerHTML = html;
}

function selectInvestment(invTitle, cardElem) {
  document.querySelectorAll('.tier-card').forEach(c => c.classList.remove('selected'));
  cardElem.classList.add('selected');
  finderState.selectedInvestment = invTitle;
  hideValidation(6);
}

function selectTimeline(labelElem) {
  document.querySelectorAll('.timeline-option-card').forEach(c => c.classList.remove('selected'));
  labelElem.classList.add('selected');
  const radio = labelElem.querySelector('input[type="radio"]');
  if (radio) {
    radio.checked = true;
    finderState.selectedTimeline = radio.value;
  }
  hideValidation(6);
}

// Step 7: File Upload Simulation
function handleFileUpload(input) {
  const content = document.getElementById('dropzoneContent');
  if (input.files && input.files[0]) {
    const file = input.files[0];
    finderState.digitalPresence.fileName = file.name;
    if (content) {
      content.innerHTML = `
        <div class="dropzone-icon" style="color: #10b981;"><i class="fa-solid fa-file-circle-check"></i></div>
        <span class="dropzone-text" style="color:#6ee7b7;"><strong>Attached:</strong> ${file.name} (${(file.size / (1024*1024)).toFixed(2)} MB)</span>
        <span class="dropzone-sub">Click to replace file</span>
      `;
    }
  }
}

// Step Validation Engine
function validateStep(step) {
  switch (step) {
    case 1:
      if (!finderState.selectedCategory) {
        showValidation(1, "Please select what you are looking for to proceed.");
        return false;
      }
      return true;
      
    case 2:
      const checkedBoxes = document.querySelectorAll('input[name="goals"]:checked');
      if (checkedBoxes.length === 0) {
        showValidation(2, "Please select at least one business goal or improvement.");
        return false;
      }
      finderState.selectedGoals = Array.from(checkedBoxes).map(cb => cb.value);
      return true;
      
    case 3:
      if (!finderState.selectedSituation) {
        showValidation(3, "Please select your current situation to proceed.");
        return false;
      }
      return true;
      
    case 4:
      const industry = document.getElementById('industrySelect').value;
      const sizeRadio = document.querySelector('input[name="company_size"]:checked');
      const stageRadio = document.querySelector('input[name="business_stage"]:checked');
      
      if (!industry || !sizeRadio || !stageRadio) {
        showValidation(4, "Please select Industry, Company Size, and Business Stage.");
        return false;
      }
      finderState.profile.industry = industry;
      finderState.profile.companySize = sizeRadio.value;
      finderState.profile.businessStage = stageRadio.value;
      return true;
      
    case 5:
      const successVal = document.getElementById('successVisionInput').value.trim();
      if (!successVal) {
        showValidation(5, "Please briefly state what success looks like or pick a prompt above.");
        return false;
      }
      finderState.successVision = successVal;
      return true;
      
    case 6:
      const timelineRadio = document.querySelector('input[name="timeline"]:checked');
      if (!finderState.selectedInvestment || !timelineRadio) {
        showValidation(6, "Please choose an investment level and preferred start timeline.");
        return false;
      }
      finderState.selectedTimeline = timelineRadio.value;
      return true;
      
    case 7:
      // Optional step, capture fields
      finderState.digitalPresence.websiteUrl = document.getElementById('websiteUrlInput').value.trim();
      finderState.digitalPresence.appUrl = document.getElementById('appUrlInput').value.trim();
      finderState.digitalPresence.competitorUrl = document.getElementById('competitorUrlInput').value.trim();
      return true;
      
    case 8:
      const name = document.getElementById('contactName').value.trim();
      const company = document.getElementById('contactCompany').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const phone = document.getElementById('contactPhone').value.trim();
      const country = document.getElementById('contactCountry').value;
      const captchaInp = document.getElementById('captchaInput').value.trim();
      
      if (!name || !company || !email || !phone || !country) {
        showValidation(8, "Please complete all required fields (Name, Company, Email, Phone, Country).");
        return false;
      }
      if (!validateEmail(email)) {
        showValidation(8, "Please enter a valid business email address.");
        return false;
      }
      if (!captchaInp) {
        showValidation(8, "Please enter the security verification code.");
        return false;
      }
      if (captchaInp.toUpperCase() !== currentCaptchaCode.toUpperCase()) {
        showValidation(8, "Security verification code is incorrect. Please re-enter the characters shown in the security box.");
        generateCaptchaCode();
        return false;
      }
      finderState.contact = { name, company, email, phone, country };
      return true;
      
    default:
      return true;
  }
}

function showValidation(step, message) {
  const valElem = document.getElementById(`step${step}Validation`);
  if (valElem) {
    valElem.textContent = message;
    valElem.classList.add('show');
  }
}

function hideValidation(step) {
  const valElem = document.getElementById(`step${step}Validation`);
  if (valElem) {
    valElem.classList.remove('show');
  }
}

function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
}

// Navigation Flow: Next & Previous
function nextStep() {
  if (!validateStep(finderState.currentStep)) {
    return;
  }
  
  if (finderState.currentStep < finderState.totalSteps) {
    finderState.currentStep++;
    updateWizardUI();
  }
}

function prevStep() {
  if (finderState.currentStep > 1) {
    finderState.currentStep--;
    updateWizardUI();
  }
}

function updateWizardUI() {
  // Update step panes
  document.querySelectorAll('.wizard-step-pane').forEach(pane => {
    pane.classList.remove('active');
  });
  const activePane = document.getElementById(`stepPane${finderState.currentStep}`);
  if (activePane) activePane.classList.add('active');
  
  // Update progress bar
  const pct = (finderState.currentStep / finderState.totalSteps) * 100;
  const progressFill = document.getElementById('progressBarFill');
  if (progressFill) progressFill.style.width = `${pct}%`;
  
  // Update step text counter
  const counter = document.getElementById('currentStepNum');
  if (counter) counter.textContent = finderState.currentStep;
  
  // Update step nodes in breadcrumb
  document.querySelectorAll('.step-node').forEach(node => {
    const nodeStep = parseInt(node.getAttribute('data-step'));
    node.classList.remove('active', 'completed');
    if (nodeStep === finderState.currentStep) {
      node.classList.add('active');
    } else if (nodeStep < finderState.currentStep) {
      node.classList.add('completed');
    }
  });
  
  // Update footer buttons
  const backBtn = document.getElementById('wizardBackBtn');
  const nextBtn = document.getElementById('wizardNextBtn');
  const submitBtn = document.getElementById('wizardSubmitBtn');
  
  if (finderState.currentStep === 1) {
    if (backBtn) backBtn.style.display = 'none';
  } else {
    if (backBtn) backBtn.style.display = 'inline-flex';
  }
  
  if (finderState.currentStep === finderState.totalSteps) {
    if (nextBtn) nextBtn.style.display = 'none';
    if (submitBtn) submitBtn.style.display = 'inline-flex';
  } else {
    if (nextBtn) nextBtn.style.display = 'inline-flex';
    if (submitBtn) submitBtn.style.display = 'none';
  }
  
  // Scroll to top of wizard on mobile or tall screens
  const wizardCard = document.getElementById('wizardCard');
  if (wizardCard && window.innerWidth < 768) {
    wizardCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Final Form Submission & Solution Generation
function handleFormSubmission(event) {
  event.preventDefault();
  
  if (!validateStep(8)) {
    return;
  }
  
  // Generate customized solution recommendation
  const solution = computeIntelligentRecommendation(finderState);
  
  // Render results in Dossier
  renderSolutionDossier(solution);
  
  // Hide wizard, show dossier with smooth transition
  const wizardCard = document.getElementById('wizardCard');
  const dossier = document.getElementById('solutionDossier');
  
  if (wizardCard) wizardCard.style.display = 'none';
  if (dossier) {
    dossier.style.display = 'block';
    dossier.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  
  // Trigger celebration confetti
  triggerConfetti();
}

// Intelligent Recommendation Rule Engine
function computeIntelligentRecommendation(state) {
  const { selectedCategory, selectedGoals, profile, contact, selectedTimeline } = state;
  const industry = profile.industry || 'Business';
  const stage = profile.businessStage || 'Growing';
  
  // Base recommendation blueprint
  let title = `Digital Growth & Transformation Solution for ${industry}`;
  let desc = `A tailored, high-converting technology ecosystem engineered to achieve your growth and automation goals.`;
  let modules = [];
  let impacts = [];
  let direction = "Full-Stack Technology & Growth";
  
  // Specific Branching Rules with category precedence
  if (selectedCategory === 'ai_automation' || selectedGoals.some(g => g.includes('AI in my business'))) {
    title = `Enterprise AI Agents & Intelligent Workflow Automation`;
    desc = `Custom artificial intelligence assistants, automated document parsers, and intelligent CRM automations to unlock exponential team productivity for ${industry}.`;
    direction = `Custom AI Agents + LLM Document Extraction + WhatsApp Automation`;
    modules = [
      `24/7 AI Sales & Customer Support Chatbot with Custom Knowledge Base`,
      `Intelligent OCR Document & Invoice Parsing directly into Database`,
      `Automated Multi-Step Workflows across CRM, Slack, WhatsApp & Email`,
      `Proprietary Internal Knowledge Assistant for Company SOPs & Training`,
      `Human-in-the-Loop Approval Safeguards for Sensitive Decisions`
    ];
    impacts = [
      { title: "Instant 24/7 Lead Responses", desc: "Qualify customer inquiries within 5 seconds on WhatsApp." },
      { title: "70% Faster Document Handling", desc: "Extract invoices and contracts automatically with zero errors." },
      { title: "Scales Without Adding Headcount", desc: "Handle 10x more workload with your existing team size." }
    ];
  } else if (selectedCategory === 'cloud' || selectedGoals.some(g => g.includes('Move infrastructure to cloud'))) {
    title = `AWS Cloud Infrastructure Modernization & DevOps Architecture`;
    desc = `Enterprise-grade cloud migration, database clustering, zero-downtime CI/CD pipelines, and 30-50% infrastructure cost optimization for ${industry}.`;
    direction = `AWS Cloud Migration + DevOps CI/CD + Cloud Cost Optimization`;
    modules = [
      `Automated Zero-Downtime Cloud Migration Strategy`,
      `Containerized Microservices Architecture with Docker & Kubernetes`,
      `Automated CI/CD Deployment Pipelines for Fast Release Cycles`,
      `AWS Well-Architected Security, Backup & Disaster Recovery SLA`,
      `Cloud Waste Audit & FinOps Optimization to Reduce Monthly Bills`
    ];
    impacts = [
      { title: "99.99% Uptime SLA", desc: "High availability architecture with multi-region redundancy." },
      { title: "30%–45% Lower Cloud Costs", desc: "Optimized server sizing and auto-scaling rules." },
      { title: "Instant Deployments", desc: "Push updates with zero fear and 1-click instant rollbacks." }
    ];
  } else if (selectedCategory === 'software' || selectedCategory === 'digital_transformation' || selectedGoals.some(g => g.includes('spreadsheets') || g.includes('Replace spreadsheets'))) {
    title = `Custom Operations ERP & Workflow Automation System`;
    desc = `A unified, role-based cloud platform to replace fragmented spreadsheets, eliminate manual operational drag, and streamline company-wide workflows in ${industry}.`;
    direction = `Custom ERP / CRM + Workflow Automation + Cloud Database`;
    modules = [
      `Custom Role-Based Employee & Client Management Portal`,
      `Automated Invoicing, Billing & Real-Time Financial Sync`,
      `Centralized Cloud Database with Automated Daily Backups`,
      `WhatsApp / Email Trigger Automations for Status Approvals`,
      `Executive KPI Analytics Dashboard with Live Profit & Loss Tracking`
    ];
    impacts = [
      { title: "Save 30+ Staff Hours/Week", desc: "Eliminates repetitive data entry and manual tracking." },
      { title: "100% Data Accuracy & Security", desc: "Role-based permissions ensure zero unauthorized data leaks." },
      { title: "Real-Time Executive Visibility", desc: "Live dashboard on mobile and desktop from anywhere." }
    ];
  } else if (selectedCategory === 'app' || selectedCategory === 'idea') {
    title = `Scalable SaaS & Mobile Application MVP Architecture`;
    desc = `An agile, production-grade application engineering roadmap to take your digital product from concept to high-scale active users.`;
    direction = `Cross-Platform Mobile/Web App + Cloud Microservices`;
    modules = [
      `Full-Stack React/Next.js Web App & Cross-Platform Flutter Mobile Apps`,
      `Multi-Tenant User Authentication, Role Permissions & Subscription Billing`,
      `Serverless Cloud Architecture on AWS with Auto-Scaling Capacity`,
      `RESTful API & Webhook Ecosystem for Third-Party Integrations`,
      `Admin Super-Dashboard with User Telemetry and Retention Analytics`
    ];
    impacts = [
      { title: "Fast 60–90 Day MVP Delivery", desc: "Iterative agile sprints to get your product into user hands quickly." },
      { title: "Zero Infrastructure Headaches", desc: "Scales automatically from 100 to 500,000+ users seamlessly." },
      { title: "Investor-Ready Architecture", desc: "Clean codebase, enterprise documentation, and high security standards." }
    ];
  } else if (selectedCategory === 'ecommerce' || selectedGoals.some(g => g.includes('online sales'))) {
    title = `High-Converting Ecommerce Engine & D2C Sales Architecture`;
    desc = `A high-speed, frictionless shopping experience engineered to increase checkout conversion rates, average order value, and recurring sales.`;
    direction = `Next-Gen Ecommerce + Conversion CRO + WhatsApp Order Engine`;
    modules = [
      `Ultra-Fast Custom Storefront / Headless Shopify Architecture`,
      `1-Click Checkout & Abandoned Cart Recovery Sequences via WhatsApp`,
      `Automated Inventory, Courier & Payment Gateway Integrations`,
      `Product Schema SEO & Dynamic Performance Marketing Retargeting`,
      `Customer Lifetime Value (LTV) Analytics & Loyalty Portal`
    ];
    impacts = [
      { title: "35%+ Higher Checkout Conversion", desc: "Frictionless mobile checkout with instant UPI & card options." },
      { title: "Sub-Second Page Loads", desc: "Instant product browsing prevents customer drop-offs." },
      { title: "Automated Fulfillment", desc: "Orders sync straight to logistics and warehouse management." }
    ];
  } else if (selectedCategory === 'website' || selectedCategory === 'marketing' || selectedGoals.some(g => g.includes('leads') || g.includes('customers'))) {
    if (industry.includes('Real Estate')) {
      title = `Digital Growth & High-Velocity Lead Engine for Real Estate`;
      desc = `A specialized real estate conversion portal with automated WhatsApp lead capture, instant property tour scheduling, and Google Local SEO dominance.`;
      direction = `Website Conversion + Local SEO + Lead Automation`;
      modules = [
        `High-Speed Interactive Property Portal & Virtual Tour Viewer`,
        `Direct WhatsApp Lead Qualification Bot & Instant CRM Routing`,
        `Hyper-Local Real Estate SEO & Google Ads Search Campaign`,
        `AI Inquiry Scoring & Automatic Broker Assignment System`,
        `Mobile-First UI/UX Optimized for Fast Smartphone Conversions`
      ];
      impacts = [
        { title: "2x–3x Qualified Lead Inquiries", desc: "Instant automated responses capture high-intent buyers before competitors." },
        { title: "Sub-Second Page Loads", desc: "Built on modern Next.js for flawless mobile loading speeds." },
        { title: "Complete Sales CRM Sync", desc: "Zero manual data entry from website forms into your lead pipeline." }
      ];
    } else if (industry.includes('Healthcare')) {
      title = `Patient Acquisition & Clinic Automation Portal`;
      desc = `A HIPAA/compliance-ready healthcare web platform with instant patient booking, WhatsApp appointment reminders, and local search visibility.`;
      direction = `Healthcare Portal + Online Booking + SEO`;
      modules = [
        `Doctor Directory & Instant Appointment Booking System`,
        `WhatsApp / SMS Automated Patient Reminders & Follow-ups`,
        `Local Medical SEO & Google My Business Top 3 Rank Optimization`,
        `Telehealth Integration Ready & Secure Patient Intake Forms`,
        `Mobile-First Accessibility & Fast Core Web Vitals`
      ];
      impacts = [
        { title: "40% Fewer No-Shows", desc: "Automated WhatsApp appointment confirmations and reminders." },
        { title: "Increased Patient Registrations", desc: "Seamless 2-click booking experience on any mobile device." },
        { title: "Enhanced Trust & Authority", desc: "Modern clinic branding with verified patient reviews." }
      ];
    } else {
      title = `High-Converting Corporate Portal & Inbound Lead Engine`;
      desc = `A modern, ultra-fast web presence designed to convert qualified decision-makers and position ${contact.company || 'your company'} as a market leader.`;
      direction = `Website Redesign + SEO + Conversion Architecture`;
      modules = [
        `Modern Bespoke Website Redesign with Interactive Solution Finders`,
        `Advanced Technical SEO & GEO / AI Engine Search Optimization`,
        `Inbound Lead Capture Workflows with Instant Notification Webhooks`,
        `Performance Tuning for Sub-Second Core Web Vitals (<1s load time)`,
        `Enterprise Headless CMS for Easy In-House Content Publishing`
      ];
      impacts = [
        { title: "Higher Sales Inquiry Rate", desc: "Conversion-optimized layout engineered specifically for B2B/B2C buyers." },
        { title: "Top Google & AI Citations", desc: "Rank on Google search and get recommended by ChatGPT & Gemini." },
        { title: "Scalable Architecture", desc: "Built with modern frameworks ready for millions of monthly hits." }
      ];
    }
  } else {
    // Default / Not sure
    title = `Comprehensive Digital Growth & Technology Solution for ${industry}`;
    desc = `An integrated roadmap combining high-converting web architecture, automated operational workflows, and high-impact digital customer acquisition.`;
    direction = `Web Modernization + Lead Automation + Cloud Systems`;
    modules = [
      `Custom High-Converting Web & Mobile Digital Presence`,
      `Workflow Automation to Eliminate Repetitive Administrative Tasks`,
      `Organic Search & GEO (Generative Engine Optimization) Dominance`,
      `Secure Cloud Database Architecture with Real-Time Backups`,
      `Dedicated Solution Architect & Continuous Advisory Support`
    ];
    impacts = [
      { title: "Clear Predictable ROI", desc: "Focused on measurable business outcomes, not abstract technology." },
      { title: "Future-Proof Foundation", desc: "Built with modern frameworks that scale seamlessly as you expand." },
      { title: "Dedicated Support Partner", desc: "End-to-end technical stewardship from discovery to deployment." }
    ];
  }
  
  return {
    clientName: contact.name || 'Valued Partner',
    company: contact.company || 'Your Organization',
    industry: industry,
    stage: stage,
    timeline: selectedTimeline || 'Within 30 days',
    objective: state.selectedGoals.length > 0 ? state.selectedGoals.slice(0, 3).join(', ') : 'Accelerate growth and modernize systems',
    packageTitle: title,
    packageDesc: desc,
    direction: direction,
    modules: modules,
    impacts: impacts
  };
}

// Render Dossier UI Elements
function renderSolutionDossier(sol) {
  // Greeting
  const nameElem = document.getElementById('resClientName');
  if (nameElem) nameElem.textContent = sol.clientName;
  
  // Executive Summary
  const objVal = document.getElementById('resObjectiveVal');
  const dirVal = document.getElementById('resDirectionVal');
  const stageVal = document.getElementById('resStageVal');
  const timeVal = document.getElementById('resTimelineVal');
  
  if (objVal) objVal.textContent = sol.objective;
  if (dirVal) dirVal.textContent = sol.direction;
  if (stageVal) stageVal.textContent = `${sol.stage} · ${sol.industry}`;
  if (timeVal) timeVal.textContent = sol.timeline;
  
  // Package Title & Description
  const pkgTitle = document.getElementById('resPackageTitle');
  const pkgDesc = document.getElementById('resPackageDesc');
  if (pkgTitle) pkgTitle.textContent = sol.packageTitle;
  if (pkgDesc) pkgDesc.textContent = sol.packageDesc;
  
  // Modules List
  const modulesList = document.getElementById('resModulesList');
  if (modulesList) {
    modulesList.innerHTML = sol.modules.map(mod => `
      <li>
        <i class="fa-solid fa-circle-check"></i>
        <span>${mod}</span>
      </li>
    `).join('');
  }
  
  // Impacts Stack
  const impactStack = document.getElementById('resImpactStack');
  if (impactStack) {
    impactStack.innerHTML = sol.impacts.map(imp => `
      <div class="impact-card">
        <div class="impact-icon"><i class="fa-solid fa-chart-line-up"></i></div>
        <div class="impact-text-group">
          <strong>${imp.title}</strong>
          <span>${imp.desc}</span>
        </div>
      </div>
    `).join('');
  }
  
  // Dynamic WhatsApp Link
  const waLink = document.getElementById('whatsappCtaLink');
  if (waLink) {
    const message = encodeURIComponent(
      `Hello Sunsolv Team! My name is ${sol.clientName} from ${sol.company}.\n\nI just generated our business solution blueprint for "${sol.packageTitle}".\n\nIndustry: ${sol.industry}\nObjective: ${sol.objective}\nTimeline: ${sol.timeline}\n\nI'd like to discuss the next steps with a Solution Consultant.`
    );
    waLink.href = `https://wa.me/919676868607?text=${message}`;
  }
}

// Booking Modal Controls
function openBookingModal() {
  const modal = document.getElementById('bookingModal');
  if (modal) modal.classList.add('open');
}

function closeBookingModal() {
  const modal = document.getElementById('bookingModal');
  if (modal) modal.classList.remove('open');
}

function closeModalOnOutsideClick(event) {
  if (event.target.id === 'bookingModal') {
    closeBookingModal();
  }
}

function confirmConsultationBooking() {
  const date = document.getElementById('bookingDate').value;
  const time = document.getElementById('bookingTime').value;
  const meetingTypeRadio = document.querySelector('input[name="meeting_type"]:checked');
  const meetingType = meetingTypeRadio ? meetingTypeRadio.value : 'Google Meet';
  
  alert(`✓ Consultation Scheduled!\n\nThank you, ${finderState.contact.name || 'Client'}.\nYour session is reserved for ${date} at ${time} via ${meetingType}.\nA calendar invite and link have been dispatched to ${finderState.contact.email || 'your email'}.`);
  
  closeBookingModal();
}

// Print / PDF Blueprint Export
function printSolutionBlueprint() {
  window.print();
}

// Restart & Refine Flow
function restartSolutionFinder() {
  const wizardCard = document.getElementById('wizardCard');
  const dossier = document.getElementById('solutionDossier');
  
  if (dossier) dossier.style.display = 'none';
  if (wizardCard) wizardCard.style.display = 'block';
  
  finderState.currentStep = 1;
  updateWizardUI();
  scrollToSolutionFinder();
}

// FAQ Accordion Toggle
function toggleFaq(itemElem) {
  const isActive = itemElem.classList.contains('active');
  document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
  if (!isActive) {
    itemElem.classList.add('active');
  }
}

// Escape quotes for inline HTML attributes
function escapeQuotes(str) {
  return String(str).replace(/'/g, "\\'");
}

// Keyboard shortcuts for convenience
function setupKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Only handle if wizard is active and user is not inside a textarea or input
    const isTyping = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName);
    if (!isTyping && document.getElementById('wizardCard').style.display !== 'none') {
      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        if (finderState.currentStep < finderState.totalSteps) {
          nextStep();
        }
      } else if (e.key === 'ArrowLeft') {
        if (finderState.currentStep > 1) {
          prevStep();
        }
      }
    }
  });
}

// Confetti Particle Explosion
function triggerConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const particles = [];
  const colors = ['#00B4D8', '#48CAE4', '#90E0EF', '#ADE8F4', '#CAF0F8', '#10B981', '#F59E0B'];
  
  for (let i = 0; i < 90; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2 + 100,
      r: Math.random() * 6 + 3,
      dx: (Math.random() - 0.5) * 14,
      dy: (Math.random() - 0.7) * 16,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.random() * 10,
      tiltAngle: Math.random() * Math.PI,
      tiltAngleInc: Math.random() * 0.1 + 0.05,
      alpha: 1
    });
  }
  
  let animationId;
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    
    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      p.dy += 0.35; // gravity
      p.tiltAngle += p.tiltAngleInc;
      p.tilt = Math.sin(p.tiltAngle) * 8;
      p.alpha -= 0.008;
      
      if (p.alpha > 0) {
        alive = true;
        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
        ctx.stroke();
      }
    });
    
    if (alive) {
      animationId = requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationId);
    }
  }
  
  render();
}
