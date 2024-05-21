import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  REGISTER,
  PURGE,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import userReducer from "../SLICE/UserSlice/userSlice";
import messageReducer from "../SLICE/MessageSlice/messageSlice"; // Import the message slice
import socketReducer from "../SLICE/SocketSlice/socketSlice";
import thunk from "redux-thunk";
const persistConfigUser = {
  key: "user",
  storage,
  // blacklist: ["userStatus", "userError", "user_google_cred"],
};

const persistConfigMessage = {
  key: "message",
  storage,
  blacklist: ["mailComposedOrNot", "ComposeMailStatus"],
};

const EmailSocket = {
  key: "emailSocket",
};
// console.log();

const rootReducer = {
  user: persistReducer(persistConfigUser, userReducer),
  message: persistReducer(persistConfigMessage, messageReducer),
  socket: socketReducer, // Include the message reducer in rootReducer

  // Add other reducers here if needed
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store);
export default store;
