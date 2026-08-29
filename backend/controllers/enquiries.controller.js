const db = require('../database/db');

// POST /api/enquiries - Create new enquiry from Solution Finder
exports.createEnquiry = (req, res) => {
  try {
    const { contact, category, goals, situation, profile, successVision, investment, currency, timeline, digitalPresence, solutionBlueprint } = req.body;
    
    if (!contact || !contact.name || !contact.email || !contact.phone) {
      return res.status(400).json({ success: false, error: "Missing required contact details (name, email, phone)." });
    }
    
    const newRecord = db.addEnquiry({
      contact,
      category: category || "general",
      categoryName: req.body.categoryName || category || "General Solution",
      goals: goals || [],
      situation: situation || "",
      profile: profile || {},
      successVision: successVision || "",
      investment: investment || "Not Specified",
      currency: currency || "INR",
      timeline: timeline || "Flexible",
      digitalPresence: digitalPresence || {},
      solutionBlueprint: solutionBlueprint || null
    });
    
    return res.status(201).json({
      success: true,
      message: "Enquiry successfully logged in CRM.",
      data: newRecord
    });
  } catch (error) {
    console.error("Error creating enquiry:", error);
    return res.status(500).json({ success: false, error: "Internal server error." });
  }
};

// GET /api/enquiries - List all enquiries with search and filtering
exports.getEnquiries = (req, res) => {
  try {
    let enquiries = db.getAllEnquiries();
    const { status, search, industry, priority } = req.query;
    
    if (status && status !== 'all') {
      enquiries = enquiries.filter(e => e.status.toLowerCase() === status.toLowerCase());
    }
    
    if (priority && priority !== 'all') {
      enquiries = enquiries.filter(e => e.priority.toLowerCase() === priority.toLowerCase());
    }
    
    if (industry && industry !== 'all') {
      enquiries = enquiries.filter(e => e.profile && e.profile.industry && e.profile.industry.toLowerCase().includes(industry.toLowerCase()));
    }
    
    if (search) {
      const q = search.toLowerCase();
      enquiries = enquiries.filter(e => {
        const name = (e.contact?.name || '').toLowerCase();
        const company = (e.contact?.company || '').toLowerCase();
        const email = (e.contact?.email || '').toLowerCase();
        const phone = (e.contact?.phone || '').toLowerCase();
        const id = (e.id || '').toLowerCase();
        const pkg = (e.solutionBlueprint?.packageTitle || '').toLowerCase();
        return name.includes(q) || company.includes(q) || email.includes(q) || phone.includes(q) || id.includes(q) || pkg.includes(q);
      });
    }
    
    return res.json({
      success: true,
      count: enquiries.length,
      data: enquiries
    });
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    return res.status(500).json({ success: false, error: "Internal server error." });
  }
};

// GET /api/enquiries/:id - Single enquiry details
exports.getEnquiryById = (req, res) => {
  try {
    const enquiry = db.getEnquiryById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, error: "Enquiry not found." });
    }
    return res.json({ success: true, data: enquiry });
  } catch (error) {
    console.error("Error fetching enquiry by ID:", error);
    return res.status(500).json({ success: false, error: "Internal server error." });
  }
};

// PATCH /api/enquiries/:id - Update status, add notes, assign rep
exports.updateEnquiry = (req, res) => {
  try {
    const { status, assignedTo, priority, newNote } = req.body;
    const updatePayload = {};
    if (status) updatePayload.status = status;
    if (assignedTo) updatePayload.assignedTo = assignedTo;
    if (priority) updatePayload.priority = priority;
    if (newNote) updatePayload.newNote = newNote;
    
    const updated = db.updateEnquiry(req.params.id, updatePayload);
    if (!updated) {
      return res.status(404).json({ success: false, error: "Enquiry not found." });
    }
    
    return res.json({
      success: true,
      message: "Enquiry updated successfully.",
      data: updated
    });
  } catch (error) {
    console.error("Error updating enquiry:", error);
    return res.status(500).json({ success: false, error: "Internal server error." });
  }
};

