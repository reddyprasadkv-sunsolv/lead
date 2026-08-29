import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CrmDashboardComponent } from './components/crm-dashboard/crm-dashboard.component';
import { CrmLoginComponent } from './components/crm-login/crm-login.component';
import { PrivacyPolicyComponent } from './components/legal/privacy-policy.component';
import { TermsOfServiceComponent } from './components/legal/terms-of-service.component';
import { SecurityComplianceComponent } from './components/legal/security-compliance.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Business Solution Finder | Sunsolv Technologies' },
  { path: 'privacy-policy', component: PrivacyPolicyComponent, title: 'Privacy Policy | Sunsolv Technologies' },
  { path: 'privacy', redirectTo: 'privacy-policy' },
  { path: 'terms-of-service', component: TermsOfServiceComponent, title: 'Terms of Service | Sunsolv Technologies' },
  { path: 'terms', redirectTo: 'terms-of-service' },
  { path: 'security-compliance', component: SecurityComplianceComponent, title: 'Security & Compliance | Sunsolv Technologies' },
  { path: 'security', redirectTo: 'security-compliance' },
  
  // CRM Routes
  { path: 'crm/login', component: CrmLoginComponent, title: 'Sales CRM Staff Portal | Sunsolv Technologies' },
  { path: 'crm', component: CrmDashboardComponent, canActivate: [authGuard], title: 'Sales CRM Lead Dashboard | Sunsolv Technologies' },
  
  { path: '**', redirectTo: '' }
];
