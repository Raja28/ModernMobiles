import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { LOGIN_API, SENDOTP_API, SIGNUP_API } from '../util/api'
import toast from "react-hot-toast";
import axios from "axios";



export const sendOTP = createAsyncThunk("posts/sendOTP", async (email, { rejectWithValue }) => {
    let toastId = toast.loading("Sending OTP")
    try {
        const response = await axios.post(SENDOTP_API, { email });
        toast.dismiss(toastId)
        toast.success("OTP Sent")

    } catch (error) {
        toast.dismiss(toastId)
        toast.error("Unable to Send OTP, Try again")
        console.log(error);
        return rejectWithValue(error.response.data.message)
    }

});

export const signupNewUser = createAsyncThunk("posts/signup", async (formData, { rejectWithValue }) => {
    let toastId = toast.loading("Saving...")
    try {
        const response = await axios.post(SIGNUP_API, formData)
        toast.dismiss(toastId)
        toast.success("Sigup Successfull")

    } catch (error) {
        toast.dismiss(toastId)
        toast.error(error.response.data.message)
        console.log(error);
        return rejectWithValue(error.response.data.message)

    }
    toast.dismiss(toastId)
})

export const loginUser = createAsyncThunk("posts/loginUser", async (formData, { rejectWithValue }) => {

    let toastId = toast.loading("Verifying user")
    try {
        const response = await axios.post(LOGIN_API, formData,)
        toast.dismiss(toastId)
        toast.success("Login Successful")
        localStorage.setItem("token", JSON.stringify(response.data.token))

        return response.data.user

    } catch (error) {
        toast.error(error.response.data.message)
        toast.dismiss(toastId)
        return rejectWithValue(error.response.data.message)
    }
})

const initialState = {
    userData: {},
    loading: false,
    status: "idle",
    token: null
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserData: (state, { payload }) => {
            state.userData = payload

        },
        setLoading: (state, { payload }) => {
            state.loading = payload
        },
        setStatus: (state, { payload }) => {
            state.status = payload
        },
        resetAuth: (state) => {
            state.userData = null,
                state.loading = false,
                state.status = "idle"

        }
    },



    extraReducers: (builder) => {

        builder.addCase(sendOTP.pending, (state, action) => {
            state.status = "processing";
            state.loading = true

        });
        builder.addCase(sendOTP.fulfilled, (state, { payload }) => {
            state.status = "success";
            state.loading = false;

        });
        builder.addCase(sendOTP.rejected, (state,) => {
            state.status = "error";
            state.loading = false;

        });

        builder.addCase(signupNewUser.pending, (state) => {
            state.status = "processing";
            state.loading = true

        });
        builder.addCase(signupNewUser.fulfilled, (state) => {
            state.status = "success";
            state.loading = false;
            state.userData = null
        });
        builder.addCase(signupNewUser.rejected, (state,) => {
            state.status = "error";
            state.loading = false;

        });

        builder.addCase(loginUser.pending, (state) => {
            state.status = "processing";
            state.loading = true

        });
        builder.addCase(loginUser.fulfilled, (state, { payload }) => {
            state.status = "success";
            state.loading = false;
            state.userData = payload


            localStorage.setItem('cart', JSON.stringify(payload?.cart))
            let total = 0
            payload?.cart?.map(product => {
                total += product?.price
            })
            localStorage.setItem("total", JSON.stringify(total))

        });
        builder.addCase(loginUser.rejected, (state, { payload }) => {
            state.status = "error";
            state.loading = false;

        });

    },
})

export const { setLoading, setStatus, setUserData, resetAuth } = authSlice.actions
export default authSlice.reducer