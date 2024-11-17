// Unit tests for: Login using Vitest

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../../redux/api/users";
import { setCredentials } from "../../../redux/features/auth/authSlice";
import Login from '../Login';

// Mocking necessary modules
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    __esModule: true,
    ...actual,
    useNavigate: vi.fn(),
  };
});

vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux");
  return {
    __esModule: true,
    ...actual,
    useDispatch: vi.fn(),
    useSelector: vi.fn(),
  };
});

vi.mock("../../../redux/api/users", async () => {
  const originalModule = await vi.importActual("../../../redux/api/users");
  return {
    __esModule: true,
    ...originalModule,
    useLoginMutation: vi.fn(),
  };
});

vi.mock("../../../redux/features/auth/authSlice", async () => {
  const originalModule = await vi.importActual("../../../redux/features/auth/authSlice");
  return {
    __esModule: true,
    ...originalModule,
    setCredentials: vi.fn(),
  };
});

vi.mock("../../../component/Loader", () => () => <div>Loading...</div>);

describe('Login() Login method', () => {
  let mockNavigate;
  let mockDispatch;
  let mockLogin;

  beforeEach(() => {
    mockNavigate = vi.fn();
    mockDispatch = vi.fn();
    mockLogin = vi.fn();

    useNavigate.mockReturnValue(mockNavigate);
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockReturnValue({ userInfo: null });
    useLoginMutation.mockReturnValue([mockLogin, { isLoading: false }]);
  });

  describe('Happy Path', () => {
    it('should render the login form correctly', () => {
      render(<Login />);
      expect(screen.getByText('Sign In')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter Email')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter Password')).toBeInTheDocument();
    });

    it('should handle successful login', async () => {
      mockLogin.mockResolvedValueOnce({ data: { token: 'fakeToken' } });

      render(<Login />);
      fireEvent.change(screen.getByPlaceholderText('Enter Email'), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByPlaceholderText('Enter Password'), { target: { value: 'password' } });
      fireEvent.click(screen.getByText('Sign In'));

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password' });
        expect(mockDispatch).toHaveBeenCalledWith(setCredentials({ token: 'fakeToken' }));
        expect(mockNavigate).toHaveBeenCalledWith('/');
      });
    });
  });

  describe('Edge Cases', () => {
    it('should display error message on login failure', async () => {
      mockLogin.mockRejectedValueOnce({ data: { message: 'Invalid credentials' } });

      render(<Login />);
      fireEvent.change(screen.getByPlaceholderText('Enter Email'), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByPlaceholderText('Enter Password'), { target: { value: 'wrongpassword' } });
      fireEvent.click(screen.getByText('Sign In'));

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('Invalid credentials');
      });
    });

    it('should disable the submit button when loading', () => {
      useLoginMutation.mockReturnValue([mockLogin, { isLoading: true }]);

      render(<Login />);
      expect(screen.getByText('Signing In ...')).toBeDisabled();
    });

    it('should redirect if userInfo is present', () => {
      useSelector.mockReturnValue({ userInfo: { name: 'John Doe' } });

      render(<Login />);
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });
});

// End of unit tests for: Login using Vitest
