import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../features/productSlice";
import userSlice from "../features/userSlice";
import cartSlice from "../features/cartSlice"
import authSlice from "../features/authSlice";

import storage from 'redux-persist/lib/storage'
import { combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage,
}

const reducer = combineReducers({
  products: productSlice,
  user: userSlice,
  cart: cartSlice,
  auth: authSlice
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
