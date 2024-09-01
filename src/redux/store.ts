import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import { 
    persistReducer, 
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    persistStore, 
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./features/auth/authSlice";
import bookingReducer from "./features/booking/bookingSlice";

// Persist configuration for auth slice
const authPersistConfig = {
  key: "auth",
  storage,
};

// Persist configuration for booking slice
const bookingPersistConfig = {
  key: "booking",
  storage,
};

// Apply persistReducer to auth and booking reducers
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedBookingReducer = persistReducer(bookingPersistConfig, bookingReducer);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    booking: persistedBookingReducer, // Use the persisted booking reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Persistor for persisting the store
export const persistor = persistStore(store);
