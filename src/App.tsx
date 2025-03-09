import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import GPACalculator from './components/GPACalculator';
import PremiumComingSoon from './components/landing/PremiumComingSoon';
import OneAdmissionComingSoon from './components/landing/OneAdmissionComingSoon';
import About from './components/About';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<GPACalculator />} />
          <Route path="about" element={<About />} />
          <Route path="premium" element={<PremiumComingSoon />} />
          <Route path="1admission" element={<OneAdmissionComingSoon />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}