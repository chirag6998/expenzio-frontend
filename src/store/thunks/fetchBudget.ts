import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const fetchBudget = createAsyncThunk("budget/fetch", async (token: string) => {
    const response = await axios({
        url: `${API_URL}/budget`,
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        validateStatus: function (status) {
            return status < 500; // Resolve only if the status code is less than 500
        }
    })

    return response.data.amount;
})

export default fetchBudget;