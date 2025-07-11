import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  AuthState,
  AuthResponse,
  RegisterUserPayload,
  LoginUserPayload,
} from "../../types";

const API_AUTH_BASE_URL = process.env.REACT_APP_API_URL;

// Async Thunk for User Registration
export const registerUser = createAsyncThunk<AuthResponse, RegisterUserPayload>(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_AUTH_BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        return rejectWithValue(
          responseData.message || "Failed to register user"
        );
      }

      const data: AuthResponse = responseData;
      // Optionally store token in localStorage for persistence across sessions
      localStorage.setItem("authToken", data.token);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.message || "Network error during registration"
      );
    }
  }
);

// Async Thunk for User Login
export const loginUser = createAsyncThunk<AuthResponse, LoginUserPayload>(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_AUTH_BASE_URL}/sessions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const responseData = await response.json();
      if (!response.ok || responseData.status !== 1) {
        return rejectWithValue(responseData.message || "Failed to log in");
      }

      const data: AuthResponse = responseData;
      // Store token in localStorage for persistence
      localStorage.setItem("authToken", data.token);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Network error during login");
    }
  }
);

// Initial state: try to load token from localStorage
const initialState: AuthState = {
  token:
    localStorage.getItem("authToken") === "undefined"
      ? null
      : localStorage.getItem("authToken"), // Load token on app start
  status: "idle",
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Synchronous logout action
    logout: (state) => {
      state.token = null;
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("authToken"); // Clear token from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      // Register User
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.status = "succeeded";
          state.token = action.payload.token;
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          (action.payload as string) ||
          action.error.message ||
          "Registration failed";
        state.token = null;
      })
      // Login User
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.status = "succeeded";
          state.token = action.payload.token;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          (action.payload as string) || action.error.message || "Login failed";
        state.token = null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
