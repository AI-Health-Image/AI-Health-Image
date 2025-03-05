import { describe, test, expect } from "vitest";
import ImprintPage from '../pages/ImprintPage';
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

describe('Imprint Page', () => {
    test('Imprint Page', () => {
        render(<ImprintPage />);
        const div = screen.getByTestId('div1');
        expect(div).toBeInTheDocument();
        expect(div).toHaveClass('flex');
    });
});