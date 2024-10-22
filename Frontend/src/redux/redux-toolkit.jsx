import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'
import adminReducer from './adminSlice';
import emailReducer from './emailSlice'

const store = configureStore({
    reducer: {
        userInfo: userReducer,
        adminInfo: adminReducer,
        email: emailReducer,
    }
});


export default store;