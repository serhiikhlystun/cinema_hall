import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { Film, FilmsState } from "../types";

// Define API base URL for films
const API_FILMS_BASE_URL = process.env.REACT_APP_API_URL;

const getAuthHeaders = (state: RootState) => {
  const token = state.auth.token;
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

// Thunk to fetch films
export const fetchFilms = createAsyncThunk<
  | Film[]
  | { data: Film[] }
  | {
      status: number;
      error?: { code: string; fields?: any; message?: string };
    },
  void,
  { state: RootState; rejectValue: string }
>("films/fetchFilms", async (_, { getState, rejectWithValue }) => {
  // Add {state: RootState} to access store state
  const state = getState(); // Get the current Redux state
  try {
    const response = await fetch(`${API_FILMS_BASE_URL}/movies`, {
      headers: getAuthHeaders(state), // Pass the state to getAuthHeaders
    });

    const responseData = await response.json();
    
    if (!response.ok || responseData.status !== 1) {
      console.log(responseData);
      const errorMessage =
        responseData.error?.code ||
        responseData.message ||
        "Failed to fetch films (API Error)";
      return rejectWithValue(errorMessage);
    }
    // const data: Film[] = await response.json();
    
    return responseData;
  } catch (error: any) {
    return rejectWithValue(error.message || "Network error during fetch films");
  }
});

// Thunk to add a new film
export const addFilmAsync = createAsyncThunk<
  Film,
  Omit<Film, "id">,
  { state: RootState }
>("films/addFilm", async (newFilmData, { getState, rejectWithValue }) => {
  const state = getState();
  try {
    const response = await fetch(`${API_FILMS_BASE_URL}/movies`, {
      method: "POST",
      headers: getAuthHeaders(state),
      body: JSON.stringify(newFilmData),
    });
    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: "Unknown error during add" }));
      return rejectWithValue(
        errorData.message || `Failed to add film: ${response.status}`
      );
    }
    const data: Film = await response.json();
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message || "Network error during add film");
  }
});

// Thunk to delete a film
export const deleteFilmAsync = createAsyncThunk<
  string,
  string,
  { state: RootState }
>("films/deleteFilm", async (filmId, { getState, rejectWithValue }) => {
  const state = getState();
  try {
    const response = await fetch(`${API_FILMS_BASE_URL}/movies/${filmId}`, {
      method: "DELETE",
      headers: getAuthHeaders(state),
    });
    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: "Unknown error during delete" }));
      return rejectWithValue(
        errorData.message || `Failed to delete film: ${response.status}`
      );
    }
    return filmId;
  } catch (error: any) {
    return rejectWithValue(error.message || "Network error during delete film");
  }
});

// Initial state, strongly typed
const initialState: FilmsState = {
  films: [],
  status: "idle",
  error: null,
};

export const filmsSlice = createSlice({
  name: "films",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchFilms
      .addCase(fetchFilms.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFilms.fulfilled, (state, action: PayloadAction<Film[]>) => {
        state.status = "succeeded";
        state.films = action.payload;
      })
      .addCase(fetchFilms.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          (action.payload as string) ||
          action.error.message ||
          "An unknown error occurred during fetch";
      })
      // addFilmAsync
      .addCase(addFilmAsync.fulfilled, (state, action: PayloadAction<Film>) => {
        state.films.push(action.payload);
      })
      .addCase(addFilmAsync.rejected, (state, action) => {
        state.error =
          (action.payload as string) ||
          action.error.message ||
          "An unknown error occurred during add film";
        console.error("Failed to add film:", action.error.message);
      })
      // deleteFilmAsync
      .addCase(
        deleteFilmAsync.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.films = state.films.filter(
            (film) => film.id !== action.payload
          );
        }
      )
      .addCase(deleteFilmAsync.rejected, (state, action) => {
        state.error =
          (action.payload as string) ||
          action.error.message ||
          "An unknown error occurred during delete film";
        console.error("Failed to delete film:", action.error.message);
      });
  },
});

export default filmsSlice.reducer;