// GET /api/enquiries/stats - Aggregate CRM statistics
exports.getEnquiryStats = (req, res) => {
  try {
    const enquiries = db.getAllEnquiries();
    
    const total = enquiries.length;
    const newLeads = enquiries.filter(e => e.status === 'New').length;
    const contacted = enquiries.filter(e => e.status === 'Contacted').length;
    const qualified = enquiries.filter(e => e.status === 'Qualified').length;
    const proposals = enquiries.filter(e => e.status === 'Proposal Sent').length;
    const won = enquiries.filter(e => e.status === 'Won').length;
    const highPriority = enquiries.filter(e => e.priority === 'High').length;
    
    // Industry breakdown
    const byIndustry = {};
    enquiries.forEach(e => {
      const ind = e.profile?.industry || 'Other';
      byIndustry[ind] = (byIndustry[ind] || 0) + 1;
    });
    
    // Category breakdown
    const byCategory = {};
    enquiries.forEach(e => {
      const cat = e.categoryName || e.category || 'General';
      byCategory[cat] = (byCategory[cat] || 0) + 1;
    });
    
    return res.json({
      success: true,
      data: {
        total,
        newLeads,
        contacted,
        qualified,
        proposals,
        won,
        highPriority,
        conversionRate: total > 0 ? ((won / total) * 100).toFixed(1) + '%' : '0%',
        byIndustry,
        byCategory
      }
    });
  } catch (error) {
    console.error("Error calculating enquiry stats:", error);
    return res.status(500).json({ success: false, error: "Internal server error." });
  }
};

// GET /api/enquiries/export/csv - Download leads as CSV
exports.exportEnquiriesCsv = (req, res) => {
  try {
    const enquiries = db.getAllEnquiries();
    
    const headers = [
      "ID",
      "Date",
      "Status",
      "Priority",
      "Client Name",
      "Company",
      "Email",
      "Phone",
      "Country",
      "Industry",
      "Business Stage",
      "Solution Category",
      "Recommended Package",
      "Investment Level",
      "Timeline",
      "Success Vision"
    ];
    
    const rows = enquiries.map(e => [
      `"${e.id || ''}"`,
      `"${e.createdAt ? new Date(e.createdAt).toLocaleDateString() : ''}"`,
      `"${e.status || ''}"`,
      `"${e.priority || ''}"`,
      `"${(e.contact?.name || '').replace(/"/g, '""')}"`,
      `"${(e.contact?.company || '').replace(/"/g, '""')}"`,
      `"${e.contact?.email || ''}"`,
      `"${e.contact?.phone || ''}"`,
      `"${e.contact?.country || ''}"`,
      `"${e.profile?.industry || ''}"`,
      `"${e.profile?.businessStage || ''}"`,
      `"${e.categoryName || e.category || ''}"`,
      `"${(e.solutionBlueprint?.packageTitle || '').replace(/"/g, '""')}"`,
      `"${e.investment || ''}"`,
      `"${e.timeline || ''}"`,
      `"${(e.successVision || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`
    ]);
    
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="Sunsolv_Enquiries_${new Date().toISOString().split('T')[0]}.csv"`);
    return res.send(csvContent);
  } catch (error) {
    console.error("Error exporting enquiries CSV:", error);
    return res.status(500).json({ success: false, error: "Internal server error." });
  }
};

// POST /api/consultations - Schedule strategy call
exports.scheduleConsultation = (req, res) => {
  try {
    const { enquiryId, date, time, meetingType, notes } = req.body;
    
    if (enquiryId) {
      db.updateEnquiry(enquiryId, {
        status: "Contacted",
        newNote: {
          author: "System (Booking Scheduler)",
          text: `Strategy consultation booked for ${date} at ${time} via ${meetingType}.`
        }
      });
    }
    
    return res.json({
      success: true,
      message: "Consultation successfully scheduled and noted in CRM.",
      data: { date, time, meetingType }
    });
  } catch (error) {
    console.error("Error scheduling consultation:", error);
    return res.status(500).json({ success: false, error: "Internal server error." });
  }
};
