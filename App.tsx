import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

import HomePage from './HomePage';
import AnalyzerPage from './AnalyzerPage';
import NotFoundPage from './NotFoundPage';

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/analyze" element={<AnalyzerPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
