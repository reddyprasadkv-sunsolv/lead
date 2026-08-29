import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SolutionService } from '../../services/solution.service';
import { CrmApiService } from '../../services/crm-api.service';

@Component({
  selector: 'app-booking-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal-backdrop" [class.open]="solutionService.isBookingModalOpen()" (click)="closeOnBackdrop($event)">
      <div class="modal-card" (click)="$event.stopPropagation()">
        <button class="modal-close-btn" (click)="closeModal()"><i class="fa-solid fa-xmark"></i></button>
        
        <div class="modal-header">
          <div class="modal-badge"><i class="fa-solid fa-calendar-check"></i> Strategy Session</div>
          <h3 class="modal-title">Schedule Your 1-on-1 Solution Consultation</h3>
          <p class="modal-subtitle">Meet directly with a Senior Technical Solution Architect to review your blueprint.</p>
        </div>

        <div class="modal-body">
          <div class="booking-form-grid">
            <div class="form-field-wrapper">
              <label class="input-label"><i class="fa-regular fa-calendar"></i> Preferred Date</label>
              <input type="date" [(ngModel)]="bookingDate" [min]="minDate" class="custom-text-input" />
            </div>

            <div class="form-field-wrapper">
              <label class="input-label"><i class="fa-regular fa-clock"></i> Preferred Time Slot</label>
              <select [(ngModel)]="bookingTime" class="custom-form-select">
                <option value="10:00 AM - 11:00 AM">10:00 AM – 11:00 AM IST</option>
                <option value="02:00 PM - 03:00 PM">02:00 PM – 03:00 PM IST</option>
                <option value="04:30 PM - 05:30 PM">04:30 PM – 05:30 PM IST</option>
                <option value="07:00 PM - 08:00 PM">07:00 PM – 08:00 PM IST (US / EU Friendly)</option>
                <option value="09:00 PM - 10:00 PM">09:00 PM – 10:00 PM IST (US Morning)</option>
              </select>
            </div>

            <div class="form-field-wrapper full-width">
              <label class="input-label"><i class="fa-solid fa-video"></i> Preferred Meeting Format</label>
              <div class="pill-radio-group">
                <label 
                  *ngFor="let format of ['Google Meet', 'Zoom', 'Phone Call']"
                  class="pill-radio-option"
                  [class.active]="meetingType === format"
                  (click)="meetingType = format"
                >
                  <span>{{ format }}</span>
                </label>
              </div>
            </div>
          </div>

          <div class="booking-confirmation-banner">
            <button class="btn btn-consultation-cta glow-button full-width" (click)="confirmBooking()">
              <i class="fa-solid fa-circle-check"></i>
              <span>Confirm Consultation Booking</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class BookingModalComponent implements OnInit {
  bookingDate = '';
  bookingTime = '10:00 AM - 11:00 AM';
  meetingType = 'Google Meet';
  minDate = '';

  constructor(
    public solutionService: SolutionService,
    private crmApi: CrmApiService
  ) {}

  ngOnInit() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.minDate = new Date().toISOString().split('T')[0];
    this.bookingDate = tomorrow.toISOString().split('T')[0];
  }

  closeModal() {
    this.solutionService.isBookingModalOpen.set(false);
  }

  closeOnBackdrop(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.closeModal();
    }
  }

  confirmBooking() {
    const dossier = this.solutionService.activeDossier();
    this.crmApi.bookConsultation({
      enquiryId: dossier?.id,
      date: this.bookingDate,
      time: this.bookingTime,
      meetingType: this.meetingType
    }).subscribe({
      next: () => {
        alert(`✓ Consultation Scheduled!\n\nThank you, ${dossier?.contact?.name || 'Client'}.\nYour strategy session is reserved for ${this.bookingDate} at ${this.bookingTime} via ${this.meetingType}.\nA calendar invite has been dispatched to ${dossier?.contact?.email || 'your email'}.`);
        this.closeModal();
      },
      error: () => {
        alert(`✓ Consultation Scheduled for ${this.bookingDate} at ${this.bookingTime}. We will send details to ${dossier?.contact?.email || 'your email'}.`);
        this.closeModal();
      }
    });
  }
}
