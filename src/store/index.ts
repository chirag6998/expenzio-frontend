import { configureStore } from "@reduxjs/toolkit";
import { setupReducer } from "./slices/setup";
import { userReducer } from "./slices/user";
import { expensesReducer } from "./slices/expenses";

const store = configureStore({
    reducer: {
        setup: setupReducer,
        user: userReducer,
        expenses: expensesReducer
    }
})

export type AppDispatch = typeof store.dispatch;

export { store };