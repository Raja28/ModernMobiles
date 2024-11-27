import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { FETCH_DATA_BY_BRAND, GET_PRODUCT_BY_ID_API } from "../util/api";



export const fetchData = createAsyncThunk("posts/fetchData", async (brand, { rejectWithValue }) => {
  // console.log("in productslice fetchdata by brand", brand);
  try {
    const brandName = brand[0].toUpperCase() + brand.split("").splice(1).join("")
    brand = brandName
    const response = await axios.get(FETCH_DATA_BY_BRAND + `${brand}`);
    return response.data.response;

  } catch (error) {
    console.log(error.response.data.message);
    return rejectWithValue(error.response.status + " " + error.response.data.message)
  }

});


export const fetchProductById = createAsyncThunk("posts/fetchProductById", async (productId, { rejectWithValue }) => {
  const tokenPayload = {
    headers: {
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
    }
  }

  try {
    const product = await axios.post(GET_PRODUCT_BY_ID_API, { productId }, tokenPayload)
    // console.log("fetchProductById->", product.data.product);
    return product.data.product

  } catch (error) {
    console.log(error);

    // return rejectWithValue(error.response.status + " " + error.response.data.message)
    return rejectWithValue(error.response.data.message)
  }
})

const initialState = {
  products: [],
  productDetails: {},
  status: "idle",
  error: null,
};
export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {

    setStatus: (state, { payload }) => {
      state.status = payload
    },
    setProducts: (state, { payload }) => {
      state.products = payload || localStorage.getItem("products") && JSON.parse(localStorage.getItem('products')) || []
    },
    setProductDetail: (state, { payload }) => {
      // console.log("setProductDetail",payload);
      state.productDetails = { ...payload } || {}
    },

    setFilterProducts: (state, { payload }) => {
      const { priceRange, category, rating, sortBy } = payload
      // // console.log(priceRange, category, rating, sortBy);

      const temp = localStorage.getItem('products') && JSON.parse(localStorage.getItem('products'))
      // console.log(temp);

      let filterdata;
      if (priceRange && temp?.length > 0) {
        filterdata = temp?.filter(product => product?.price <= priceRange)
      }
      if (category.length > 0) {
        filterdata = filterdata.filter(product => category?.includes(product?.category))
      }
      if (rating) {
        filterdata = filterdata.filter(product => product?.rating >= rating)
      }
      if (sortBy) {
        if (sortBy === "lowToHigh") {
          filterdata = filterdata.sort((obj1, obj2) => obj1?.price - obj2.price)

        } else {
          filterdata = filterdata.sort((obj1, obj2) => obj2.price - obj1?.price)
        }
      }

      state.products = filterdata
    },

    // setPriceRange: (state, {payload}) => {
    //   const temp = JSON.parse(localStorage.getItem('products'))
    //   state.products = temp?.filter(product => product?.price <= payload)
    // },

    // setCategory: (state, {payload}) => {
    //   state.products = state.products?.filter(product => payload?.includes(product?.category))
    // },

    // sortByPriceLowToHigh: (state) => {
    //   state.products.sort((obj1, obj2) => obj1.price - obj2.price);
    // },

    // sortByPriceHighToLow: (state) => {
    //   state.products.sort((obj1, obj2) => obj2.price - obj1.price);
    // },
    resetProduct: () => {
      state.productDetails = {}
      state.status = "idle"
      state.error = null
    }

  },

  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.status = "loading";
      if (state.error) {
        state.error = null
      }
    });

    builder.addCase(fetchData.fulfilled, (state, action) => {
      console.log(action.payload);

      state.status = "success"
      state.products = action.payload
      localStorage.setItem("products", JSON.stringify(action.payload))
      // console.log(state.products);

    });
    builder.addCase(fetchData.rejected, (state, action) => {
      // console.log(action.payload)
      state.status = "error",
        state.error = action.payload
    });

    builder.addCase(fetchProductById.pending, (state) => {
      state.status = "loading"
      if (state.error) {
        state.error = null
      }
    });

    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.status = "success",

        state.productDetails = action.payload
    });

    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.status = "error",
        state.error = action.payload
    });
  },
});

export const { setStatus, setProducts, setFilterProducts, setProductDetail, resetProduct } = productSlice.actions
export default productSlice.reducer;
