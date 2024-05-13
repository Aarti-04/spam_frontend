import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import userReducer from "./userSlice";
import messageReducer from "./messageSlice"; // Import the message slice
import thunk from "redux-thunk";
const persistConfigUser = {
  key: "user",
  storage,
};

const persistConfigMessage = {
  key: "message",
  storage,
  // You can add additional configuration options if needed
};
const EmailSocket = {
  key: "emailSocket",
};
const rootReducer = {
  user: persistReducer(persistConfigUser, userReducer),
  message: persistReducer(persistConfigMessage, messageReducer), // Include the message reducer in rootReducer
  // Add other reducers here if needed
};

const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store);
export default store;
