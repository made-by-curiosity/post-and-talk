import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../../firebase/config';

export const signUp = createAsyncThunk('auth/signUp', async (credentials, thunkAPI) => {
  const { email, password, login, avatar } = credentials;
  try {
    await createUserWithEmailAndPassword(auth, email, password);

    const currentUser = auth.currentUser;
    if (currentUser) {
      await updateProfile(currentUser, { displayName: login, photoURL: avatar });
    }

    return {
      userId: currentUser.uid,
      user: {
        email: currentUser.email,
        login: currentUser.displayName,
        avatar: currentUser.photoURL,
      },
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logIn = createAsyncThunk('auth/logIn', async (credentials, thunkAPI) => {
  const { email, password } = credentials;

  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return {
      userId: user.uid,
      user: {
        email: user.email,
        login: user.displayName,
        avatar: user.photoURL,
      },
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logOut = createAsyncThunk('auth/logOut', async (_, thunkAPI) => {
  try {
    auth.signOut();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const authStateChangeUser = createAsyncThunk('auth/stateChange', async (user, thunkAPI) => {
  try {
    return {
      stateChange: !!user,
      userId: user?.uid || null,
      user: {
        email: user?.email || null,
        login: user?.displayName || null,
        avatar: user.photoURL || null,
      },
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
