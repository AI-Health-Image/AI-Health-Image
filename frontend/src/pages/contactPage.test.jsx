import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ContactPage from './ContactPage';
// Mock any components that use router hooks
vi.mock('../components/Layout_Coms/Header', () => ({
  default: () => <div data-testid="header-mock">Header</div>
}));
// If your Layout component uses the Header
vi.mock('../layout/Layout', () => ({
  default: ({ children }) => (
    <div data-testid="layout-mock">
      <div data-testid="header-mock">Header</div>
      {children}
    </div>
  )
}));
describe('ContactPage', () => {
  test("contactPage wird gerendert", () => {
    render(
      <BrowserRouter>
        <ContactPage />
      </BrowserRouter>
    );
    // Test for the actual components on your contact page
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    // Add other expectations as needed
  });
});