import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

// Mocking the modules - isolate the module
jest.mock('./assets/css/App.css', () => {});
jest.mock('react-toastify/dist/ReactToastify.css', () => {});
jest.mock('./routers/appRouters', () => {});
jest.mock('./context/GlobalContext', () => {
  return {
    Provider: ({ children }) => <div>{children}</div>,
  };
});
jest.mock('react-router-dom', () => ({
  RouterProvider: ({ children }) => <div>{children}</div>,
}));
jest.mock('react-toastify', () => ({
  ToastContainer: () => <div>ToastContainer</div>,
}));

describe('<App />', () => {
  beforeEach(() => {
    // Mocking localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });
  });

  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText('ToastContainer')).toBeInTheDocument();
  });

  // Add more tests as needed
});
