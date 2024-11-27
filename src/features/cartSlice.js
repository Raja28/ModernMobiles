import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { CAPTURE_PAYMENT_API, CART_TO_WISHLIST, PRODUCT_QUANTITY, VERIFY_PAYMENT_API } from "../util/api";
import toast from "react-hot-toast";

const brandImage = "https://res.cloudinary.com/dooxbo8sg/image/upload/v1720036696/MP-1-NeoG/MP-Logo_lwscnz.png"

// TODO : Add Toast for user info



function loadScript(src) {

    return new Promise((resolve) => {


        const script = document.createElement("script")
        script.src = src

        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }

        document.body.appendChild(script)
    })
}

export const checkout = createAsyncThunk("posts/checkout", async ({ total, user, deliveryAddressId }, { dispatch, rejectWithValue }) => {

    const toastId = toast.loading("Please wait...")
    try {
        const tokenPayload = {
            headers: {
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        }
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

        if (!res) {
            toast.dismiss(toastId)
            toast.error("RazorPay SDK failed to load")
            return
        }

        // initiate order
        // const total = "15000"
        const orderResponse = await axios.post(CAPTURE_PAYMENT_API, { total }, tokenPayload)

        if (!orderResponse.data.success) {
            toast.dismiss(toastId)
            toast.error(orderResponse.data.message)
            return
            // throw new Error(orderResponse.data.message)
        }

        // console.log("PAYMENT RESPONSE FROM BACKEND", orderResponse.data)
        const receipt = orderResponse.data.data.receipt
        // open razorpay sdk
        const options = {
            
            key: import.meta.env.VITE_RAZORPAY_KEY,
            curreny: orderResponse.data.data.curreny,
            amount: orderResponse.data.data.amount,
            order_id: orderResponse.data.data.id,
            name: "ModernMobiles",
            description: "Thank you for Purchasing",
            image: brandImage,
            prefill: {
                name: `${user?.firstName} ${user?.lastName}`,
                email: user?.email
            },

            handler: function (response) {
                const amount = total
                toast.dismiss(toastId)
                dispatch(verifyPayment({ ...response, deliveryAddressId, amount, receipt }))
            }
        }
        toast.dismiss(toastId)
        const paymentObject = new window.Razorpay(options)

        paymentObject.open()
        paymentObject.on("payment.failed", function (response) {
            toast.dismiss(toastId)
            toast.error("Oops! Payment Failed")
            console.log(response.error);
        })

    } catch (error) {
        toast.dismiss(toastId)
        console.log("PAYMENT API ERROR", error);

        toast.error("Could Not Make Payment")
    }
})

export const verifyPayment = createAsyncThunk("posts/verifyPayment", async (bodyData, { rejectWithValue }) => {

    const toastId = toast.loading("Verifying Payment...")
    try {
        const tokenPayload = {
            headers: {
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        }
        const response = await axios.post(VERIFY_PAYMENT_API, bodyData, tokenPayload)

        // console.log("VERIFY PAYMENT RESPONSE", response)

        if (!response?.data?.success) {
            toast.dismiss(toastId)
            toast.error(response?.data?.message)
        }

        toast.dismiss(toastId)
        toast.success("Payment Successful, Your Order is Placed")


    } catch (error) {
        toast.dismiss(toastId)
        console.log("PAYMENT VERIFY ERROR............", error)
        // toast.error("Could Not Verify Payment.")
        toast.error(error.response.data.message)
        return rejectWithValue(error.response.data.message)
    }
})

export const addQuantity = createAsyncThunk("posts/addQuantity", async (quantityDetails, { rejectWithValue }) => {

    try {
        const tokenPayload = {
            headers: {
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        }

        const result = await axios.post(PRODUCT_QUANTITY, quantityDetails, tokenPayload)

        // console.log(result?.data?.data);

        return result?.data?.data

    } catch (error) {
        console.log(error);
        return rejectWithValue(error?.response?.data?.message)

    }
})

export const reduceQuantity = createAsyncThunk("posts/quantityHandler", async (quantityDetails, { rejectWithValue }) => {

    try {
        const tokenPayload = {
            headers: {
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        }
        const result = await axios.post(PRODUCT_QUANTITY, quantityDetails, tokenPayload)

        // console.log(result?.data?.data);

        return result?.data?.data

    } catch (error) {
        console.log(error);
        return rejectWithValue(error?.response?.data?.message)

    }
})


const initialState = {

    cartItems: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    address: "",
    total: 0,
    status: "idle",
    error: "null"
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

        setCart: (state,) => {
            state.cartItems = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
            // state.totalItems = state.cartItems.length
            state.total = state?.cartItems?.reduce((acc, curr) => acc + (curr.product.price * curr.quantity), 0)
        },
        setCartStatus: (state, { payload }) => {
            state.status = payload || "idle"
        },

        // addtoCart: (state, { payload }) => {
        //     const index = state.items.findIndex(product => product._id === payload._id)

        //     if (index >= 0) {
        //         // toast to add
        //         return
        //     }

        //     // localStorage.setItem("cart", JSON.stringify(state.cart))
        //     // localStorage.setItem("total", JSON.stringify(state.total))
        //     // localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
        //     // toast to add
        // },

        setTotal: (state) => {
            state.total = state?.cartItems?.reduce((acc, curr) => acc + (curr.quantity * curr.product.price), 0)

        },

        resetCart: (state) => {
            state.cartItems = []
            state.total = 0
            state.status = "idle"
            state.error = null
            state.address = ""
            localStorage.removeItem("cart")
            localStorage.removeItem("total")
        }
    },

    extraReducers: (builder) => {

        builder.addCase(addQuantity.pending, (state) => {
            state.status = "loading"
        });
        builder.addCase(addQuantity.fulfilled, (state, { payload }) => {

            state.status = "idle"
            const cartIndex = state.cartItems.findIndex(product => product?._id === payload?._id)

            state.cartItems[cartIndex].quantity = payload.quantity

            const localStorageCartItems = JSON.parse(localStorage.getItem("cart"))

            localStorageCartItems[cartIndex].quantity = payload.quantity

            localStorage.setItem("cart", JSON.stringify(localStorageCartItems))

        });
        builder.addCase(addQuantity.rejected, (state, { payload }) => {
            state.status = "idle",
                state.error = payload
        });

        builder.addCase(reduceQuantity.pending, (state, { payload }) => {
            state.status = "loading"
        });
        builder.addCase(reduceQuantity.fulfilled, (state, { payload }) => {
            state.status = "idle"
            const cartIndex = state.cartItems.findIndex(product => product?._id === payload?._id)

            state.cartItems[cartIndex].quantity = payload.quantity

            const localStorageCartItems = JSON.parse(localStorage.getItem("cart"))

            localStorageCartItems[cartIndex].quantity = payload.quantity
            localStorage.setItem("cart", JSON.stringify(localStorageCartItems))
        });
        builder.addCase(reduceQuantity.rejected, (state, { payload }) => {
            state.status = "idle",
                state.error = payload
        });

        builder.addCase(checkout.pending, (state) => {
            state.status = "loading"
        });
        builder.addCase(checkout.fulfilled, (state) => {
            state.status = "idle"
        });
        builder.addCase(checkout.rejected, (state, { payload }) => {
            state.status = "idle"
            state.error = payload
        });

        builder.addCase(verifyPayment.pending, (state) => {
            state.status = "loading"

        });

        builder.addCase(verifyPayment.fulfilled, (state, { payload }) => {
            state.cartItems = []
            state.status = "success"
            localStorage.setItem("cart", JSON.stringify([]))
        });
        builder.addCase(verifyPayment.rejected, (state, { payload }) => {

            state.status = "false"
            state.error = payload
        });


    }
})

export const { addtoCart, resetCart, setCart, setTotal, setCartStatus } = cartSlice.actions
export default cartSlice.reducer