import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import ImageViewer from "../components/imageViewer";

// Mock der Umgebungsvariablen
vi.stubEnv('VITE_API_URL', 'http://localhost:3000/');

// Mock von URL.createObjectURL
global.URL.createObjectURL = vi.fn();

// Mock von fetch
global.fetch = vi.fn();

describe('Image Viewer', () => {
    beforeEach(() => {
        // Zurücksetzen aller Mocks vor jedem Test
        vi.resetAllMocks();

        // Setup des fetch-Mocks für jeden Test
        global.fetch.mockResolvedValue({
            ok: true,
            blob: () => Promise.resolve(new Blob(['mocked data'], { type: 'image/png' }))
        });

        // Setup des URL.createObjectURL-Mocks
        global.URL.createObjectURL.mockReturnValue('blob:mock-url');
    });

    test('Rendert den Image Viewer und lädt das Bild', async () => {
        // Komponente rendern
        render(<ImageViewer imageID="test-image-id" directory="test-directory" />);
        
        // Warten bis das Bild geladen ist
        await waitFor(() => {
            // Überprüfen der Basis-Struktur
            const div = screen.getByTestId('div1');
            expect(div).toBeInTheDocument();
            expect(div).toHaveClass('flex');

            // Überprüfen des Bildes
            const img = screen.getByTestId('img');
            expect(img).toBeInTheDocument();
            expect(img).toHaveAttribute('src', 'blob:mock-url');
        });

        // Überprüfen des fetch-Aufrufs
        expect(global.fetch).toHaveBeenCalledWith(
            'http://localhost:3000/analyse/test-directory/test-image-id',
            expect.any(Object)
        );
        
        // Überprüfen des URL.createObjectURL-Aufrufs
        expect(global.URL.createObjectURL).toHaveBeenCalledTimes(1);
    });
});