import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AddTagsAPI } from "../../types/types";

const API_URL = process.env.REACT_APP_API_URL;

const addTagsAPI = createAsyncThunk("tags/add", async (data: AddTagsAPI) => {
    try {
        let response = await axios({
            url: `${API_URL}/tags`,
            method: "POST",
            headers: {
                "Authorization": `Bearer ${data.token}`
            },
            data: {
                tags: data.tags
            }
        })
        return response;
    } catch (exception: any) {
        console.log(`Exception while adding tags: ${exception.message}`);
        throw new Error(exception.message);
    }
})

export default addTagsAPI;