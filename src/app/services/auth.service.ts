import { message } from 'antd';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  firstName: string;
  lastName: string;
  tokenType: string;
  token: string;
}

export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

const API_URL = 'https://localhost:7777/api'; // Changed to HTTPS

export const authService = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await fetch(`${API_URL}/accounts/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      return await response.json();
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'An error occurred during login');
      throw error;
    }
  },

  async signup(data: SignupRequest): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/accounts/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed');
      }

      message.success('Account created successfully! Please verify your email.');
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'An error occurred during signup');
      throw error;
    }
  },

  async forgotPassword(data: ForgotPasswordRequest): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/accounts/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Password reset request failed');
      }

      message.success('Password reset instructions sent to your email');
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'An error occurred');
      throw error;
    }
  },

  async resetPassword(data: ResetPasswordRequest): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/accounts/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Password reset failed');
      }

      message.success('Password reset successful. You can now login with your new password.');
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'An error occurred');
      throw error;
    }
  },
}; 