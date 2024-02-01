import { createSlice } from "@reduxjs/toolkit";
import addUser from "../thunks/addUser";
import signIn from "../thunks/signIn";

const userSlice = createSlice({
    name: "user",
    initialState: {
        token: ""
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(addUser.fulfilled, (state, action) => {
            state.token = action.payload;
        })
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.token = action.payload;
        })
    }
})

export const { setToken } = userSlice.actions;
export const userReducer = userSlice.reducer;