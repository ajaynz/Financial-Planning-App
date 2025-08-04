import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Layout components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Page components
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Pricing from './pages/Pricing';
import PrivateRoute from './components/PrivateRoute';

// Calculator pages
import InterestCalculator from './pages/calculators/InterestCalculator';
import NetWorthCalculator from './pages/calculators/NetWorthCalculator';
import PensionSimulator from './pages/calculators/PensionSimulator';
import RetirementPlanner from './pages/calculators/RetirementPlanner';
import LoanCalculator from './pages/calculators/LoanCalculator';
import EmergencyFundCalculator from './pages/calculators/EmergencyFundCalculator';

function App() {
  return (
    <div className="App d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          
          {/* Calculator Routes */}
          <Route path="/calculators/interest" element={<InterestCalculator />} />
          <Route path="/calculators/net-worth" element={<NetWorthCalculator />} />
          <Route path="/calculators/pension" element={<PensionSimulator />} />
          <Route path="/calculators/retirement" element={<RetirementPlanner />} />
          <Route path="/calculators/loan" element={<LoanCalculator />} />
          <Route path="/calculators/emergency-fund" element={<EmergencyFundCalculator />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;