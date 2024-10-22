import { createSlice } from "@reduxjs/toolkit";


const email = createSlice({
    name: 'email',
    initialState: {
        value: null,
    },
    reducers: {
        setEmail: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { setEmail } = email.actions;

export default email.reducer;
