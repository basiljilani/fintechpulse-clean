import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Solutions from './pages/Solutions';
import Categories from './pages/Categories';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import FinancialNews from './pages/FinancialNews';
import TradingUpdates from './pages/TradingUpdates';
import PremiumFeature from './components/PremiumFeature';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/financial-news" element={<FinancialNews />} />
          <Route path="/trading-updates" element={<TradingUpdates />} />
          <Route path="/market-analysis" element={<PremiumFeature />} />
          <Route path="/investment-reports" element={<PremiumFeature />} />
          <Route path="/research-papers" element={<PremiumFeature />} />
          <Route path="/regulatory-content" element={<PremiumFeature />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}