import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import {
  ADD_PRODUCT_TO_CART,
  ADD_USER_ADDRESS, ADD_WHISHLIST,
  CART_TO_WISHLIST,
  DELETE_USER_ADDRESS, FETCH_ORDERS_API, REMOVE_PRODUCT_FROM_CART, REMOVE_WHISHLIST, UPDATE_USER_ADDRESS,
  UPDATE_USER_PROFILE_DATA,
  WISHLIST_TO_CART
} from "../util/api";



export const addProductToWhistlist = createAsyncThunk("posts/addProductToWhistlist", async (data, { rejectWithValue }) => {
  try {
    const tokenPayload = {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
      }
    }
    const response = await axios.post(ADD_WHISHLIST, data, tokenPayload)
    // console.log(response.data);

    if (response?.data?.success) {
      toast.success("Added To Wishlist")
    }
    // console.log(response.data.wishlist);

    return response?.data?.wishlist
  } catch (error) {
    console.log(error);
    toast.error("Failed to Wishlist");

  }
})

export const removeProductFromWishlist = createAsyncThunk("posts/removeProductFromWishlist", async (data, { rejectWithValue }) => {
  try {
    const tokenPayload = {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
      }
    }
    const response = await axios.post(REMOVE_WHISHLIST, data);
    // console.log(response);

    // console.log(response?.data.data);

    if (response?.data?.success) {
      toast.success("Removed From Wishlist")
    }
    return response?.data?.data?.wishlist

  } catch (error) {
    console.log(error);
    toast.error("Failed to remove from wishlist");
  }
})

export const updateUserData = createAsyncThunk("posts/updateUserData", async (formData, { rejectWithValue }) => {
  const toastId = toast.loading("Please wait...")
  try {
    const tokenPayload = {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
      }
    }
    const token = JSON.parse(localStorage.getItem("token"))
    const result = await axios.post(UPDATE_USER_PROFILE_DATA, formData, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    toast.dismiss(toastId);
    if (result.data.success) {
      toast.success('Profile Updated Successfully')
    }
    console.log(result.data.user);

    return result.data.user
  } catch (error) {
    toast.dismiss(toastId);
    console.log(error);
    toast.error('Sorry! Try Again')
  }
})

export const addUserAddress = createAsyncThunk("posts/addUserAddress", async (userAddress, { rejectWithValue }) => {
  const toastId = toast.loading("Please wait...")
  try {
    const tokenPayload = {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
      }
    }
    // const token = JSON.parse(localStorage.getItem("token"))
    const response = await axios.post(ADD_USER_ADDRESS, userAddress, tokenPayload)

    toast.dismiss(toastId);
    if (response?.data?.success) {
      toast.success("Address added successfully")
    }

    return response?.data?.address

  } catch (error) {
    toast.dismiss(toastId);
    toast.error(error?.response?.data?.message)
    return rejectWithValue(error?.response?.data?.message)
  }
})

export const deleteUserAddress = createAsyncThunk('posts/deleteUserAddress', async (addressId, { rejectWithValue }) => {
  const toastId = toast.loading("Please wait...")
  try {
    const tokenPayload = {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
      }
    }
    // const token = JSON.parse(localStorage.getItem("token"))

    const result = await axios.post(DELETE_USER_ADDRESS, { addressId }, tokenPayload)

    toast.dismiss(toastId);
    if (result.data.success) {
      toast.success('Address Deleted Successfully')
    }

    return result?.data?.address
  } catch (error) {
    toast.dismiss(toastId);
    console.log(error);
    toast.error(error.message)
    return rejectWithValue(error?.response?.data?.message)
  }
})

export const updateUserAddress = createAsyncThunk("posts/updateUserAddress", async (updatedData, { rejectWithValue }) => {
  const toastId = toast.loading("Please wait...")
  try {
    const tokenPayload = {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
      }
    }

    const result = await axios.post(UPDATE_USER_ADDRESS, updatedData, tokenPayload)

    toast.dismiss(toastId);
    if (result?.data?.success) {
      toast.success('Address Updated Successfully')
    }
    // console.log(result.data?.address);

    return result?.data?.address

  } catch (error) {
    toast.dismiss(toastId);
    console.log(error?.response?.data);
    toast.error(error?.response?.data?.message)
    return rejectWithValue(error?.response?.data?.message)
  }
})

