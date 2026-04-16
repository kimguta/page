import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MainPage from './pages/MainPage';
import CompanyPage from './pages/CompanyPage';
import AxDxPage from './pages/AxDxPage';
import SolutionPage from './pages/SolutionPage';
import ServicePage from './pages/ServicePage';
import StoryPage from './pages/StoryPage';
import SupportPage from './pages/SupportPage';

export default function App() {
  return (
    <div className="app-shell">
      <div className="page">
        <Header />

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/company" element={<CompanyPage />} />
          <Route path="/ax-dx" element={<AxDxPage />} />
          <Route path="/solution" element={<SolutionPage />} />
          <Route path="/service" element={<ServicePage />} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer />
      </div>
    </div>
  );
}
