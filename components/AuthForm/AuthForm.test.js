// __tests__/AuthForm.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AuthForm from '../../components/AuthForm/AuthForm';
import { auth } from '../__mocks__/firebase'; // Mocked firebase module

describe('AuthForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should display error message on failure error', async () => {
    render(<AuthForm mode="login" />);

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'wrongpassword' },
    });

    // Submit the form
    fireEvent.click(screen.getByText('Login'));

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });

  test('should display error message on signup failure', async () => {
    render(<AuthForm mode="signup" />);

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'existinguser@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password' },
    });

    // Submit the form
    fireEvent.click(screen.getByText('Signup'));

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText('User already exists')).toBeInTheDocument();
    });
  });
});
