import { describe, test, expect } from "vitest";
import ContactPage from '../ContactPage';
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe('ContactPage', () => {
  test("contactPage wird gerendert", () => {
    render(<ContactPage />);
    
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nachricht/i)).toBeInTheDocument();
  });
});

