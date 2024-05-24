import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  REGISTER,
  PURGE,
} from 'redux-persist';
// import storage from "redux-persist/lib/storage";
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import { WebStorage } from 'redux-persist/lib/types'; // defaults to localStorage
import userReducer from '../SLICE/UserSlice/userSlice';
import messageReducer from '../SLICE/MessageSlice/messageSlice'; // Import the message slice
import socketReducer from '../SLICE/SocketSlice/socketSlice';
import thunk from 'redux-thunk';
// const createNoopStorage = () => {
//   return {
//     getItem(_key) {
//       return Promise.resolve(null);
//     },
//     setItem(_key, value) {
//       return Promise.resolve(value);
//     },
//     removeItem(_key) {
//       return Promise.resolve();
//     },
//   };
// };
export function createPersistStorage(): WebStorage {
  const isServer = typeof window === 'undefined';

  // Returns noop (dummy) storage.
  if (isServer) {
    return {
      getItem() {
        return Promise.resolve(null);
      },
      setItem() {
        return Promise.resolve();
      },
      removeItem() {
        return Promise.resolve();
      },
    };
  }

  return createWebStorage('local');
}
const storage = createPersistStorage();
// typeof window !== "undefined"
//   ? createWebStorage("local")
//   : createNoopStorage();
const persistConfigUser = {
  key: 'user',
  storage,
  // blacklist: ["userStatus", "userError", "user_google_cred"],
};

const persistConfigMessage = {
  key: 'message',
  storage,
  blacklist: [
    'mailComposedOrNot',
    'ComposeMailStatus',
    'ComposeMailError',
    'emailBodyValidation',
    '',
  ],
  whitelist: ['messages', 'predictedEmailIsSpamOrNot'],
};

const EmailSocket = {
  key: 'emailSocket',
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