export const addToCart = createAsyncThunk("posts/addToCart", async (productId, { rejectWithValue }) => {
  const toastId = toast.loading("Please wait...")
  try {
    const tokenPayload = {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
      }
    }

    const result = await axios.post(ADD_PRODUCT_TO_CART, productId, tokenPayload)
    // console.log(result.data);

    toast.dismiss(toastId);
    if (result?.data?.success) {
      toast.success("Added To Cart")
    }
    return result?.data?.cart

  } catch (error) {

    toast.dismiss(toastId);
    toast.error(error?.response?.data?.message)
    console.log(error);
    return rejectWithValue(error?.response?.data?.message)
  }
})

export const removeFromCart = createAsyncThunk("posts/removeFromCart", async (cartModelId, { rejectWithValue }) => {

  // const toastId = toast.loading("Please wait")
  try {
    const tokenPayload = {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
      }
    }
    const result = await axios.post(REMOVE_PRODUCT_FROM_CART, { cartModelId }, tokenPayload)
    // toast.dismiss(toastId);

    if (result?.data?.success) {
      toast.success('Removed From Cart')
    }
    console.log(result.data?.cart);

    return result?.data?.cart
  } catch (error) {
    // toast.dismiss(toastId);
    console.log(error);
    toast.error(error?.response?.data?.message)
    return rejectWithValue(error?.response?.data?.message)
  }
})

export const cartToWishlist = createAsyncThunk("posts/cartToWishlist", async (dataPayload, { rejectWithValue }) => {

  // const toastId = toast.loading("Please wait")
  try {
    const tokenPayload = {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
      }
    }
    const result = await axios.post(CART_TO_WISHLIST, dataPayload, tokenPayload)
    // toast.dismiss(toastId);

    if (result?.data?.success) {
      toast.success('Added To Wishlist')
    }
    // console.log(result.data);

    return result?.data
  } catch (error) {
    // toast.dismiss(toastId);
    console.log(error);
    toast.error(error?.response?.data?.message)
    return rejectWithValue(error?.response?.data?.message)
  }
})

export const wishlistToCart = createAsyncThunk("posts/wishlistToCart", async (productId, { rejectWithValue }) => {

  try {
    const tokenPayload = {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
      }
    }
    const result = await axios.post(WISHLIST_TO_CART, { productId }, tokenPayload)

    if (result?.data?.success) {
      toast.success('Added To Cart')
    }
    // console.log(result.data);

    return result?.data
  } catch (error) {
    // toast.dismiss(toastId);
    console.log(error);
    toast.error("Something Went Wrong")
    return rejectWithValue(error?.response?.data?.message)
  }
})

export const fetchOrders = createAsyncThunk('posts/fetchOrders', async (userId, { rejectWithValue }) => {
  const toastId = toast.loading("Fetching Orders")

  try {
    const tokenPayload = {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
      }
    }

    const response = await axios.get(FETCH_ORDERS_API, tokenPayload)
    // console.log("FETCH_ORDERS_API......", response);

    if (response?.data?.success) {
      toast.dismiss(toastId);
      toast.success(response?.data?.message)
    }
    // console.log(response?.data);

    return response?.data?.orders
  } catch (error) {
    // console.log(error?.response);

    toast.dismiss(toastId)
    toast.error(error?.response?.data?.message)
    return rejectWithValue(error?.response?.data?.message)
  }
})


