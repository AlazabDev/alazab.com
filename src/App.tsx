import React from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MaintenanceRequest from "./pages/MaintenanceRequest";
import MaintenanceTracking from "./pages/MaintenanceTracking";
import MaintenanceList from "./pages/MaintenanceList";
import ServicesPage from "./pages/ServicesPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectManagement from "./pages/ProjectManagement";
import ProjectDetails from "./pages/ProjectDetails";
import ProjectPortfolioDetails from "./pages/ProjectPortfolioDetails";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CEOPage from "./pages/CEOPage";
import ChatbotPage from "./pages/ChatbotPage";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import AdminDashboard from "./pages/AdminDashboard";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminRoute from "./components/auth/AdminRoute";
import { Toaster } from "./components/ui/toaster";
import "./App.css";

import ProjectsShowcase from "./pages/ProjectsShowcase";
import MaintenanceRequestDetails from "./pages/MaintenanceRequestDetails";
import MaintenanceReports from "./pages/MaintenanceReports";
import ProjectStoryPage from "./pages/ProjectStoryPage";
import ChatbotTrainingPage from "./pages/ChatbotTrainingPage";
import LuxuryFinishingPage from "./pages/services/LuxuryFinishingPage";
import BrandIdentityPage from "./pages/services/BrandIdentityPage";
import UberFixPage from "./pages/services/UberFixPage";
import LabanAlasfourPage from "./pages/services/LabanAlasfourPage";
import Portfolio from "./pages/Portfolio";
import PrivacyPolicyPage from "./pages/legal/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/legal/TermsOfServicePage";
import CookiePolicyPage from "./pages/legal/CookiePolicyPage";
import DataDeletionPage from "./pages/legal/DataDeletionPage";
import LegalContactPage from "./pages/legal/LegalContactPage";
import RefundPolicyPage from "./pages/legal/RefundPolicyPage";
import AcceptableUsePolicyPage from "./pages/legal/AcceptableUsePolicyPage";
import DisclaimerPage from "./pages/legal/DisclaimerPage";
import SecurityDisclosurePage from "./pages/legal/SecurityDisclosurePage";
import WhatsAppSetupPage from "./pages/WhatsAppSetupPage";
import WhatsAppManagementPage from "./pages/WhatsAppManagementPage";
import FloatingWhatsAppButton from "./components/shared/FloatingWhatsAppButton";

function App() {
  return (
    <LanguageProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/maintenance-request" element={<MaintenanceRequest />} />
        <Route path="/maintenance-tracking" element={<MaintenanceTracking />} />
        <Route path="/maintenance-list" element={
          <ProtectedRoute>
            <MaintenanceList />
          </ProtectedRoute>
        } />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/chatbot-training" element={
          <AdminRoute>
            <ChatbotTrainingPage />
          </AdminRoute>
        } />
        <Route path="/project-management" element={
          <ProtectedRoute>
            <ProjectManagement />
          </ProtectedRoute>
        } />
        <Route path="/projects/:projectId" element={
          <ProtectedRoute>
            <ProjectDetails />
          </ProtectedRoute>
        } />
        <Route path="/portfolio/:projectId" element={<ProjectPortfolioDetails />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/ceo" element={<CEOPage />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/admin-dashboard" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        } />
        <Route path="/projects-gallery" element={<ProjectsShowcase />} />
        <Route path="/projects-gallery/:projectId" element={<ProjectStoryPage />} />
        <Route path="/services/luxury-finishing" element={<LuxuryFinishingPage />} />
        <Route path="/services/uberfix" element={<UberFixPage />} />
        <Route path="/services/brand-identity" element={<BrandIdentityPage />} />
        <Route path="/services/laban-alasfour" element={<LabanAlasfourPage />} />
        {/* Legacy routes */}
        <Route path="/services/general-supplies" element={<LabanAlasfourPage />} />
        <Route path="/services/maintenance-renovation" element={<UberFixPage />} />
        <Route path="/services/luxury-cleaning" element={<LuxuryFinishingPage />} />
        <Route path="/maintenance-request-details/:id" element={
          <ProtectedRoute>
            <MaintenanceRequestDetails />
          </ProtectedRoute>
        } />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        <Route path="/cookie-policy" element={<CookiePolicyPage />} />
        <Route path="/data-deletion" element={<DataDeletionPage />} />
        <Route path="/legal-contact" element={<LegalContactPage />} />
        <Route path="/refund-policy" element={<RefundPolicyPage />} />
        <Route path="/acceptable-use" element={<AcceptableUsePolicyPage />} />
        <Route path="/disclaimer" element={<DisclaimerPage />} />
        <Route path="/security" element={<SecurityDisclosurePage />} />
        <Route path="/whatsapp-setup" element={<WhatsAppSetupPage />} />
        <Route path="/maintenance-reports" element={
          <ProtectedRoute>
            <MaintenanceReports />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <FloatingWhatsAppButton />
      <Toaster />
    </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
