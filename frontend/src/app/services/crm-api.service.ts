import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnquiryRecord, CrmStats } from '../models/enquiry.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CrmApiService {
  private apiUrl = 'http://localhost:5050/api';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders(this.authService.getAuthHeaders());
  }

  // Submit new enquiry from Solution Finder (Public)
  submitEnquiry(enquiry: Partial<EnquiryRecord>): Observable<{ success: boolean; data: EnquiryRecord; message?: string }> {
    return this.http.post<{ success: boolean; data: EnquiryRecord; message?: string }>(
      `${this.apiUrl}/enquiries`,
      enquiry
    );
  }

  // Get all enquiries with optional filters (Protected)
  getEnquiries(filters?: { status?: string; search?: string; industry?: string; priority?: string }): Observable<{ success: boolean; count: number; data: EnquiryRecord[] }> {
    let params = new HttpParams();
    if (filters) {
      if (filters.status && filters.status !== 'all') params = params.set('status', filters.status);
      if (filters.search) params = params.set('search', filters.search);
      if (filters.industry && filters.industry !== 'all') params = params.set('industry', filters.industry);
      if (filters.priority && filters.priority !== 'all') params = params.set('priority', filters.priority);
    }
    return this.http.get<{ success: boolean; count: number; data: EnquiryRecord[] }>(
      `${this.apiUrl}/enquiries`,
      { params, headers: this.getHeaders() }
    );
  }

  // Get single enquiry by ID
  getEnquiryById(id: string): Observable<{ success: boolean; data: EnquiryRecord }> {
    return this.http.get<{ success: boolean; data: EnquiryRecord }>(
      `${this.apiUrl}/enquiries/${id}`,
      { headers: this.getHeaders() }
    );
  }

  // Update status, notes, or assignment
  updateEnquiry(id: string, payload: { status?: string; assignedTo?: string; priority?: string; newNote?: { author?: string; text: string } }): Observable<{ success: boolean; data: EnquiryRecord }> {
    return this.http.patch<{ success: boolean; data: EnquiryRecord }>(
      `${this.apiUrl}/enquiries/${id}`,
      payload,
      { headers: this.getHeaders() }
    );
  }

  // Get aggregate CRM statistics
  getCrmStats(): Observable<{ success: boolean; data: CrmStats }> {
    return this.http.get<{ success: boolean; data: CrmStats }>(
      `${this.apiUrl}/enquiries/stats`,
      { headers: this.getHeaders() }
    );
  }

  // Download CSV URL
  getCsvExportUrl(): string {
    return `${this.apiUrl}/enquiries/export`;
  }

  // Book strategy consultation (Public)
  bookConsultation(payload: { enquiryId?: string; date: string; time: string; meetingType: string; notes?: string }): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(
      `${this.apiUrl}/consultations`,
      payload
    );
  }
}
