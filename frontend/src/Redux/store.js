import { combineReducers, configureStore } from "@reduxjs/toolkit";
import useSlice from "./useSlice";
import productSlice from "./productSlice";

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const rootReducer=combineReducers({
  userdetails:useSlice,
  product:productSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store=configureStore({

  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),

})