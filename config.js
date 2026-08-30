/**
 * SUNSOLV TECHNOLOGIES - CENTRAL APPLICATION CONFIGURATION
 * Cloud Database Webhook, Notification Endpoints, and Production Settings
 */
const SUNSOLV_CONFIG = {
  // Live Google Sheets Web App Endpoint (Real-Time Cloud CRM Database)
  GOOGLE_SHEETS_WEBHOOK_URL: "https://script.google.com/macros/s/AKfycbxTQwMOJksC78OC74XPThd1qgzZAf8XT_p0NYtBoJisBFuk64ES5fwxp-AkND8hqJ9lWA/exec",
  
  // Notification Recipient Email
  NOTIFICATION_EMAIL: "info@sunsolv.in",
  
  // Backend API Fallback
  BACKEND_API_URL: "https://api.sunsolv.in/api/enquiries"
};

// Global shorthand for compatibility
const SUNSOLV_GOOGLE_SHEETS_URL = SUNSOLV_CONFIG.GOOGLE_SHEETS_WEBHOOK_URL;
