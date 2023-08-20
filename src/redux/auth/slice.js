import { createSlice } from '@reduxjs/toolkit';
import { logIn, logOut, signUp, authStateChangeUser } from './operations';

const initialState = {
  user: { login: null, email: null, avatar: null },
  userId: null,
  stateChange: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.userId = action.payload.userId;
      state.stateChange = true;
    });
    builder.addCase(logIn.pending, state => {
      state.error = null;
    });
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.userId = action.payload.userId;
      state.stateChange = true;
    });
    builder.addCase(logIn.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(logOut.fulfilled, state => {
      state.user = { login: null, email: null, avatar: null };
      state.userId = null;
      state.stateChange = null;
    });
    builder.addCase(authStateChangeUser.fulfilled, (state, action) => {
      state.stateChange = action.payload.stateChange;
      state.user = action.payload.user;
      state.userId = action.payload.userId;
    });
    builder.addCase(authStateChangeUser.rejected, (state, action) => {
      state.user = { login: null, email: null, avatar: null };
      state.userId = null;
      state.stateChange = null;
    });
  },
});

export const authReducer = authSlice.reducer;
