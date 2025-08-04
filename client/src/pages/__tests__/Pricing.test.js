import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Pricing from '../Pricing';

const renderPricing = () => {
  return render(
    <BrowserRouter>
      <Pricing />
    </BrowserRouter>
  );
};

describe('Pricing Page', () => {
  test('renders pricing page with title', () => {
    renderPricing();
    expect(screen.getByRole('heading', { name: /pricing/i })).toBeInTheDocument();
  });

  test('displays free plan features', () => {
    renderPricing();
    expect(screen.getAllByText(/free plan/i)).toHaveLength(2); // Title and feature reference
    expect(screen.getByText(/basic financial calculators/i)).toBeInTheDocument();
  });

  test('displays premium plan with $50/month price', () => {
    renderPricing();
    expect(screen.getAllByText(/premium plan/i)).toHaveLength(2); // Title and feature reference
    expect(screen.getByText('$50')).toBeInTheDocument(); // Exact match to avoid confusion with $500
    expect(screen.getAllByText(/month/i).length).toBeGreaterThan(0); // At least one "month" reference
  });

  test('displays premium features', () => {
    renderPricing();
    expect(screen.getByText(/ai-powered financial advisor/i)).toBeInTheDocument();
    expect(screen.getByText(/scenario planning/i)).toBeInTheDocument();
    expect(screen.getByText(/monte carlo simulations/i)).toBeInTheDocument();
  });

  test('displays dedicated advisor option with $500/month price', () => {
    renderPricing();
    expect(screen.getByText(/dedicated advisor/i)).toBeInTheDocument();
    expect(screen.getByText('$500')).toBeInTheDocument(); // Exact match
  });

  test('has get started buttons for each plan', () => {
    renderPricing();
    const getStartedButtons = screen.getAllByText(/get started/i);
    expect(getStartedButtons).toHaveLength(3); // Free, Premium, Dedicated
  });
});
