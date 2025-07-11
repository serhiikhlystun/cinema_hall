import { configureStore } from "@reduxjs/toolkit";
import filmsReducer from "../features/filmsSlice";
import authReducer from "../features/auth/authSlice";

const store = configureStore({
  reducer: {
    films: filmsReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;