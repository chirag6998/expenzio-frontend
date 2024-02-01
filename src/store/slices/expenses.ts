import { createSlice } from "@reduxjs/toolkit";
import fetchExpensesAPI from "../thunks/fetchExpenses";

const expenses = createSlice({
    name: "expenses",
    initialState: {
        totalAmount: 0,
        expenses: []
    },
    reducers: {
        updateExpense(state, action) {
            state.totalAmount = action.payload.totalAmount;
            state.expenses = action.payload.expense;
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchExpensesAPI.fulfilled, (state, action) => {
            state.totalAmount = action.payload.totalAmount;
            state.expenses = action.payload.expenses;
        })
    }
})

export const { updateExpense } = expenses.actions;
export const expensesReducer = expenses.reducer;