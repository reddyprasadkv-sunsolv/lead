import { Injectable, signal } from '@angular/core';
import { EnquiryRecord, SolutionBlueprint } from '../models/enquiry.model';

export interface CategoryOption {
  id: string;
  name: string;
  subtext: string;
  icon: string;
  highlight?: boolean;
}

export interface SituationOption {
  id: string;
  title: string;
  sub: string;
}

export interface InvestmentTier {
  title: string;
  sub: string;
}

@Injectable({
  providedIn: 'root'
})
export class SolutionService {
  // Reactive signals for cross-component communication
  activeDossier = signal<EnquiryRecord | null>(null);
  isBookingModalOpen = signal<boolean>(false);

  // 12 Solution Categories (Including Sunsolv Digital Assessment Platform)
  readonly categories: CategoryOption[] = [
    { id: 'digital_assessment', name: 'Digital Assessment Platform', subtext: 'Institutions, Schools, Colleges & Tests', icon: '📝', highlight: true },
    { id: 'website', name: 'Build a Website', subtext: 'Corporate website, portal, ecommerce', icon: '🌐' },
    { id: 'app', name: 'Build an App', subtext: 'Mobile app, web app, SaaS platform', icon: '📱' },
    { id: 'digital_transformation', name: 'Digital Transformation', subtext: 'Digitise existing business processes', icon: '🔄' },
    { id: 'cloud', name: 'Cloud Solutions', subtext: 'AWS, migration, hosting, optimisation', icon: '☁️' },
    { id: 'ai_automation', name: 'AI & Automation', subtext: 'AI solutions, workflow automation', icon: '🤖' },
    { id: 'marketing', name: 'Digital Marketing', subtext: 'SEO, Google Ads, Social Media, GEO/AIO', icon: '📈' },
    { id: 'ecommerce', name: 'Ecommerce', subtext: 'Online store, multi-vendor marketplace', icon: '🛒' },
    { id: 'software', name: 'Business Software', subtext: 'ERP, CRM, billing, custom applications', icon: '🏢' },
    { id: 'improve_system', name: 'Improve Existing System', subtext: 'Redesign, performance, integrations', icon: '🔧' },
    { id: 'idea', name: 'I Have an Idea', subtext: 'Need consultation, roadmap & guidance', icon: '💡' },
    { id: 'not_sure', name: 'Not Sure', subtext: 'Help me identify what I need', icon: '❓' }
  ];

  // Business Goals / Problem Checklist
  readonly goalsList: { title: string; sub: string; icon: string }[] = [
    { title: 'Get more customers', sub: 'Expand client base & market share', icon: '🎯' },
    { title: 'Generate more qualified leads', sub: 'Higher intent enquiries for sales team', icon: '🔥' },
    { title: 'Increase online sales', sub: 'Boost checkout conversion & order value', icon: '🛍️' },
    { title: 'Improve my brand presence', sub: 'Modern aesthetic, trust badges & authority', icon: '✨' },
    { title: 'Automate manual work', sub: 'Eliminate repetitive tasks with workflows', icon: '⚡' },
    { title: 'Reduce operational costs', sub: 'Optimize overheads & software expenditures', icon: '📉' },
    { title: 'Improve customer experience', sub: 'Faster support, self-service, chatbots', icon: '🤝' },
    { title: 'Replace spreadsheets/manual processes', sub: 'Centralized database & role-based software', icon: '📊' },
    { title: 'Build a new digital product', sub: 'SaaS application, mobile app or MVP', icon: '🚀' },
    { title: 'Modernise an existing application', sub: 'Refactor legacy architecture, upgrade UI', icon: '💎' },
    { title: 'Move infrastructure to cloud', sub: 'AWS, serverless scalability, backups', icon: '☁️' },
    { title: 'Improve website performance', sub: 'Sub-second load times & technical SEO', icon: '⚡' },
    { title: 'Improve search visibility', sub: 'Rank top on Google search & AI engines', icon: '🔍' },
    { title: 'Use AI in my business', sub: 'Custom AI agents, document parsing & LLMs', icon: '🤖' },
    { title: 'Something else', sub: 'Unique requirements or bespoke challenges', icon: '💡' }
  ];

