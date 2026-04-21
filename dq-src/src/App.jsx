import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SubPageLayout from './components/SubPageLayout';
import MainPage from './pages/MainPage';
import { subPageDefinitions } from './data/sitePages';

export default function App() {
  return (
    <div className="app-shell">
      <div className="page">
        <Header />

        <Routes>
          <Route path="/" element={<MainPage />} />
          {subPageDefinitions.map(({ id, href, Component, ...meta }) => (
            <Route
              key={id}
              path={href}
              element={(
                <SubPageLayout meta={meta}>
                  <Component />
                </SubPageLayout>
              )}
            />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer />
      </div>
    </div>
  );
}
