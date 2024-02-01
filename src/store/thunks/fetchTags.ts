import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { FetchTagsAPI } from "../../types/types";

const API_URL = process.env.REACT_APP_API_URL;

const fetchTags = createAsyncThunk("tags/fetch", async (data: FetchTagsAPI) => {
    try {
        const response = await axios({
            method: "GET",
            url: `${API_URL}/pending/tags`,
            params: {
                frequency: data.frequency
            },
            headers: {
                "Authorization": `Bearer ${data.token}`
            },
            validateStatus: function (status) {
                return status < 500;
            }
        })
        if (response.status == 400) throw new Error(response.data.errorMessage);
        return {
            frequency: data.frequency,
            pendingTags: response.data.pendingTagNames
        }
    } catch (exception: any) {
        console.log(`Exception while fetching tags: ${exception.message}`);
        throw new Error(exception.message);
    }
})

export default fetchTags;