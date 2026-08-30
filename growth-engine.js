/**
 * SUNSOLV TECHNOLOGIES - AI ORGANIC GROWTH & ATTRIBUTION ENGINE
 * Multi-Channel Content Generator, Campaign UTM Token Builder, and Viral Referral Loop
 */

const SunsolvGrowthEngine = (function() {
  'use strict';

  // Base Website Host for Tracked URLs
  const BASE_URL = "https://solutionfinder.sunsolv.in/";

  // Pre-Trained Educational Growth Blueprints per Domain
  const contentTemplates = {
    edtech: {
      categoryName: "EdTech & Assessment Platform",
      campaignDefault: "edtech_assessment_growth",
      topics: [
        {
          title: "How Universities Are Eliminating Exam Logistics Bottlenecks in 2026",
          hook: "Managing assessments across 5+ departments with paper or basic forms is slowing down institutions.",
          keyInsight: "By combining automated student batching with instant multi-device scorecards, institutions reduce grading cycles from weeks to under 30 minutes.",
          solutionAnchor: "Take the 2-minute Sunsolv Digital Assessment Maturity Evaluation:",
          hashtags: "#HigherEd #EdTech #UniversityLeadership #AssessmentInnovation #Sunsolv"
        },
        {
          title: "The Shift from Paper Exams to High-Integrity Digital Evaluations",
          hook: "Why top coaching academies and test-prep institutions are switching to structured digital mock test engines.",
          keyInsight: "Real-time analytics and instant performance feedback boost student retention and enrollment velocity by 40%.",
          solutionAnchor: "Discover the tailored assessment architecture for your institution:",
          hashtags: "#EdTechInnovation #TestPrep #CoachingBusiness #DigitalTransformation"
        }
      ]
    },
    software_erp: {
      categoryName: "Custom Software & ERP Automation",
      campaignDefault: "erp_process_automation",
      topics: [
        {
          title: "Replacing 15+ Disconnected Spreadsheets with Centralized Operations ERP",
          hook: "When operations scale beyond 20 employees, spreadsheet chaos costs 12+ hours per manager every week.",
          keyInsight: "A unified custom operational dashboard gives leadership real-time visibility into inventory, invoices, and billing in single-click flows.",
          solutionAnchor: "Evaluate your business software & workflow architecture here:",
          hashtags: "#BusinessOperations #CustomSoftware #EnterpriseArchitecture #Automation #Sunsolv"
        },
        {
          title: "Custom Business ERP vs Off-the-Shelf SaaS: What Growing Businesses Actually Need",
          hook: "Off-the-shelf software charges expensive per-seat licenses while forcing rigid workflows.",
          keyInsight: "Custom software tailored to your specific fulfillment and client workflows creates long-term operating leverage with zero recurring seat taxes.",
          solutionAnchor: "Map your exact custom software blueprint in 2 minutes:",
          hashtags: "#SaaS #EnterpriseERP #ProcessAutomation #CTOInsights"
        }
      ]
    },
    web_portal: {
      categoryName: "High-Performance Web Portals & Platforms",
      campaignDefault: "web_conversion_engine",
      topics: [
        {
          title: "Why Modern Web Portals Must Focus on Speed, Conversions & WhatsApp CRM",
          hook: "90% of business websites act like digital brochures that generate zero qualified inbound leads.",
          keyInsight: "Interactive outcome finders and instant WhatsApp qualification bots convert visitors at 4x the rate of generic contact forms.",
          solutionAnchor: "Find the high-velocity web architecture for your business:",
          hashtags: "#WebDevelopment #LeadGeneration #ConversionOptimization #Sunsolv"
        }
      ]
    },
    ai_automation: {
      categoryName: "AI & Process Automation",
      campaignDefault: "ai_process_acceleration",
      topics: [
        {
          title: "Practical AI for Business: Automating Repetitive Manual Workflows in 2026",
          hook: "AI is no longer an experiment—it is the operational backbone for fast-moving companies.",
          keyInsight: "Automating customer intake, document extraction, and smart lead routing cuts turnaround times from days to seconds.",
          solutionAnchor: "Calculate your automation ROI and recommended AI solution:",
          hashtags: "#ArtificialIntelligence #WorkflowAutomation #BusinessScaling #TechLeadership"
        }
      ]
    }
  };

  /**
   * Build Tracked Campaign URL with Full Attribution Metadata
   */
  function buildTrackedUrl(options = {}) {
    const {
      source = "linkedin",
      medium = "organic_social",
      campaign = "growth_2026",
      content = "post",
      ref = ""
    } = options;

    const url = new URL(BASE_URL);
    url.searchParams.set("utm_source", source.toLowerCase());
    url.searchParams.set("utm_medium", medium.toLowerCase());
    url.searchParams.set("utm_campaign", campaign.toLowerCase());
    if (content) url.searchParams.set("utm_content", content.toLowerCase());
    if (ref) url.searchParams.set("ref", ref);

    return url.toString();
  }

  /**
   * Extract Incoming Attribution from Current Browser URL
   */
  function extractCurrentAttribution() {
    try {
      const params = new URLSearchParams(window.location.search);
      const utmSource = params.get("utm_source");
      const utmMedium = params.get("utm_medium");
      const utmCampaign = params.get("utm_campaign");
      const utmContent = params.get("utm_content");
      const refCode = params.get("ref");
      const referrerUrl = document.referrer || "";

      let channel = "Direct / Organic";
      if (utmSource) {
        channel = utmSource.toUpperCase();
      } else if (referrerUrl.includes("linkedin.com")) {
        channel = "LINKEDIN";
      } else if (referrerUrl.includes("t.co") || referrerUrl.includes("twitter.com") || referrerUrl.includes("x.com")) {
        channel = "TWITTER/X";
      } else if (referrerUrl.includes("wa.me") || referrerUrl.includes("whatsapp.com")) {
        channel = "WHATSAPP";
      } else if (referrerUrl.includes("google.com")) {
        channel = "GOOGLE SEARCH";
      } else if (referrerUrl) {
        channel = "REFERRAL (" + new URL(referrerUrl).hostname + ")";
      }

      return {
        channel: channel,
        source: utmSource || (referrerUrl ? "referral" : "direct"),
        medium: utmMedium || "organic",
        campaign: utmCampaign || "solution_finder_core",
        content: utmContent || "default",
        refCode: refCode || "",
        referrer: referrerUrl,
        landingTimestamp: new Date().toISOString()
      };
    } catch (e) {
      return {
        channel: "Direct / Organic",
        source: "direct",
        medium: "organic",
        campaign: "solution_finder_core",
        content: "default",
        refCode: "",
        referrer: "",
        landingTimestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Generate Ready-to-Publish Educational Social Posts
   */
  function generateSocialPost(categoryKey, topicIndex, channel = "linkedin") {
    const cat = contentTemplates[categoryKey] || contentTemplates.edtech;
    const topic = cat.topics[topicIndex] || cat.topics[0];
    const campaignId = cat.campaignDefault;
    const contentId = `topic_${categoryKey}_${topicIndex + 1}`;

    const trackedUrl = buildTrackedUrl({
      source: channel,
      medium: "organic_social",
      campaign: campaignId,
      content: contentId
    });

    let postText = "";
    if (channel === "linkedin") {
      postText = `${topic.title} 🚀\n\n${topic.hook}\n\n💡 Key Strategic Insight:\n${topic.keyInsight}\n\n👉 ${topic.solutionAnchor}\n🔗 ${trackedUrl}\n\n${topic.hashtags}`;
    } else if (channel === "twitter") {
      postText = `${topic.title}\n\n${topic.keyInsight.slice(0, 140)}...\n\nMap your architecture blueprint:\n👉 ${trackedUrl}\n\n${topic.hashtags.split(" ").slice(0, 3).join(" ")}`;
    } else if (channel === "whatsapp") {
      postText = `*${topic.title}*\n\n${topic.hook}\n\n${topic.keyInsight}\n\n*Interactive Solution Finder:*\n${trackedUrl}\n\n_Sunsolv Technologies — Transforming Digital Operations_`;
    } else {
      postText = `${topic.title}\n\n${topic.hook}\n\n${topic.keyInsight}\n\nExplore solutions: ${trackedUrl}`;
    }

    return {
      title: topic.title,
      text: postText,
      trackedUrl: trackedUrl,
      category: cat.categoryName,
      campaign: campaignId,
      contentId: contentId
    };
  }

  /**
   * Generate 1-Click Viral Share Links for Solution Blueprint
   */
  function generateBlueprintShareLinks(leadRecord) {
    const leadId = leadRecord.id || "SUN-REF";
    const clientName = leadRecord.name || "Client";
    const blueprintTitle = leadRecord.blueprintTitle || "Digital Solution Blueprint";
    
    const shareUrl = buildTrackedUrl({
      source: "client_share",
      medium: "viral_referral",
      campaign: "blueprint_share",
      content: leadRecord.category || "custom",
      ref: leadId
    });

    const shareText = `Check out this customized ${blueprintTitle} generated by Sunsolv Technologies for ${clientName}: ${shareUrl}`;

    return {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
      email: `mailto:?subject=${encodeURIComponent("Sunsolv Solution Architecture Blueprint")}&body=${encodeURIComponent(shareText)}`,
      copyUrl: shareUrl
    };
  }

  /**
   * Calculate Comprehensive Lead Quality & Intent Score (0 to 100)
   */
  function calculateLeadIntelligenceScore(lead, durationSeconds = 45) {
    let score = 0;
    const insights = [];

    // 1. Budget & Investment Intent (Max 30 pts)
    const budgetStr = (lead.budget || lead.investment || "").toLowerCase();
    if (budgetStr.includes("10 lakh") || budgetStr.includes("25,000") || budgetStr.includes("enterprise")) {
      score += 30;
      insights.push("+30 High-Scale Budget Tier");
    } else if (budgetStr.includes("5 lakh") || budgetStr.includes("10,000") || budgetStr.includes("3 lakh") || budgetStr.includes("5,000")) {
      score += 22;
      insights.push("+22 Standard Business Investment");
    } else if (budgetStr.includes("1 lakh") || budgetStr.includes("2,500")) {
      score += 15;
      insights.push("+15 Growth Starter Tier");
    } else {
      score += 10;
      insights.push("+10 Flexible Budget");
    }

    // 2. Timeline & Decision Urgency (Max 25 pts)
    const timelineStr = (lead.timeline || "").toLowerCase();
    if (timelineStr.includes("immediately") || timelineStr.includes("urgent")) {
      score += 25;
      insights.push("+25 High Urgency (Immediate Start)");
    } else if (timelineStr.includes("30 days") || timelineStr.includes("1 - 3 months") || timelineStr.includes("1 month")) {
      score += 20;
      insights.push("+20 Active Planning Window (Within 30–90 Days)");
    } else {
      score += 12;
      insights.push("+12 Exploratory Timeline");
    }

    // 3. Corporate Identity & Domain Classification (Max 20 pts)
    const email = (lead.email || "").toLowerCase().trim();
    const isFreeMail = email.includes("@gmail.") || email.includes("@yahoo.") || email.includes("@outlook.") || email.includes("@hotmail.") || email.includes("@icloud.");
    if (email && !isFreeMail && email.includes("@") && email.includes(".")) {
      score += 20;
      insights.push("+20 Verified Corporate Domain Email");
    } else if (email) {
      score += 12;
      insights.push("+12 Valid Personal/Direct Email");
    }

    // 4. Scope Detail & Digital Footprint (Max 15 pts)
    if (lead.company && lead.company !== "Not Specified" && lead.company !== "Direct Client") {
      score += 5;
      insights.push("+5 Registered Organization Provided");
    }
    if (lead.goals && lead.goals.length > 0) {
      score += 5;
      insights.push("+5 Multi-Outcome Objectives Articulated");
    }
    if (lead.situation || lead.blueprintTitle) {
      score += 5;
      insights.push("+5 Current Architecture Context Provided");
    }

    // 5. Bot Defense & Interaction Integrity (Max 10 pts)
    if (durationSeconds >= 5) {
      score += 10;
      insights.push("+10 Verified Human Interaction Speed");
    }

    // Determine Classification Tier
    let tier = "WARM";
    let tierBadge = "🟢 WARM LEAD";
    let actionRecommendation = "Follow up via WhatsApp or email within 24 hours.";

    if (score >= 85) {
      tier = "HOT";
      tierBadge = "🔥 HOT OPPORTUNITY";
      actionRecommendation = "Priority 1-Hour Outreach by Lead Solution Architect. Prepare custom discovery blueprint.";
    } else if (score >= 68) {
      tier = "HIGH";
      tierBadge = "⚡ HIGH VALUE";
      actionRecommendation = "Schedule technical discovery call. Send tailored case study.";
    } else if (score < 50) {
      tier = "LOW";
      tierBadge = "⚪ NURTURE";
      actionRecommendation = "Send automated informational overview & assessment resources.";
    }

    return {
      score: Math.min(100, score),
      tier: tier,
      tierBadge: tierBadge,
      actionRecommendation: actionRecommendation,
      isCorporateDomain: !isFreeMail && email.length > 0,
      insights: insights
    };
  }

  /**
   * Generate 1-Click Executive Discovery Brief for Sales CRM
   */
  function generateExecutiveBrief(lead) {
    const intelligence = calculateLeadIntelligenceScore(lead);
    const dateStr = lead.createdAt || new Date().toLocaleDateString('en-IN');
    const goalsList = Array.isArray(lead.goals) ? lead.goals.join(', ') : (lead.goals || "Digital Scaling");

    return `=====================================================
🎯 SUNSOLV LEAD EXECUTIVE DISCOVERY BRIEF
=====================================================
Client: ${lead.name}
Organization: ${lead.company || 'Direct Client'} (${lead.country || 'India'})
Contact: ${lead.phone || 'N/A'} | ${lead.email || 'N/A'}
Inquiry Date: ${dateStr}

📊 INTELLIGENCE EVALUATION:
- Lead Quality Score: ${intelligence.score}/100 (${intelligence.tierBadge})
- Email Type: ${intelligence.isCorporateDomain ? 'Corporate Work Domain' : 'Direct / Personal Email'}
- Strategic Urgency: ${lead.timeline || 'Flexible'}
- Investment Scope: ${lead.budget || 'Standard'}
- Origin Channel: ${lead.channel || lead.attributionSource || 'Direct / Organic'}
- Campaign Origin: ${lead.campaign || 'General Website Inbound'}

💡 CORE STRATEGIC GOALS:
${goalsList}

🛠 CURRENT SETUP & CONTEXT:
${lead.situation || 'Upgrading legacy operations to modern digital platform.'}

🚀 RECOMMENDED SUNSOLV BLUEPRINT:
${lead.blueprintTitle || 'Custom Digital Growth & Workflow Engine'}

🎯 ACTION RECOMMENDATION:
${intelligence.actionRecommendation}

❓ 3 TAILORED DISCOVERY QUESTIONS FOR ARCHITECT CALL:
1. "What is the single biggest operational bottleneck your team is facing today in ${lead.category || 'your current workflow'}?"
2. "How many active users or staff members will interact with the system on a daily basis?"
3. "Are there existing databases, payment gateways, or third-party APIs we need to integrate into this blueprint?"
=====================================================`;
  }

  // Public API
  return {
    contentTemplates,
    buildTrackedUrl,
    extractCurrentAttribution,
    generateSocialPost,
    generateBlueprintShareLinks,
    calculateLeadIntelligenceScore,
    generateExecutiveBrief
  };
})();

// Attach to window & module exports
if (typeof window !== 'undefined') {
  window.SunsolvGrowthEngine = SunsolvGrowthEngine;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SunsolvGrowthEngine;
}
