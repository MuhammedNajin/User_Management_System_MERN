import { createSlice } from "@reduxjs/toolkit";

const userInfo = localStorage.getItem('userInfo');
const initialState = userInfo  ? true : false;
 console.log('hello', userInfo, initialState);

const userSlice = createSlice({
  name: "userInfo",
  initialState: {
    isLogged: initialState,
    token: userInfo,
  },
  reducers: {
    changeState: (state, action) => {
        console.log('payload', action.payload);
      state.isLogged = !state.isLogged;
      state.token = action.payload
      localStorage.setItem('userInfo', action.payload)
    },

    logout: (state) => {
      state.isLogged = false;
      state.token = null
      localStorage.removeItem('userInfo');

    },
  },
});

export const { changeState, logout } = userSlice.actions;
export default userSlice.reducer;
