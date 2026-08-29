const express = require('express');
const router = express.Router();
const controller = require('../controllers/enquiries.controller');
const authController = require('../controllers/auth.controller');

// Authentication Routes
router.post('/auth/login', authController.login);
router.get('/auth/verify', authController.verifySession);
router.get('/auth/users', authController.getTeamUsers);

// Public Enquiries & Consultations (Used by Solution Finder Client App)
router.post('/enquiries', controller.createEnquiry);
router.post('/consultations', controller.scheduleConsultation);

// CRM Management Routes
router.get('/enquiries', controller.getEnquiries);
router.get('/enquiries/stats', controller.getEnquiryStats);
router.get('/enquiries/export', controller.exportEnquiriesCsv);
router.get('/enquiries/:id', controller.getEnquiryById);
router.patch('/enquiries/:id', controller.updateEnquiry);

module.exports = router;
