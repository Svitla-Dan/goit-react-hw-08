import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  loginUser,
  logoutUser,
  refreshAuthUser,
  registerUser,
} from './operations';

const initialAuthState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isLoading: false,
  isRefreshing: false,
  error: null,
};

const handlePending = state => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  extraReducers: builder => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(logoutUser.fulfilled, () => structuredClone(initialAuthState)) // ensures deep copy
      .addCase(refreshAuthUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshAuthUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isRefreshing = false;
        state.isLoggedIn = true;
      })
      .addCase(refreshAuthUser.rejected, state => {
        state.isRefreshing = false;
      })
      .addMatcher(
        isAnyOf(registerUser.pending, loginUser.pending),
        handlePending
      )
      .addMatcher(
        isAnyOf(registerUser.rejected, loginUser.rejected),
        handleRejected
      );
  },
});

export default authSlice.reducer;