const initialState = {
  user: null,
  wishlist: [],
  orders: [],
  status: "idle",
  error: null,
  token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null

};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setStatus: (state, { payload }) => {
      state.status = payload
    },
    setToken: (state, { payload }) => {
      state.token = payload
    },
    setUser: (state, { payload }) => {
      // console.log(payload?.token);
      state.user = { ...payload }
      state.wishlist = [...payload.wishlist]
      state.token = payload?.token
    },
    setUserCart: (state, { payload }) => {
      console.log("userCart payload", payload);
      state.user.cart = payload || JSON.parse(localStorage.getItem("cart"))
    },
    setWhistlist: (state, { payload }) => {
      // console.log(payload);
      state.wishlist = [...payload]
    },

    resetUser: (state) => {
      state.user = null
      state.wishlist = []
      state.status = "idle"
      state.error = null
      state.token = null
      state.orders = []
      localStorage.removeItem("token")
    }
  },

  extraReducers: (builder) => {

    builder.addCase(addProductToWhistlist.pending, (state) => {
      state.status = "loading"
    });
    builder.addCase(addProductToWhistlist.fulfilled, (state, { payload }) => {
      state.wishlist = [...payload]
       state.status = "success"
      // localStorage.setItem("products", JSON.stringify(payload))
    });
    builder.addCase(addProductToWhistlist.rejected, (state) => {
      state.status = "error"
      // localStorage.setItem("products", JSON.stringify(payload))
    });

    builder.addCase(removeProductFromWishlist.pending, (state) => {
      state.status = "loading"
    });
    builder.addCase(removeProductFromWishlist.fulfilled, (state, { payload }) => {

      state.wishlist = [...payload]
      state.status = "success"
    });
    builder.addCase(removeProductFromWishlist.rejected, (state,) => {
      state.status = "error"
    });

    builder.addCase(updateUserData.pending, (state, { payload }) => {
      state.status = "loading"
    });
    builder.addCase(updateUserData.fulfilled, (state, { payload }) => {
      state.user = payload
      state.status = "success"
    });
    builder.addCase(updateUserData.rejected, (state, { payload }) => {
      state.status = "error"
    });

    builder.addCase(addUserAddress.pending, (state,) => {
      state.status = "loading"
    });
    builder.addCase(addUserAddress.fulfilled, (state, { payload }) => {
      state.status = "success"
      state.user.address = [...payload]
    });
    builder.addCase(addUserAddress.rejected, (state,) => {
      state.status = "error"
    });

    // deleteUserAddress
    builder.addCase(deleteUserAddress.pending, (state) => {
      state.status = "loading"
    });
    builder.addCase(deleteUserAddress.fulfilled, (state, { payload }) => {
      state.status = "success"
      // console.log(payload);

      state.user.address = [...payload]
    });
    builder.addCase(deleteUserAddress.rejected, (state,) => {
      state.status = "error"
    });

    //updateUserAddress
    builder.addCase(updateUserAddress.pending, (state) => {
      state.status = "loading"
    });
    builder.addCase(updateUserAddress.fulfilled, (state, { payload }) => {
      state.status = "success"
      state.user.address = [...payload]
    });
    builder.addCase(updateUserAddress.rejected, (state,) => {
      state.status = "idle"
    });

    //add cart
    builder.addCase(addToCart.pending, (state,) => {
      state.status = "loading"
    });
    builder.addCase(addToCart.fulfilled, (state, { payload }) => {

      state.status = "idle"
      state.user.cart = [...payload]
      localStorage.setItem("cart", JSON.stringify([...payload]))

    });
    builder.addCase(addToCart.rejected, (state) => {
      state.status = "error"
    });

    // removeFromCart
    builder.addCase(removeFromCart.pending, (state,) => {
      state.status = "loading"
    });
    builder.addCase(removeFromCart.fulfilled, (state, { payload }) => {
      state.status = "idle"
      state.user.cart = [...payload]
      localStorage.setItem("cart", JSON.stringify(payload))
    });
    builder.addCase(removeFromCart.rejected, (state) => {
      state.status = "error"
      state.error = payload
    });

    // cartToWishlist
    builder.addCase(cartToWishlist.pending, (state) => {
      state.status = "loading"
      if (state.error) {
        state.error = null
      }
    });
    builder.addCase(cartToWishlist.fulfilled, (state, { payload }) => {

      state.user.cart = payload.cart
      state.wishlist = payload.wishlist
      state.user.wishlist = payload.wishlist
      state.status = "idle"
      localStorage.setItem("cart", JSON.stringify(payload.cart))

    });
    builder.addCase(cartToWishlist.rejected, (state, { payload }) => {
      state.status = "error"
      state.error = payload
    });

    builder.addCase(wishlistToCart.pending, (state) => {
      state.status = "loading"
      if (state.error) {
        state.error = null
      }
    });
    builder.addCase(wishlistToCart.fulfilled, (state, { payload }) => {

      localStorage.setItem("cart", JSON.stringify(payload.cart))
      state.user.cart = payload.cart
      state.wishlist = payload.wishlist
      state.user.wishlist = payload.wishlist
      state.status = "success"

    });
    builder.addCase(wishlistToCart.rejected, (state, { payload }) => {
      state.status = "error",
        state.error = payload
    });

    builder.addCase(fetchOrders.pending, (state) => {
      state.status = "loading"
    });
    builder.addCase(fetchOrders.fulfilled, (state, { payload }) => {

      state.status = "success"
      // state.user.cart = []
      state.orders = payload
      // localStorage.setItem("cart", [])
    });
    builder.addCase(fetchOrders.rejected, (state, { payload }) => {

      state.status = "error"
      state.error = payload
    });
  }

});

export const { setUserCart, setUser, setToken, setWhistlist, resetUser } = userSlice.actions
export default userSlice.reducer;