  // Dynamic Situations per Category
  readonly situationDatabase: Record<string, { subtext: string; options: SituationOption[] }> = {
    digital_assessment: {
      subtext: "What best describes your institution type and assessment setup?",
      options: [
        { id: "schools_batches", title: "K-12 Schools / Student Groups", sub: "Coordinate structured classroom tests and periodic exams" },
        { id: "colleges_depts", title: "Colleges & Higher Ed Departments", sub: "Bring departments, faculty and student batches into one clear flow" },
        { id: "universities_multibranch", title: "Universities & Multi-Campus Institutions", sub: "Support large-scale assessment journeys across programmes" },
        { id: "coaching_testprep", title: "Coaching Centres & Test Prep Batches", sub: "Create focused timed mock tests and instant scorecards" },
        { id: "corporate_training", title: "Training Academies & Corporate Upskilling", sub: "Manage standardized digital skill evaluations & certifications" },
        { id: "replace_paper", title: "Looking to replace manual / paper tests", sub: "Eliminate printing, physical invigilation and delayed grading" }
      ]
    },
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
  readonly investmentDatabase: Record<string, InvestmentTier[]> = {
    INR: [
      { title: "Not sure yet — need guidance", sub: "Help me evaluate ROI first" },
      { title: "₹50,000 – ₹1 Lakh", sub: "Essential starter solutions & sprints" },
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

  getSituationsForCategory(catId: string) {
    return this.situationDatabase[catId] || this.situationDatabase['not_sure'];
  }

  getInvestmentTiers(curr: string) {
    return this.investmentDatabase[curr] || this.investmentDatabase['INR'];
  }

  // Recommendation Engine
  computeRecommendation(enquiry: Partial<EnquiryRecord>): SolutionBlueprint {
    const category = enquiry.category || '';
    const goals = enquiry.goals || [];
    const industry = enquiry.profile?.industry || 'Business';

    if (category === 'digital_assessment' || goals.some(g => g.toLowerCase().includes('assessment') || g.toLowerCase().includes('student'))) {
      return {
        packageTitle: `Sunsolv Digital Assessment Platform · Institutional Deployment Blueprint`,
        packageDesc: `A unified, cloud-native assessment ecosystem connecting academic administrators, faculty, and students into one structured, anti-cheating digital testing workflow for ${industry}.`,
        direction: `Sunsolv Digital Assessment SaaS + Multi-Branch Setup + Cloud Exam Engine`,
        modules: [
          `Multi-Campus / Multi-Branch & Department Operational Hierarchy`,
          `Role-Based Faculty & Coordinator Assessment Authoring Workspace`,
          `Timed Question Bank Management with Randomized Test Generation`,
          `Calm, Distraction-Free Student Test Taking Interface (Web & Mobile)`,
          `Anti-Cheating Safeguards, Browser Lockdown & Audit Trails`,
          `Automated Instant Scoring, Batch Performance & Accreditation Analytics`
        ],
        impacts: [
          { title: "80% Faster Exam Operations", desc: "Eliminates paper printing, manual invigilation friction, and grading delays." },
          { title: "Calm Student Experience", desc: "Reassuring, guided flow with auto-save and clear progress tracking." },
          { title: "99.99% Cloud Concurrency", desc: "Engineered on AWS to support thousands of concurrent students seamlessly." }
        ]
      };
    } else if (category === 'ai_automation' || goals.some(g => g.includes('AI in my business'))) {
      return {
        packageTitle: `Enterprise AI Agents & Intelligent Workflow Automation`,
        packageDesc: `Custom artificial intelligence assistants, automated document parsers, and intelligent CRM automations to unlock exponential team productivity for ${industry}.`,
        direction: `Custom AI Agents + LLM Document Extraction + WhatsApp Automation`,
        modules: [
          `24/7 AI Sales & Customer Support Chatbot with Custom Knowledge Base`,
          `Intelligent OCR Document & Invoice Parsing directly into Database`,
          `Automated Multi-Step Workflows across CRM, Slack, WhatsApp & Email`,
          `Proprietary Internal Knowledge Assistant for Company SOPs & Training`,
          `Human-in-the-Loop Approval Safeguards for Sensitive Decisions`
        ],
        impacts: [
          { title: "Instant 24/7 Lead Responses", desc: "Qualify customer inquiries within 5 seconds on WhatsApp." },
          { title: "70% Faster Document Handling", desc: "Extract invoices and contracts automatically with zero errors." },
          { title: "Scales Without Adding Headcount", desc: "Handle 10x more workload with your existing team size." }
        ]
      };
    } else if (category === 'cloud' || goals.some(g => g.includes('Move infrastructure to cloud'))) {
      return {
        packageTitle: `AWS Cloud Infrastructure Modernization & DevOps Architecture`,
        packageDesc: `Enterprise-grade cloud migration, database clustering, zero-downtime CI/CD pipelines, and 30-50% infrastructure cost optimization for ${industry}.`,
        direction: `AWS Cloud Migration + DevOps CI/CD + Cloud Cost Optimization`,
        modules: [
          `Automated Zero-Downtime Cloud Migration Strategy`,
          `Containerized Microservices Architecture with Docker & Kubernetes`,
          `Automated CI/CD Deployment Pipelines for Fast Release Cycles`,
          `AWS Well-Architected Security, Backup & Disaster Recovery SLA`,
          `Cloud Waste Audit & FinOps Optimization to Reduce Monthly Bills`
        ],
        impacts: [
          { title: "99.99% Uptime SLA", desc: "High availability architecture with multi-region redundancy." },
          { title: "30%–45% Lower Cloud Costs", desc: "Optimized server sizing and auto-scaling rules." },
          { title: "Instant Deployments", desc: "Push updates with zero fear and 1-click instant rollbacks." }
        ]
      };
    } else if (category === 'software' || category === 'digital_transformation' || goals.some(g => g.includes('spreadsheets') || g.includes('Replace spreadsheets'))) {
      return {
        packageTitle: `Custom Operations ERP & Workflow Automation System`,
        packageDesc: `A unified, role-based cloud platform to replace fragmented spreadsheets, eliminate manual operational drag, and streamline company-wide workflows in ${industry}.`,
        direction: `Custom ERP / CRM + Workflow Automation + Cloud Database`,
        modules: [
          `Custom Role-Based Employee & Client Management Portal`,
          `Automated Invoicing, Billing & Real-Time Financial Sync`,
          `Centralized Cloud Database with Automated Daily Backups`,
          `WhatsApp / Email Trigger Automations for Status Approvals`,
          `Executive KPI Analytics Dashboard with Live Profit & Loss Tracking`
        ],
        impacts: [
          { title: "Save 30+ Staff Hours/Week", desc: "Eliminates repetitive data entry and manual tracking." },
          { title: "100% Data Accuracy & Security", desc: "Role-based permissions ensure zero unauthorized data leaks." },
          { title: "Real-Time Executive Visibility", desc: "Live dashboard on mobile and desktop from anywhere." }
        ]
      };
    } else if (category === 'app' || category === 'idea') {
      return {
        packageTitle: `Scalable SaaS & Mobile Application MVP Architecture`,
        packageDesc: `An agile, production-grade application engineering roadmap to take your digital product from concept to high-scale active users.`,
        direction: `Cross-Platform Mobile/Web App + Cloud Microservices`,
        modules: [
          `Full-Stack React/Next.js Web App & Cross-Platform Flutter Mobile Apps`,
          `Multi-Tenant User Authentication, Role Permissions & Subscription Billing`,
          `Serverless Cloud Architecture on AWS with Auto-Scaling Capacity`,
          `RESTful API & Webhook Ecosystem for Third-Party Integrations`,
          `Admin Super-Dashboard with User Telemetry and Retention Analytics`
        ],
        impacts: [
          { title: "Fast 60–90 Day MVP Delivery", desc: "Iterative agile sprints to get your product into user hands quickly." },
          { title: "Zero Infrastructure Headaches", desc: "Scales automatically from 100 to 500,000+ users seamlessly." },
          { title: "Investor-Ready Architecture", desc: "Clean codebase, enterprise documentation, and high security standards." }
        ]
      };
    } else if (category === 'ecommerce' || goals.some(g => g.includes('online sales'))) {
      return {
        packageTitle: `High-Converting Ecommerce Engine & D2C Sales Architecture`,
        packageDesc: `A high-speed, frictionless shopping experience engineered to increase checkout conversion rates, average order value, and recurring sales.`,
        direction: `Next-Gen Ecommerce + Conversion CRO + WhatsApp Order Engine`,
        modules: [
          `Ultra-Fast Custom Storefront / Headless Shopify Architecture`,
          `1-Click Checkout & Abandoned Cart Recovery Sequences via WhatsApp`,
          `Automated Inventory, Courier & Payment Gateway Integrations`,
          `Product Schema SEO & Dynamic Performance Marketing Retargeting`,
          `Customer Lifetime Value (LTV) Analytics & Loyalty Portal`
        ],
        impacts: [
          { title: "35%+ Higher Checkout Conversion", desc: "Frictionless mobile checkout with instant UPI & card options." },
          { title: "Sub-Second Page Loads", desc: "Instant product browsing prevents customer drop-offs." },
          { title: "Automated Fulfillment", desc: "Orders sync straight to logistics and warehouse management." }
        ]
      };
    } else if (category === 'website' || category === 'marketing' || goals.some(g => g.includes('leads') || g.includes('customers'))) {
      if (industry.includes('Real Estate')) {
        return {
          packageTitle: `Digital Growth & High-Velocity Lead Engine for Real Estate`,
          packageDesc: `A specialized real estate conversion portal with automated WhatsApp lead capture, instant property tour scheduling, and Google Local SEO dominance.`,
          direction: `Website Conversion + Local SEO + Lead Automation`,
          modules: [
            `High-Speed Interactive Property Portal & Virtual Tour Viewer`,
            `Direct WhatsApp Lead Qualification Bot & Instant CRM Routing`,
            `Hyper-Local Real Estate SEO & Google Ads Search Campaign`,
            `AI Inquiry Scoring & Automatic Broker Assignment System`,
            `Mobile-First UI/UX Optimized for Fast Smartphone Conversions`
          ],
          impacts: [
            { title: "2x–3x Qualified Lead Inquiries", desc: "Instant automated responses capture high-intent buyers before competitors." },
            { title: "Sub-Second Page Loads", desc: "Built on modern Next.js for flawless mobile loading speeds." },
            { title: "Complete Sales CRM Sync", desc: "Zero manual data entry from website forms into your lead pipeline." }
          ]
        };
      } else if (industry.includes('Healthcare')) {
        return {
          packageTitle: `Patient Acquisition & Clinic Automation Portal`,
          packageDesc: `A HIPAA/compliance-ready healthcare web platform with instant patient booking, WhatsApp appointment reminders, and local search visibility.`,
          direction: `Healthcare Portal + Online Booking + SEO`,
          modules: [
            `Doctor Directory & Instant Appointment Booking System`,
            `WhatsApp / SMS Automated Patient Reminders & Follow-ups`,
            `Local Medical SEO & Google My Business Top 3 Rank Optimization`,
            `Telehealth Integration Ready & Secure Patient Intake Forms`,
            `Mobile-First Accessibility & Fast Core Web Vitals`
          ],
          impacts: [
            { title: "40% Fewer No-Shows", desc: "Automated WhatsApp appointment confirmations and reminders." },
            { title: "Increased Patient Registrations", desc: "Seamless 2-click booking experience on any mobile device." },
            { title: "Enhanced Trust & Authority", desc: "Modern clinic branding with verified patient reviews." }
          ]
        };
      } else {
        return {
          packageTitle: `High-Converting Corporate Portal & Inbound Lead Engine`,
          packageDesc: `A modern, ultra-fast web presence designed to convert qualified decision-makers and position ${enquiry.contact?.company || 'your company'} as a market leader.`,
          direction: `Website Redesign + SEO + Conversion Architecture`,
          modules: [
            `Modern Bespoke Website Redesign with Interactive Solution Finders`,
            `Advanced Technical SEO & GEO / AI Engine Search Optimization`,
            `Inbound Lead Capture Workflows with Instant Notification Webhooks`,
            `Performance Tuning for Sub-Second Core Web Vitals (<1s load time)`,
            `Enterprise Headless CMS for Easy In-House Content Publishing`
          ],
          impacts: [
            { title: "Higher Sales Inquiry Rate", desc: "Conversion-optimized layout engineered specifically for B2B/B2C buyers." },
            { title: "Top Google & AI Citations", desc: "Rank on Google search and get recommended by ChatGPT & Gemini." },
            { title: "Scalable Architecture", desc: "Built with modern frameworks ready for millions of monthly hits." }
          ]
        };
      }
    } else {
      return {
        packageTitle: `Comprehensive Digital Growth & Technology Solution for ${industry}`,
        packageDesc: `An integrated roadmap combining high-converting web architecture, automated operational workflows, and high-impact digital customer acquisition.`,
        direction: `Web Modernization + Lead Automation + Cloud Systems`,
        modules: [
          `Custom High-Converting Web & Mobile Digital Presence`,
          `Workflow Automation to Eliminate Repetitive Administrative Tasks`,
          `Organic Search & GEO (Generative Engine Optimization) Dominance`,
          `Secure Cloud Database Architecture with Real-Time Backups`,
          `Dedicated Solution Architect & Continuous Advisory Support`
        ],
        impacts: [
          { title: "Clear Predictable ROI", desc: "Focused on measurable business outcomes, not abstract technology." },
          { title: "Future-Proof Foundation", desc: "Built with modern frameworks that scale seamlessly as you expand." },
          { title: "Dedicated Support Partner", desc: "End-to-end technical stewardship from discovery to deployment." }
        ]
      };
    }
  }
}
