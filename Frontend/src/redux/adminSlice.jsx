
import { createSlice } from "@reduxjs/toolkit";

const isLogged = localStorage.getItem('adminInfo')
console.log('adminInfo', isLogged);
const adminInfo = isLogged ? true : false;
const admin = createSlice({
    name: 'adminInfo',
    initialState: {
        isLogged: adminInfo,
        token: isLogged
    },
    reducers: {
        adminLogin: (state, action) => {
           state.isLogged = true;
           state.token = action.payload
        },
        logout: (state) => {
            console.log('helllllllllllllllllllllllllllllllllllllllllll');
          state.isLogged = false;
          state.token = null
          localStorage.removeItem('adminInfo');
        }
    }
});

export const { adminLogin, logout } = admin.actions;

export default admin.reducer;

