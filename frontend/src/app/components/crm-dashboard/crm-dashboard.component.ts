import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CrmApiService } from '../../services/crm-api.service';
import { AuthService } from '../../services/auth.service';
import { EnquiryRecord, CrmStats } from '../../models/enquiry.model';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-crm-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="crm-page-container">
      
      <!-- Top Bar -->
      <header class="crm-top-bar">
        <div class="crm-brand">
          <a routerLink="/" class="crm-back-home" title="Back to Main Site">
            <i class="fa-solid fa-arrow-left"></i>
          </a>
          <div class="crm-title-block">
            <h1 class="crm-title">Sunsolv Sales CRM & Lead Management</h1>
            <span class="crm-subtitle">Real-time enquiries & AI Solution Finder submissions</span>
          </div>
        </div>

        <div class="crm-top-actions">
          <button class="btn btn-refresh" (click)="loadEnquiries()" [disabled]="isLoading()">
            <i class="fa-solid fa-rotate" [class.fa-spin]="isLoading()"></i>
            <span>Refresh</span>
          </button>
          <a [href]="csvExportUrl" class="btn btn-export-csv" download>
            <i class="fa-solid fa-file-csv"></i>
            <span>Export CSV</span>
          </a>

          <!-- User Profile & Logout -->
          <div class="crm-user-profile-badge" *ngIf="authService.currentUser() as user">
            <div class="user-avatar-circle">
              <i class="fa-solid fa-user-shield"></i>
            </div>
            <div class="user-info-text">
              <strong class="user-name">{{ user.name }}</strong>
              <span class="user-role-tag">{{ user.role }}</span>
            </div>
            <button type="button" class="btn-logout" (click)="logout()" title="Sign Out of CRM">
              <i class="fa-solid fa-arrow-right-from-bracket"></i>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <!-- KPI Summary Cards -->
      <div class="crm-stats-grid" *ngIf="stats()">
        <div class="kpi-card">
          <div class="kpi-icon total"><i class="fa-solid fa-inbox"></i></div>
          <div class="kpi-content">
            <span class="kpi-label">Total Leads</span>
            <strong class="kpi-value">{{ stats()?.total || 0 }}</strong>
          </div>
        </div>

        <div class="kpi-card">
          <div class="kpi-icon new"><i class="fa-solid fa-fire"></i></div>
          <div class="kpi-content">
            <span class="kpi-label">New Submissions</span>
            <strong class="kpi-value">{{ stats()?.newLeads || 0 }}</strong>
          </div>
        </div>

        <div class="kpi-card">
          <div class="kpi-icon contacted"><i class="fa-solid fa-phone"></i></div>
          <div class="kpi-content">
            <span class="kpi-label">Contacted</span>
            <strong class="kpi-value">{{ stats()?.contacted || 0 }}</strong>
          </div>
        </div>

        <div class="kpi-card">
          <div class="kpi-icon proposals"><i class="fa-solid fa-file-signature"></i></div>
          <div class="kpi-content">
            <span class="kpi-label">Proposals Sent</span>
            <strong class="kpi-value">{{ stats()?.proposals || 0 }}</strong>
          </div>
        </div>

        <div class="kpi-card">
          <div class="kpi-icon won"><i class="fa-solid fa-circle-check"></i></div>
          <div class="kpi-content">
            <span class="kpi-label">Won / Closed</span>
            <strong class="kpi-value">{{ stats()?.won || 0 }}</strong>
          </div>
        </div>
      </div>

      <!-- Controls & Filter Toolbar -->
      <div class="crm-filter-bar">
        <div class="search-input-wrapper">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input 
            type="text" 
            [(ngModel)]="searchQuery" 
            (ngModelChange)="onFilterChange()"
            placeholder="Search by client name, company, email, phone or ID..." 
            class="crm-search-input"
          />
        </div>

        <div class="filter-controls-group">
          <!-- Status Filter -->
          <div class="filter-item">
            <label>Status:</label>
            <select [(ngModel)]="selectedStatus" (ngModelChange)="onFilterChange()" class="crm-select">
              <option value="all">All Statuses</option>
              <option value="New">New</option>
              <option value="In Review">In Review</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
            </select>
          </div>

          <!-- Priority Filter -->
          <div class="filter-item">
            <label>Priority:</label>
            <select [(ngModel)]="selectedPriority" (ngModelChange)="onFilterChange()" class="crm-select">
              <option value="all">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium</option>
              <option value="Normal">Normal</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Enquiries Table -->
      <div class="crm-table-wrapper">
        <div class="crm-table-container">
          <table class="crm-table">
            <thead>
              <tr>
                <th>ID & Date</th>
                <th>Client & Company</th>
                <th>Category & Package</th>
                <th>Investment & Timeline</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngIf="enquiries().length === 0 && !isLoading()">
                <td colspan="7" class="empty-state-cell">
                  <i class="fa-solid fa-folder-open"></i>
                  <p>No enquiries found matching your search criteria.</p>
                </td>
              </tr>

              <tr *ngFor="let lead of enquiries()">
                <!-- ID & Date -->
                <td>
                  <div class="lead-id-badge">{{ lead.id }}</div>
                  <span class="lead-date">{{ formatDate(lead.createdAt) }}</span>
                </td>

                <!-- Client & Contact -->
                <td>
                  <strong class="lead-client-name">{{ lead.contact.name }}</strong>
                  <div class="lead-company"><i class="fa-solid fa-building"></i> {{ lead.contact.company }}</div>
                  <div class="lead-contact-links">
                    <a href="mailto:{{ lead.contact.email }}" class="lead-contact-pill" title="Send Email">
                      <i class="fa-solid fa-envelope"></i> {{ lead.contact.email }}
                    </a>
                    <a href="tel:{{ lead.contact.phone }}" class="lead-contact-pill" title="Call">
                      <i class="fa-solid fa-phone"></i> {{ lead.contact.phone }}
                    </a>
                  </div>
                </td>

                <!-- Category & Package -->
                <td>
                  <span class="category-pill">{{ lead.categoryName || lead.category }}</span>
                  <div class="package-name" title="{{ lead.solutionBlueprint?.packageTitle }}">
                    {{ lead.solutionBlueprint?.packageTitle || 'Custom Solution' }}
                  </div>
                  <span class="industry-tag"><i class="fa-solid fa-tag"></i> {{ lead.profile.industry || 'Business' }}</span>
                </td>

                <!-- Investment & Timeline -->
                <td>
                  <div class="investment-val">{{ lead.investment }}</div>
                  <span class="timeline-tag" [class.urgent]="lead.timeline === 'Immediately'">
                    <i class="fa-regular fa-clock"></i> {{ lead.timeline }}
                  </span>
                </td>

                <!-- Priority -->
                <td>
                  <span class="priority-badge {{ lead.priority?.toLowerCase() || 'normal' }}">
                    {{ lead.priority || 'Normal' }}
                  </span>
                </td>

                <!-- Status Select -->
                <td>
                  <select 
                    [ngModel]="lead.status" 
                    (ngModelChange)="updateStatus(lead.id!, $event)"
                    class="status-dropdown {{ getStatusClass(lead.status) }}"
                  >
                    <option value="New">New</option>
                    <option value="In Review">In Review</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                    <option value="Won">Won</option>
                    <option value="Lost">Lost</option>
                  </select>
                </td>

                <!-- Actions -->
                <td>
                  <div class="row-action-buttons">
                    <!-- WhatsApp -->
                    <a 
                      [href]="getLeadWhatsApp(lead)" 
                      target="_blank" 
                      class="action-btn wa" 
                      title="Chat on WhatsApp"
                    >
                      <i class="fa-brands fa-whatsapp"></i>
                    </a>

                    <!-- View Full Details Modal -->
                    <button class="action-btn view" (click)="openLeadDetails(lead)" title="View Full Dossier">
                      <i class="fa-solid fa-eye"></i>
                    </button>

                    <!-- Add Note -->
                    <button class="action-btn note" (click)="openNotesModal(lead)" title="Sales Notes">
                      <i class="fa-solid fa-comment-dots"></i>
                      <span class="notes-count" *ngIf="lead.notes && lead.notes.length > 0">{{ lead.notes.length }}</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Lead Details Drawer / Modal -->
      <div class="crm-modal-backdrop" *ngIf="selectedLeadForView()" (click)="closeDetailsModal()">
        <div class="crm-modal-card large" (click)="$event.stopPropagation()">
          <button class="crm-modal-close" (click)="closeDetailsModal()"><i class="fa-solid fa-xmark"></i></button>
          
          <div class="crm-modal-header">
            <span class="lead-id-badge">{{ selectedLeadForView()?.id }}</span>
            <h3>{{ selectedLeadForView()?.contact?.name }} · {{ selectedLeadForView()?.contact?.company }}</h3>
            <span class="lead-sub-info">Created on {{ formatDate(selectedLeadForView()?.createdAt) }}</span>
          </div>

          <div class="crm-modal-body">
            <div class="details-section-grid">
              <!-- Contact & Profile -->
              <div class="detail-box">
                <h4><i class="fa-solid fa-id-card"></i> Contact Information</h4>
                <p><strong>Email:</strong> <a href="mailto:{{ selectedLeadForView()?.contact?.email }}">{{ selectedLeadForView()?.contact?.email }}</a></p>
                <p><strong>Phone:</strong> <a href="tel:{{ selectedLeadForView()?.contact?.phone }}">{{ selectedLeadForView()?.contact?.phone }}</a></p>
                <p><strong>Country:</strong> {{ selectedLeadForView()?.contact?.country }}</p>
                <p><strong>Industry:</strong> {{ selectedLeadForView()?.profile?.industry }}</p>
                <p><strong>Company Size:</strong> {{ selectedLeadForView()?.profile?.companySize }}</p>
                <p><strong>Business Stage:</strong> {{ selectedLeadForView()?.profile?.businessStage }}</p>
              </div>

              <!-- Objectives & Success -->
              <div class="detail-box">
                <h4><i class="fa-solid fa-bullseye"></i> Problem & Success Vision</h4>
                <p><strong>Baseline Situation:</strong> {{ selectedLeadForView()?.situation }}</p>
                <p><strong>Selected Goals:</strong> {{ selectedLeadForView()?.goals?.join(', ') }}</p>
                <div class="success-vision-quote">
                  "{{ selectedLeadForView()?.successVision }}"
                </div>
              </div>

              <!-- Blueprint & Deliverables -->
              <div class="detail-box full-span">
                <h4><i class="fa-solid fa-compass-drafting"></i> Generated Solution Package</h4>
                <h5 class="blueprint-name">{{ selectedLeadForView()?.solutionBlueprint?.packageTitle }}</h5>
                <p class="blueprint-direction"><strong>Direction:</strong> {{ selectedLeadForView()?.solutionBlueprint?.direction }}</p>
                <ul class="blueprint-modules">
                  <li *ngFor="let m of selectedLeadForView()?.solutionBlueprint?.modules">
                    <i class="fa-solid fa-check"></i> {{ m }}
                  </li>
                </ul>
              </div>

              <!-- Assets & RFP -->
              <div class="detail-box full-span" *ngIf="selectedLeadForView()?.digitalPresence?.websiteUrl || selectedLeadForView()?.digitalPresence?.fileName">
                <h4><i class="fa-solid fa-link"></i> Digital Assets & Attachments</h4>
                <p *ngIf="selectedLeadForView()?.digitalPresence?.websiteUrl">
                  <strong>Website:</strong> <a [href]="'https://' + selectedLeadForView()?.digitalPresence?.websiteUrl" target="_blank">{{ selectedLeadForView()?.digitalPresence?.websiteUrl }}</a>
                </p>
                <p *ngIf="selectedLeadForView()?.digitalPresence?.fileName">
                  <strong>Attached RFP/Document:</strong> <span class="file-chip"><i class="fa-solid fa-file-pdf"></i> {{ selectedLeadForView()?.digitalPresence?.fileName }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Notes Modal -->
      <div class="crm-modal-backdrop" *ngIf="selectedLeadForNotes()" (click)="closeNotesModal()">
        <div class="crm-modal-card" (click)="$event.stopPropagation()">
          <button class="crm-modal-close" (click)="closeNotesModal()"><i class="fa-solid fa-xmark"></i></button>
          
          <div class="crm-modal-header">
            <h3>Sales Notes · {{ selectedLeadForNotes()?.contact?.name }}</h3>
            <span class="lead-sub-info">{{ selectedLeadForNotes()?.contact?.company }} ({{ selectedLeadForNotes()?.id }})</span>
          </div>

          <div class="crm-modal-body">
            <!-- Add note form -->
            <div class="add-note-box">
              <textarea 
                [(ngModel)]="newNoteText" 
                placeholder="Enter client discussion note, follow-up milestone, or quotation status..."
                class="note-textarea"
                rows="3"
              ></textarea>
              <button class="btn btn-add-note" (click)="saveNote()" [disabled]="!newNoteText.trim()">
                <i class="fa-solid fa-plus"></i>
                <span>Save Note</span>
              </button>
            </div>

            <!-- Notes List -->
            <div class="notes-history-list">
              <h4>Note History</h4>
              <p *ngIf="!selectedLeadForNotes()?.notes || selectedLeadForNotes()?.notes?.length === 0" class="no-notes-text">
                No notes logged yet.
              </p>
              <div class="note-item" *ngFor="let n of selectedLeadForNotes()?.notes">
                <div class="note-meta">
                  <strong>{{ n.author }}</strong>
                  <span>{{ formatDate(n.date) }}</span>
                </div>
                <p class="note-text">{{ n.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  `,
  styles: [`
    .crm-page-container {
      max-width: 1360px;
      margin: 0 auto;
      padding: 30px 24px 80px;
      position: relative;
      z-index: 10;
    }

    .crm-top-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 20px;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 1px solid rgba(72, 202, 228, 0.2);
    }

    .crm-brand {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .crm-back-home {
      width: 42px;
      height: 42px;
      border-radius: 10px;
      background: rgba(2, 62, 138, 0.4);
      border: 1px solid rgba(72, 202, 228, 0.3);
      color: #48cae4;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      transition: 0.2s ease;
    }

    .crm-back-home:hover {
      background: rgba(0, 180, 216, 0.4);
      color: #fff;
      transform: translateX(-2px);
    }

    .crm-title {
      font-size: 1.8rem;
      font-weight: 900;
      color: #ffffff;
      line-height: 1.2;
    }

    .crm-subtitle {
      font-size: 0.9rem;
      color: #ade8f4;
    }

    .crm-top-actions {
      display: flex;
      gap: 12px;
    }

    .btn-refresh, .btn-export-csv {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 18px;
      border-radius: 8px;
      font-size: 0.9rem;
      font-weight: 700;
      cursor: pointer;
      text-decoration: none;
      border: 1px solid rgba(72, 202, 228, 0.3);
      transition: 0.2s ease;
    }

    .btn-refresh {
      background: rgba(3, 4, 94, 0.7);
      color: #ade8f4;
    }

    .btn-refresh:hover {
      background: rgba(2, 62, 138, 0.6);
      color: #fff;
    }

    .btn-export-csv {
      background: linear-gradient(135deg, #10b981, #00b4d8);
      color: #011627;
      border: none;
    }

    .btn-export-csv:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 14px rgba(16, 185, 129, 0.4);
    }

    .crm-user-profile-badge {
      display: flex;
      align-items: center;
      gap: 12px;
      background: rgba(2, 62, 138, 0.35);
      border: 1px solid rgba(72, 202, 228, 0.3);
      border-radius: 10px;
      padding: 6px 12px;
    }

    .user-avatar-circle {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: rgba(0, 180, 216, 0.25);
      border: 1px solid var(--c-cyan-400);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--c-cyan-300);
      font-size: 0.95rem;
    }

    .user-info-text {
      display: flex;
      flex-direction: column;
      line-height: 1.2;
    }

    .user-name {
      font-size: 0.82rem;
      font-weight: 800;
      color: #ffffff;
    }

    .user-role-tag {
      font-size: 0.68rem;
      color: var(--c-cyan-300);
      font-weight: 600;
    }

    .btn-logout {
      background: rgba(239, 68, 68, 0.2);
      border: 1px solid rgba(239, 68, 68, 0.4);
      color: #fca5a5;
      padding: 6px 10px;
      border-radius: 6px;
      font-size: 0.75rem;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
      margin-left: 4px;
    }

    .btn-logout:hover {
      background: rgba(239, 68, 68, 0.4);
      color: #ffffff;
      border-color: #ef4444;
    }

    /* KPI Grid */
    .crm-stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 28px;
    }

    .kpi-card {
      background: rgba(3, 16, 68, 0.7);
      border: 1px solid rgba(72, 202, 228, 0.2);
      border-radius: 14px;
      padding: 18px 20px;
      display: flex;
      align-items: center;
      gap: 16px;
      backdrop-filter: blur(12px);
    }

    .kpi-icon {
      width: 46px;
      height: 46px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.3rem;
      flex-shrink: 0;
    }

    .kpi-icon.total { background: rgba(0, 119, 182, 0.3); color: #48cae4; }
    .kpi-icon.new { background: rgba(239, 68, 68, 0.2); color: #fca5a5; }
    .kpi-icon.contacted { background: rgba(245, 158, 11, 0.2); color: #fcd34d; }
    .kpi-icon.proposals { background: rgba(168, 85, 247, 0.2); color: #d8b4fe; }
    .kpi-icon.won { background: rgba(16, 185, 129, 0.2); color: #6ee7b7; }

    .kpi-label {
      display: block;
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #90e0ef;
      font-weight: 700;
    }

    .kpi-value {
      font-size: 1.6rem;
      font-weight: 900;
      color: #ffffff;
      line-height: 1.1;
    }

    /* Filter Bar */
    .crm-filter-bar {
      background: rgba(3, 16, 68, 0.6);
      border: 1px solid rgba(72, 202, 228, 0.2);
      border-radius: 14px;
      padding: 16px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      flex-wrap: wrap;
      margin-bottom: 24px;
    }

    .search-input-wrapper {
      position: relative;
      flex: 1;
      min-width: 280px;
    }

    .search-input-wrapper i {
      position: absolute;
      left: 14px;
      top: 50%;
      transform: translateY(-50%);
      color: #48cae4;
      font-size: 0.9rem;
    }

    .crm-search-input {
      width: 100%;
      background: rgba(3, 4, 94, 0.8);
      border: 1px solid rgba(72, 202, 228, 0.25);
      border-radius: 8px;
      padding: 10px 14px 10px 38px;
      color: #ffffff;
      font-family: inherit;
      font-size: 0.9rem;
      outline: none;
      transition: 0.2s ease;
    }

    .crm-search-input:focus {
      border-color: #00b4d8;
      box-shadow: 0 0 10px rgba(0, 180, 216, 0.35);
    }

    .filter-controls-group {
      display: flex;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
    }

    .filter-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .filter-item label {
      font-size: 0.85rem;
      color: #ade8f4;
      font-weight: 500;
    }

    .crm-select {
      background: rgba(3, 4, 94, 0.8);
      border: 1px solid rgba(72, 202, 228, 0.25);
      border-radius: 8px;
      padding: 8px 12px;
      color: #ffffff;
      font-family: inherit;
      font-size: 0.88rem;
      outline: none;
      cursor: pointer;
    }

    /* Table Styles */
    .crm-table-wrapper {
      background: rgba(3, 16, 68, 0.7);
      border: 1px solid rgba(72, 202, 228, 0.2);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(1, 2, 36, 0.6);
    }

    .crm-table-container {
      overflow-x: auto;
    }

    .crm-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 0.9rem;
    }

    .crm-table th {
      background: rgba(3, 4, 94, 0.9);
      padding: 16px 18px;
      font-size: 0.8rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #90e0ef;
      border-bottom: 1px solid rgba(72, 202, 228, 0.2);
    }

    .crm-table td {
      padding: 16px 18px;
      border-bottom: 1px solid rgba(72, 202, 228, 0.1);
      vertical-align: top;
      color: #caf0f8;
    }

    .crm-table tr:hover td {
      background: rgba(2, 62, 138, 0.25);
    }

    .lead-id-badge {
      display: inline-block;
      font-size: 0.78rem;
      font-weight: 900;
      color: #00b4d8;
      background: rgba(0, 180, 216, 0.15);
      padding: 3px 8px;
      border-radius: 6px;
      border: 1px solid rgba(0, 180, 216, 0.3);
      margin-bottom: 4px;
    }

    .lead-date {
      display: block;
      font-size: 0.75rem;
      color: #90e0ef;
    }

    .lead-client-name {
      display: block;
      font-size: 1rem;
      color: #ffffff;
      margin-bottom: 2px;
    }

    .lead-company {
      font-size: 0.82rem;
      color: #ade8f4;
      margin-bottom: 6px;
    }

    .lead-contact-links {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .lead-contact-pill {
      font-size: 0.76rem;
      color: #48cae4;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .lead-contact-pill:hover {
      text-decoration: underline;
      color: #fff;
    }

    .category-pill {
      display: inline-block;
      font-size: 0.75rem;
      font-weight: 700;
      color: #caf0f8;
      background: rgba(3, 4, 94, 0.8);
      padding: 2px 8px;
      border-radius: 4px;
      margin-bottom: 4px;
    }

    .package-name {
      font-size: 0.88rem;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 4px;
      line-height: 1.3;
    }

    .industry-tag {
      font-size: 0.75rem;
      color: #90e0ef;
    }

    .investment-val {
      font-size: 0.9rem;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 4px;
    }

    .timeline-tag {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 0.75rem;
      color: #ade8f4;
    }

    .timeline-tag.urgent {
      color: #fca5a5;
      font-weight: 700;
    }

    .priority-badge {
      display: inline-block;
      font-size: 0.75rem;
      font-weight: 900;
      padding: 3px 8px;
      border-radius: 6px;
      text-transform: uppercase;
    }

    .priority-badge.high { background: rgba(239, 68, 68, 0.25); color: #fca5a5; border: 1px solid rgba(239, 68, 68, 0.4); }
    .priority-badge.medium { background: rgba(245, 158, 11, 0.25); color: #fcd34d; border: 1px solid rgba(245, 158, 11, 0.4); }
    .priority-badge.normal { background: rgba(148, 163, 184, 0.2); color: #cbd5e1; border: 1px solid rgba(148, 163, 184, 0.3); }

    .status-dropdown {
      padding: 6px 10px;
      border-radius: 6px;
      font-family: inherit;
      font-size: 0.82rem;
      font-weight: 700;
      outline: none;
      cursor: pointer;
      border: 1px solid rgba(72, 202, 228, 0.3);
    }

    .status-new { background: rgba(239, 68, 68, 0.2); color: #fca5a5; }
    .status-in-review { background: rgba(0, 180, 216, 0.2); color: #ade8f4; }
    .status-contacted { background: rgba(245, 158, 11, 0.2); color: #fcd34d; }
    .status-qualified { background: rgba(168, 85, 247, 0.2); color: #d8b4fe; }
    .status-proposal-sent { background: rgba(59, 130, 246, 0.2); color: #93c5fd; }
    .status-won { background: rgba(16, 185, 129, 0.25); color: #6ee7b7; border-color: #10b981; }
    .status-lost { background: rgba(100, 116, 139, 0.2); color: #94a3b8; }

    .row-action-buttons {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .action-btn {
      width: 32px;
      height: 32px;
      border-radius: 6px;
      border: 1px solid rgba(72, 202, 228, 0.3);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      text-decoration: none;
      font-size: 0.9rem;
      position: relative;
      transition: 0.2s ease;
    }

    .action-btn.wa { background: #25d366; color: #064e1e; border: none; }
    .action-btn.wa:hover { background: #1ebe5d; transform: scale(1.05); }
    .action-btn.view { background: rgba(0, 119, 182, 0.4); color: #48cae4; }
    .action-btn.view:hover { background: #0077b6; color: #fff; }
    .action-btn.note { background: rgba(3, 4, 94, 0.8); color: #ade8f4; }
    .action-btn.note:hover { background: rgba(2, 62, 138, 0.6); color: #fff; }

    .notes-count {
      position: absolute;
      top: -4px;
      right: -4px;
      background: #ef4444;
      color: #fff;
      font-size: 0.65rem;
      font-weight: 900;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .empty-state-cell {
      text-align: center;
      padding: 50px 20px !important;
      color: #90e0ef;
    }

    .empty-state-cell i {
      font-size: 2.5rem;
      margin-bottom: 12px;
      opacity: 0.5;
    }

    /* Modal Backdrop */
    .crm-modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(1, 2, 36, 0.85);
      backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 20px;
    }

    .crm-modal-card {
      background: #03045e;
      border: 1px solid #00b4d8;
      border-radius: 18px;
      box-shadow: 0 20px 50px rgba(1, 2, 36, 0.9);
      max-width: 600px;
      width: 100%;
      max-height: 85vh;
      overflow-y: auto;
      padding: 30px;
      position: relative;
    }

    .crm-modal-card.large {
      max-width: 840px;
    }

    .crm-modal-close {
      position: absolute;
      top: 20px;
      right: 20px;
      background: rgba(2, 62, 138, 0.5);
      border: 1px solid rgba(72, 202, 228, 0.3);
      color: #ade8f4;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      cursor: pointer;
    }

    .crm-modal-header {
      margin-bottom: 24px;
      border-bottom: 1px solid rgba(72, 202, 228, 0.2);
      padding-bottom: 16px;
    }

    .crm-modal-header h3 {
      font-size: 1.4rem;
      color: #ffffff;
      margin-top: 4px;
    }

    .lead-sub-info {
      font-size: 0.82rem;
      color: #90e0ef;
    }

    .details-section-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 18px;
    }

    .detail-box {
      background: rgba(2, 62, 138, 0.25);
      border: 1px solid rgba(72, 202, 228, 0.2);
      border-radius: 12px;
      padding: 16px;
    }

    .detail-box.full-span {
      grid-column: 1 / -1;
    }

    .detail-box h4 {
      font-size: 0.95rem;
      color: #48cae4;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .detail-box p {
      font-size: 0.88rem;
      color: #caf0f8;
      margin-bottom: 6px;
    }

    .detail-box p a {
      color: #00b4d8;
    }

    .success-vision-quote {
      margin-top: 10px;
      padding: 10px 14px;
      background: rgba(3, 4, 94, 0.7);
      border-left: 3px solid #00b4d8;
      border-radius: 6px;
      font-style: italic;
      font-size: 0.88rem;
      color: #ffffff;
    }

    .blueprint-name {
      font-size: 1.1rem;
      color: #ffffff;
      margin-bottom: 4px;
    }

    .blueprint-direction {
      font-size: 0.85rem;
      color: #90e0ef;
      margin-bottom: 10px;
    }

    .blueprint-modules {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .blueprint-modules li {
      font-size: 0.85rem;
      color: #caf0f8;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .blueprint-modules li i {
      color: #48cae4;
    }

    .file-chip {
      background: rgba(0, 119, 182, 0.4);
      padding: 4px 10px;
      border-radius: 6px;
      color: #caf0f8;
      font-size: 0.85rem;
    }

    /* Notes Form */
    .add-note-box {
      margin-bottom: 24px;
    }

    .note-textarea {
      width: 100%;
      background: rgba(3, 4, 94, 0.8);
      border: 1px solid rgba(72, 202, 228, 0.3);
      border-radius: 10px;
      padding: 12px;
      color: #fff;
      font-family: inherit;
      font-size: 0.9rem;
      margin-bottom: 10px;
      outline: none;
    }

    .btn-add-note {
      background: linear-gradient(135deg, #00b4d8, #0077b6);
      color: #03045e;
      font-weight: 800;
      padding: 8px 18px;
      border-radius: 8px;
      border: none;
      cursor: pointer;
    }

    .notes-history-list h4 {
      font-size: 0.95rem;
      color: #90e0ef;
      margin-bottom: 12px;
    }

    .note-item {
      background: rgba(2, 62, 138, 0.3);
      border: 1px solid rgba(72, 202, 228, 0.2);
      border-radius: 10px;
      padding: 12px 14px;
      margin-bottom: 10px;
    }

    .note-meta {
      display: flex;
      justify-content: space-between;
      font-size: 0.78rem;
      color: #48cae4;
      margin-bottom: 4px;
    }

    .note-text {
      font-size: 0.88rem;
      color: #ffffff;
    }

    .no-notes-text {
      font-size: 0.85rem;
      color: #90e0ef;
      font-style: italic;
    }

    @media (max-width: 768px) {
      .details-section-grid {
        grid-template-columns: 1fr;
      }
      .crm-top-bar {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  `]
})
export class CrmDashboardComponent implements OnInit {
  enquiries = signal<EnquiryRecord[]>([]);
  stats = signal<CrmStats | null>(null);
  isLoading = signal<boolean>(false);

  searchQuery = '';
  selectedStatus = 'all';
  selectedPriority = 'all';

  selectedLeadForView = signal<EnquiryRecord | null>(null);
  selectedLeadForNotes = signal<EnquiryRecord | null>(null);
  newNoteText = '';

  csvExportUrl = '';

  constructor(
    private crmApi: CrmApiService,
    private seo: SeoService,
    public authService: AuthService
  ) {}

  logout() {
    this.authService.logout(true);
  }

  ngOnInit() {
    this.seo.setMetaTags({
      title: 'CRM Sales Dashboard | Sunsolv Technologies',
      description: 'Manage incoming client leads, solution blueprints, and consultation pipeline.',
      url: 'https://sunsolv.com/crm'
    });

    this.csvExportUrl = this.crmApi.getCsvExportUrl();
    this.loadEnquiries();
    this.loadStats();
  }

  loadEnquiries() {
    this.isLoading.set(true);
    this.crmApi.getEnquiries({
      status: this.selectedStatus,
      search: this.searchQuery,
      priority: this.selectedPriority
    }).subscribe({
      next: (res) => {
        this.enquiries.set(res.data || []);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error fetching enquiries:', err);
        this.isLoading.set(false);
      }
    });
  }

  loadStats() {
    this.crmApi.getCrmStats().subscribe({
      next: (res) => {
        this.stats.set(res.data);
      },
      error: (err) => console.error('Error fetching CRM stats:', err)
    });
  }

  onFilterChange() {
    this.loadEnquiries();
  }

  updateStatus(id: string, newStatus: string) {
    this.crmApi.updateEnquiry(id, { status: newStatus }).subscribe({
      next: (res) => {
        this.loadStats();
        // Update local array
        this.enquiries.update(list => list.map(item => item.id === id ? { ...item, status: newStatus as any } : item));
      },
      error: (err) => console.error('Error updating status:', err)
    });
  }

  openLeadDetails(lead: EnquiryRecord) {
    this.selectedLeadForView.set(lead);
  }

  closeDetailsModal() {
    this.selectedLeadForView.set(null);
  }

  openNotesModal(lead: EnquiryRecord) {
    this.selectedLeadForNotes.set(lead);
    this.newNoteText = '';
  }

  closeNotesModal() {
    this.selectedLeadForNotes.set(null);
    this.newNoteText = '';
  }

  saveNote() {
    const lead = this.selectedLeadForNotes();
    if (!lead || !lead.id || !this.newNoteText.trim()) return;

    this.crmApi.updateEnquiry(lead.id, {
      newNote: {
        author: 'Consultant Rep',
        text: this.newNoteText.trim()
      }
    }).subscribe({
      next: (res) => {
        this.selectedLeadForNotes.set(res.data);
        this.newNoteText = '';
        this.loadEnquiries();
      },
      error: (err) => console.error('Error saving note:', err)
    });
  }

  getLeadWhatsApp(lead: EnquiryRecord): string {
    const phone = lead.contact?.phone?.replace(/\D/g, '') || '';
    const text = encodeURIComponent(
      `Hello ${lead.contact?.name}! This is Sunsolv Technologies following up on your ${lead.solutionBlueprint?.packageTitle || 'Solution'} requirement.`
    );
    return `https://wa.me/${phone}?text=${text}`;
  }

  formatDate(dateStr?: string): string {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  getStatusClass(status: string): string {
    return 'status-' + status.toLowerCase().replace(/\s+/g, '-');
  }
}
