import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UpdateBudgetAPI } from "../../types/types";

const API_URL = process.env.REACT_APP_API_URL;

const updateBudget = createAsyncThunk("budget/update", async (data: UpdateBudgetAPI) => {
    try {
        await axios({
            url: `${API_URL}/budget`,
            method: "POST",
            headers: { "Authorization": `Bearer ${data.token}`},
            data: { amount: data.amount }
        })
    
        return data.amount;
    } catch (exception: any) {
        console.log(`Exception while updating budget: ${exception.message}`);
        throw new Error(exception.message);
    }
})

export default updateBudget;