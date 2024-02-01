import { createSlice } from "@reduxjs/toolkit";
import updateBudget from "../thunks/updateBudget";
import fetchTags from "../thunks/fetchTags";
import fetchBudget from "../thunks/fetchBudget";

const setupSlice = createSlice({
    name: "setup",
    initialState: {
        budget: 0,
        tags:[],
        dailyPendingTags: [],
        monthlyPendingTags: []
    },
    reducers: {
        updateTags(state, action) {
            state.tags = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(updateBudget.fulfilled, (state, action) => {
            state.budget = action.payload;
        })
        builder.addCase(fetchTags.fulfilled, (state, action) => {
            if (action.payload.frequency == "DAILY") state.dailyPendingTags = action.payload.pendingTags;
            else if (action.payload.frequency == "MONTHLY") state.monthlyPendingTags = action.payload.pendingTags;
        })
        builder.addCase(fetchBudget.fulfilled, (state, action) => {
            state.budget = action.payload;
        })
    },
})

export const { updateTags } = setupSlice.actions;
export const setupReducer = setupSlice.reducer;