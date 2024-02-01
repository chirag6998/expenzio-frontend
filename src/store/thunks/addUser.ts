import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../types/types";
import Cookies from "js-cookie";

const API_URL = process.env.REACT_APP_API_URL;

const addUser = createAsyncThunk("user/add", async (data: User) => {
    try {
        let response = await axios({
            method: "POST",
            url: `${API_URL}/users`,
            data,
            validateStatus: function (status) {
                return status < 500; // Resolve only if the status code is less than 500
            }
        })
        if (response.status == 400) throw new Error(response.data.errorMessage);
        Cookies.set("Expenzio", response.data.token, { expires: 7 });
        return response.data.token;
    } catch (exception: any) {
        console.log(`Exception while creating account: ${exception.message}`);
        throw new Error(exception.message);
    }
})

export default addUser;