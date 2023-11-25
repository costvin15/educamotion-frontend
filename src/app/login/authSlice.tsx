import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

interface AuthState {
  first_name: string;
  last_name: string;
  email: string;
};

const initialState : AuthState = {
  first_name: '',
  last_name: '',
  email: ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState(state, action) {
      state = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
});

const { setAuthState } = authSlice.actions;
