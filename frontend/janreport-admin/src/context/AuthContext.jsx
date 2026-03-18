import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

// Backend base URL (adjust if needed)
export const API_BASE_URL = 'http://localhost:8080';


export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('user-token'));
 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = () => !!(token && user);

  const getAuthHeaders = () =>
    token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {};

  // ========== REGISTER ==========
  // userData: { email, password }
  const register = async (userData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/register`,
        {
          email: userData.email,
          password: userData.password,
        }
      );

      if (response.status === 200 || response.status === 201) {
        return {
          success: true,
          message: response.data?.message || 'Registration successful',
        };
      }

      return {
        success: false,
        message: response.data?.message || 'Registration failed',
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          'Network error. Please try again later.',
      };
    }
  };

  // ========== LOGIN ==========
  // userData: { email, password }
  const login = async (userData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        {
          email: userData.email,
          password: userData.password,
          // you can pass portal flag if backend uses it
          // portal: 'USER',
        }
      );

      if (response.status === 200) {
        const { token: jwtToken, email, role } = response.data;

        // update state
        setToken(jwtToken);
        setUser({ email, role });

        // persist in localStorage
        localStorage.setItem('user-token', jwtToken);
        localStorage.setItem('user-data', JSON.stringify({ email, role }));

        return { success: true };
      }

      return {
        success: false,
        message: response.data?.message || 'Login failed',
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          'Email or password is incorrect',
      };
    }
  };

  // ========== LOGOUT ==========
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('user-token');
    localStorage.removeItem('user-data');
    toast.success('Logged out successfully');
  };

  // Hydrate from localStorage on first load
  useEffect(() => {
    const storedToken = localStorage.getItem('user-token');
    const storedUser = localStorage.getItem('user-data');

    if (storedToken && storedUser) {
      setToken(storedToken);
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        // if parsing fails, clear corrupted data
        localStorage.removeItem('user-data');
      }
    }

    setLoading(false);
  }, []);

  const contextValue = {
    user,
    token,
    loading,
    register,
    login,
    logout,
    isAuthenticated,
    getAuthHeaders,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuthHook = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthHook must be used within an AuthProvider');
  }
  return context;
};
