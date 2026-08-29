const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'enquiries.json');

// Initialize database file with sample seed data if not present
function initDb() {
  if (!fs.existsSync(DB_FILE)) {
    const initialSeed = [
      {
        id: "SUN-2026-1001",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        status: "Contacted",
        priority: "High",
        contact: {
          name: "Rajesh Kumar",
          company: "Apex Realty Group",
          email: "rajesh@apexrealty.in",
          phone: "+91 98450 12345",
          country: "India"
        },
        category: "website",
        categoryName: "Build a Website",
        goals: ["Generate more qualified leads", "Improve search visibility"],
        situation: "My website doesn't generate enquiries",
        profile: {
          industry: "Real Estate",
          companySize: "51–200",
          businessStage: "Established company"
        },
        successVision: "We want to generate 100+ qualified property inquiries every month with WhatsApp lead automation.",
        investment: "₹3 Lakh – ₹5 Lakh",
        currency: "INR",
        timeline: "Within 30 days",
        digitalPresence: {
          websiteUrl: "apexrealty.in",
          appUrl: "",
          competitorUrl: "prestige.in",
          fileName: "Apex_Realty_Scope_2026.pdf"
        },
        solutionBlueprint: {
          packageTitle: "Digital Growth & High-Velocity Lead Engine for Real Estate",
          direction: "Website Conversion + Local SEO + Lead Automation",
          modules: [
            "High-Speed Interactive Property Portal & Virtual Tour Viewer",
            "Direct WhatsApp Lead Qualification Bot & Instant CRM Routing",
            "Hyper-Local Real Estate SEO & Google Ads Search Campaign"
          ]
        },
        assignedTo: "Prasad (Lead Architect)",
        notes: [
          {
            date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            author: "Prasad",
            text: "Had initial discovery call. Client wants WhatsApp lead routing set up by end of next month."
          }
        ]
      },
      {
        id: "SUN-2026-1002",
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        status: "New",
        priority: "High",
        contact: {
          name: "Ananya Patel",
          company: "Global Logistics Ltd",
          email: "ananya.patel@globallogistics.com",
          phone: "+91 99887 65432",
          country: "India"
        },
        category: "software",
        categoryName: "Business Software",
        goals: ["Replace spreadsheets/manual processes", "Automate manual work", "Reduce operational costs"],
        situation: "Currently using Excel / manual processes",
        profile: {
          industry: "Logistics",
          companySize: "201–500",
          businessStage: "Growing business"
        },
        successVision: "Replace 15+ disconnected spreadsheets with centralized ERP for warehouse stock & automated billing.",
        investment: "₹5 Lakh – ₹10 Lakh",
        currency: "INR",
        timeline: "Immediately",
        digitalPresence: {
          websiteUrl: "globallogistics.com",
          appUrl: "",
          competitorUrl: "",
          fileName: ""
        },
        solutionBlueprint: {
          packageTitle: "Custom Operations ERP & Workflow Automation System",
          direction: "Custom ERP / CRM + Workflow Automation + Cloud Database",
          modules: [
            "Custom Role-Based Employee & Client Management Portal",
            "Automated Invoicing, Billing & Real-Time Financial Sync",
            "Centralized Cloud Database with Automated Daily Backups"
          ]
        },
        assignedTo: "Unassigned",
        notes: []
      }
    ];
    fs.writeFileSync(DB_FILE, JSON.stringify(initialSeed, null, 2), 'utf8');
  }
}

// Read all enquiries
function getAllEnquiries() {
  initDb();
  try {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading database file:', err);
    return [];
  }
}

// Save all enquiries atomically
function saveAllEnquiries(enquiries) {
  try {
    const tempFile = `${DB_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(enquiries, null, 2), 'utf8');
    fs.renameSync(tempFile, DB_FILE);
    return true;
  } catch (err) {
    console.error('Error writing database file:', err);
    return false;
  }
}

// Add a new enquiry
function addEnquiry(enquiryData) {
  const enquiries = getAllEnquiries();
  
  // Generate human-friendly ID e.g. SUN-2026-1003
  const year = new Date().getFullYear();
  const nextNum = 1000 + enquiries.length + 1;
  const newId = `SUN-${year}-${nextNum}`;
  
  const record = {
    id: newId,
    createdAt: new Date().toISOString(),
    status: "New",
    priority: calculatePriority(enquiryData),
    assignedTo: "Unassigned",
    notes: [],
    ...enquiryData
  };
  
  enquiries.unshift(record); // newest first
  saveAllEnquiries(enquiries);
  return record;
}

// Find enquiry by ID
function getEnquiryById(id) {
  const enquiries = getAllEnquiries();
  return enquiries.find(e => e.id === id) || null;
}

// Update enquiry status or fields
function updateEnquiry(id, updatePayload) {
  const enquiries = getAllEnquiries();
  const index = enquiries.findIndex(e => e.id === id);
  if (index === -1) return null;
  
  // Handle adding notes
  if (updatePayload.newNote) {
    if (!enquiries[index].notes) enquiries[index].notes = [];
    enquiries[index].notes.unshift({
      date: new Date().toISOString(),
      author: updatePayload.newNote.author || "Sales Rep",
      text: updatePayload.newNote.text
    });
    delete updatePayload.newNote;
  }
  
  enquiries[index] = {
    ...enquiries[index],
    ...updatePayload,
    updatedAt: new Date().toISOString()
  };
  
  saveAllEnquiries(enquiries);
  return enquiries[index];
}

// Lead priority scoring helper
function calculatePriority(data) {
  let score = 0;
  if (data.timeline === "Immediately") score += 3;
  else if (data.timeline === "Within 30 days") score += 2;
  
  if (data.investment && (data.investment.includes("5 Lakh") || data.investment.includes("10 Lakh+") || data.investment.includes("$10,000") || data.investment.includes("$25,000+"))) {
    score += 3;
  } else if (data.investment && (data.investment.includes("3 Lakh") || data.investment.includes("$5,000"))) {
    score += 2;
  }
  
  if (data.profile && (data.profile.businessStage === "Established company" || data.profile.businessStage === "Enterprise")) {
    score += 2;
  }
  
  if (score >= 5) return "High";
  if (score >= 3) return "Medium";
  return "Normal";
}

module.exports = {
  getAllEnquiries,
  getEnquiryById,
  addEnquiry,
  updateEnquiry,
  calculatePriority
};
