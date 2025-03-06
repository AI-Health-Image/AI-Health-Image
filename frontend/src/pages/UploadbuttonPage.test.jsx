import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react'; // Add React import
import UploadbuttonPage from './UploadbuttonPage';
import useJwtStore from '../components/jwtStore';
import JwtVerify from '../components/jwtVerify';
// Mock the dependencies
vi.mock('../components/jwtVerify', () => ({
  default: vi.fn()
}));
vi.mock('../components/jwtStore', () => ({
  default: vi.fn()
}));
vi.mock('../layout/Layout', () => ({
  default: ({ children }) => <div data-testid="layout-mock">{children}</div>
}));
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    Link: ({ to, children }) => <a href={to} data-testid="link-mock">{children}</a>
  };
});
// Mock URL.createObjectURL
global.URL.createObjectURL = vi.fn(() => 'mocked-url');
describe('UploadbuttonPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Default mock implementation for useJwtStore - return a string instead of an object
    useJwtStore.mockReturnValue('mock-jwt-token');
    // Default mock implementation for JwtVerify
    JwtVerify.mockResolvedValue(true);
    // Mock environment variable for each test
    vi.stubGlobal('import.meta', {
      env: { VITE_API_URL: 'http://test-api.com/' }
    });
  });
  test('renders loading state when token validation is in progress', async () => {
    // Create a promise that won't resolve during the test
    let promiseResolve;
    const pendingPromise = new Promise(resolve => {
      promiseResolve = resolve;
    });
    // Mock the jwt store to return a string token
    useJwtStore.mockReturnValue('mock-jwt-token');
    // Make JwtVerify return the pending promise
    JwtVerify.mockImplementationOnce(() => pendingPromise);
    // Instead of mocking useState, we'll check for loading state
    render(
      <BrowserRouter>
        <UploadbuttonPage />
      </BrowserRouter>
    );
    // Wait a bit to ensure useEffect has executed
    await new Promise(r => setTimeout(r, 10));
    // Look for the loading text
    expect(await screen.findByText(/loading/i)).toBeInTheDocument();
    // Clean up by resolving the promise
    promiseResolve(true);
  });
  test('redirects to home when token is invalid', async () => {
    // Mock token verification to fail
    useJwtStore.mockReturnValue('mock-jwt-token');
    JwtVerify.mockResolvedValue(false);
    render(
      <BrowserRouter>
        <UploadbuttonPage />
      </BrowserRouter>
    );
    // Wait for token validation to complete
    await waitFor(() => {
      expect(screen.getByText("You're not logged in.")).toBeInTheDocument();
    });
    expect(screen.getByTestId('link-mock')).toHaveAttribute('href', '/');
  });
  test('renders upload interface when token is valid', async () => {
    // Mock token verification to succeed
    useJwtStore.mockReturnValue('mock-jwt-token');
    JwtVerify.mockResolvedValue(true);
    render(
      <BrowserRouter>
        <UploadbuttonPage />
      </BrowserRouter>
    );
    // Wait for token validation to complete
    await waitFor(() => {
      expect(screen.getByText('MRT-Bildanalyse')).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: /hochladen/i })).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('bg-blue-500');
  });
  test('allows file selection and shows preview', async () => {
    // Mock token verification to succeed
    useJwtStore.mockReturnValue('mock-jwt-token');
    JwtVerify.mockResolvedValue(true);
    render(
      <BrowserRouter>
        <UploadbuttonPage />
      </BrowserRouter>
    );
    // Wait for token validation to complete
    await waitFor(() => {
      expect(screen.getByText('MRT-Bildanalyse')).toBeInTheDocument();
    });
    // Create a mock file
    const file = new File(['dummy content'], 'test-image.png', { type: 'image/png' });
    // Get file input by type instead of role
    const fileInput = screen.getByDisplayValue('');
    // Simulate file selection
    fireEvent.change(fileInput, { target: { files: [file] } });
    // Check if preview is rendered
    expect(await screen.findByAltText('Vorschau')).toBeInTheDocument();
    expect(URL.createObjectURL).toHaveBeenCalledWith(file);
  });
  test('handles file upload submission', async () => {
    // Mock token verification to succeed
    useJwtStore.mockReturnValue('mock-jwt-token');
    JwtVerify.mockResolvedValue(true);
    // Mock fetch API
    global.fetch = vi.fn().mockResolvedValue({
      ok: true
    });
    render(
      <BrowserRouter>
        <UploadbuttonPage />
      </BrowserRouter>
    );
    // Wait for token validation to complete
    await waitFor(() => {
      expect(screen.getByText('MRT-Bildanalyse')).toBeInTheDocument();
    });
    // Create a mock file
    const file = new File(['dummy content'], 'test-image.png', { type: 'image/png' });
    // Get file input by type instead of role
    const fileInput = screen.getByDisplayValue('');
    // Simulate file selection
    fireEvent.change(fileInput, { target: { files: [file] } });
    // Click upload button
    const uploadButton = screen.getByRole('button', { name: /hochladen/i });
    fireEvent.click(uploadButton);
    // Verify fetch was called with correct parameters
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'http://test-api.com/upload/upload',
        expect.objectContaining({
          method: 'POST',
          headers: {
            Authorization: 'Bearer mock-jwt-token'
          },
          body: expect.any(FormData)
        })
      );
    });
  });
}
);