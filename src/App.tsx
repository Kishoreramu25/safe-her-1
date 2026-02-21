import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import RoleSelection from '@/pages/RoleSelection';
import Landing from '@/pages/Landing';
import Auth from '@/pages/Auth';
import ComplaintStep1 from '@/pages/ComplaintStep1';
import ComplaintStep2 from '@/pages/ComplaintStep2';
import Processing from '@/pages/Processing';
import AnalysisReview from '@/pages/AnalysisReview';
import Success from '@/pages/Success';
import OfficialDashboard from '@/pages/OfficialDashboard';
import CaseReview from '@/pages/CaseReview';
import Tracker from '@/pages/Tracker';
import Settings from '@/pages/Settings';
import SOSActivation from '@/pages/SOSActivation';
import Functions from '@/pages/Functions';
import DeepfakeDetector from '@/pages/DeepfakeDetector';
import MyReports from '@/pages/MyReports';
import AIAssistant from '@/pages/AIAssistant';
import TakedownTracker from '@/pages/TakedownTracker';
import SideNav from '@/components/SideNav';
import VoiceListener from '@/components/VoiceListener';

const AppContent = () => {
  const location = useLocation();
  // Hide nav on specific full-screen or auth pages
  const hideNavPaths = ['/', '/landing', '/auth', '/sos', '/report/processing', '/report/success', '/functions/deepfake', '/ai-assistant', '/takedown-tracker'];
  const showNav = !hideNavPaths.includes(location.pathname);

  return (
    <>
      <VoiceListener />
      <div>
        <Routes>
          <Route path="/" element={<RoleSelection />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/report/step1" element={<ComplaintStep1 />} />
          <Route path="/report/step2" element={<ComplaintStep2 />} />
          <Route path="/report/processing" element={<Processing />} />
          <Route path="/report/review" element={<AnalysisReview />} />
          <Route path="/report/success" element={<Success />} />
          <Route path="/dashboard" element={<OfficialDashboard />} />
          <Route path="/functions" element={<Functions />} />
          <Route path="/functions/deepfake" element={<DeepfakeDetector />} />
          <Route path="/case/:id" element={<CaseReview />} />
          <Route path="/track/:id" element={<Tracker />} />
          <Route path="/my-reports" element={<MyReports />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/takedown-tracker" element={<TakedownTracker />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/sos" element={<SOSActivation />} />
        </Routes>
      </div>
      {showNav && <SideNav />}
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
