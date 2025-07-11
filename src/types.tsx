// For user registration request body
export interface RegisterUserPayload {
  email: string;
  name: string;
  password: string;
  confirmPassword?: string;
}

// For user login request body
export interface LoginUserPayload {
  email: string;
  password: string;
}

// Data returned about the user after successful login/registration
export interface User {
  id: number;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

// Response structure for successful login/registration
export interface AuthResponse {
  token: string;
  status: number;
}

// State shape for the authentication slice
export interface AuthState {
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Define the type for a single Film object
export interface Film {
    id: string;
    title: string;
    format: string;
    cast: string[];
    year: string;
  }

// Define the type for the Films slice's state
export interface FilmsState {
    films: Film[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  }