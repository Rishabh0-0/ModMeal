import { createContext, useContext, useEffect, useState } from "react";
import apiClient from "../utils/apiClient";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated on app load
  useEffect(() => {
    // Request interceptor to include token in the header
    apiClient.interceptors.request.use(
      (config) => {
        const currentToken = localStorage.getItem("token");
        if (currentToken) {
          config.headers.Authorization = `Bearer ${currentToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const checkAuth = async () => {
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        try {
          const res = await apiClient.get("/users/me");
          setUser(res.data.user);
          setToken(savedToken);
        } catch (err) {
          console.error(
            "Auth check failed:",
            err.response ? err.response.data : err.message
          );
          localStorage.removeItem("token");
          setUser(null);
          setToken(null);
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const res = await apiClient.post("/users/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      setUser(res.data.user); // Assuming your API returns { token: "...", user: { ... } }
      return {
        success: true,
        message: res.data.message || "Login successful",
      };
    } catch (err) {
      return {
        success: false,
        message:
          err.response?.data?.message ||
          err.message ||
          "Login failed. Please try again.",
      };
    }
  };

  // Register function
  const register = async (username, email, password) => {
    try {
      const res = await apiClient.post("/users/register", {
        email,
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      return {
        success: true,
        message: res.data.message || "Registration successful", // Provide a fallback message
      };
    } catch (err) {
      return {
        success: false,
        message:
          err.response?.data?.message ||
          err.message ||
          "Registration failed. Please try again.",
      };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  // Protected API call helper
  const protectedRequest = async (method, url, data = {}, options = {}) => {
    try {
      const res = await apiClient({
        method,
        url,
        data: method.toLowerCase() !== "get" ? data : undefined,
        params: method.toLowerCase() === "get" ? data : undefined,
        ...options,
      });
      return res;
    } catch (err) {
      console.error(
        `Protected request to ${url} failed:`,
        // Corrected error logging:
        err.response ? err.response.data : err.message
      );
      throw err;
    }
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    protectedRequest,
    isAuthenticated: !!token,
    apiClient, // Exposing apiClient can be useful for direct use in some cases
    loading, // Expose loading state
  };

  return (
    <AuthContext.Provider value={value}>
      {/*
        Consider what to show during the initial loading state.
        You might want a global loader here, or let child components decide.
        The current `!loading && children` means nothing is rendered until loading is false.
      */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export default AuthProvider;
