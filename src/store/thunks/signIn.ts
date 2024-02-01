import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { SignInType } from "../../utilities/schema";

const API_URL = process.env.REACT_APP_API_URL;

const signIn = createAsyncThunk("signin/user", async (data: SignInType) => {
    try {
        let response = await axios({
            url: `${API_URL}/signin`,
            method: "POST",
            data,
            validateStatus: function (status) {
                return status < 500; // Resolve only if the status code is less than 500
            }
        })
        if (response.status == 400) throw new Error(response.data.errorMessage);
        Cookies.set("Expenzio", response.data.token, { expires: 7 });
        return response.data.token;
    } catch (exception: any) {
        console.log(`Exception while signing in: ${exception.message}`);
        throw new Error(exception.message);
    }
})

export default signIn;