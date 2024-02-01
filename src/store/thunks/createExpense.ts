import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CreateExpenseAPI } from "../../types/types";

const API_URL = process.env.REACT_APP_API_URL;

const createExpense = createAsyncThunk("expense/create", async (data: CreateExpenseAPI) => {

    const response = await axios({
        url: `${API_URL}/expense`,
        method: "POST",
        headers: {
            "Authorization": `Bearer ${data.token}`
        },
        data: {
            tagName: data.tagName,
            amount: data.amount
        }
    })

    return response.data;
})

export default createExpense;