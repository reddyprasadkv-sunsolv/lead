/**
 * Sunsolv Technologies - Application Security & Code Protection Module
 * Protects application source, disables developer shortcuts, blocks context menus,
 * and provides anti-tampering guards.
 */

(function () {
  'use strict';

  // 1. Disable Right-Click Context Menu
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }, { capture: true });

  // 2. Disable DevTools & Source View Keyboard Shortcuts
  document.addEventListener('keydown', function (e) {
    // F12 (DevTools)
    if (e.key === 'F12' || e.keyCode === 123) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    const isCtrlOrCmd = e.ctrlKey || e.metaKey;

    // Ctrl+Shift+I / Cmd+Option+I (Inspect)
    // Ctrl+Shift+J / Cmd+Option+J (Console)
    // Ctrl+Shift+C / Cmd+Option+C (Inspect Element)
    // Ctrl+Shift+K (Firefox Console)
    // Ctrl+Shift+E (Network tab)
    if (isCtrlOrCmd && e.shiftKey && ['I', 'i', 'J', 'j', 'C', 'c', 'K', 'k', 'E', 'e'].includes(e.key)) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+U / Cmd+U (View Page Source)
    // Ctrl+S / Cmd+S (Save Page Source)
    // Ctrl+P / Cmd+P (Print / PDF Dump)
    if (isCtrlOrCmd && ['u', 'U', 's', 'S', 'p', 'P'].includes(e.key)) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Mac Cmd+Option+I / Cmd+Option+J / Cmd+Option+C / Cmd+Option+U
    if (e.metaKey && e.altKey && ['I', 'i', 'J', 'j', 'C', 'c', 'U', 'u'].includes(e.key)) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, { capture: true });

  // 3. Disable Dragging of Images / Sensitive Assets
  document.addEventListener('dragstart', function (e) {
    if (e.target && (e.target.nodeName === 'IMG' || e.target.classList.contains('brand-logo'))) {
      e.preventDefault();
    }
  });

  // 4. Security Console Notice
  try {
    const bannerStyle = 'color: #f87171; font-size: 20px; font-weight: 900; text-shadow: 1px 1px 2px black;';
    const subStyle = 'color: #38bdf8; font-size: 13px; font-weight: 600; line-height: 1.6;';
    console.log('%c⚠️ SUNSOLV SECURITY SHIELD ACTIVE ⚠️', bannerStyle);
    console.log(
      '%cThis application environment is protected under Sunsolv Technologies Intellectual Property policies.\nUnauthorized inspection, tampering, or automated scraping is strictly prohibited and monitored.',
      subStyle
    );
  } catch (err) {}
})();
