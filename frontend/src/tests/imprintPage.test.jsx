import { describe, test, expect } from "vitest";
import ImprintPage from '../pages/ImprintPage';
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { BrowserRouter } from "react-router-dom";

describe('Imprint Page', () => {
    
    test('div', () => {
        render(<BrowserRouter><ImprintPage /></BrowserRouter>);
        const div = screen.getByTestId('div1');
        expect(div).toBeInTheDocument();
        expect(div).toHaveClass('bg-cyan-200');
    });

    test('h2', () => {
        render(<BrowserRouter><ImprintPage /></BrowserRouter>);
        const h2 = screen.getByTestId('h2');
        expect(h2).toBeInTheDocument();
        expect(h2).toHaveTextContent('Angaben gemäß (DDG)');
    });
});