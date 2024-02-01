import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchExpensesAPI } from "../../types/types";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const fetchExpensesAPI = createAsyncThunk("expenses/fetch", async (data: FetchExpensesAPI) => {

    const response = await axios({
        url: `${API_URL}/expenses`,
        method: "GET",
        headers: { "Authorization": `Bearer ${data.token}` },
        params: { startDate: data.startDate, endDate: data.endDate },
        validateStatus: function (status) {
            return status < 500; // Resolve only if the status code is less than 500
        }
    })
    return response.data;
})

export default fetchExpensesAPI;