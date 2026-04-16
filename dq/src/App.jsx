import Header from './components/Header';
import Footer from './components/Footer';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import GuidesPage from './pages/GuidesPage';
import PricingPage from './pages/PricingPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  return (
    <div className="app-shell">
      <div className="page">
        <Header />

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/guides" element={<GuidesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer />
      </div>
    </div>
  );
}
