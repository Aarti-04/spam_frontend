// store.ts

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './userSlice';
import inboxReducer from './inboxSlice';

// Configure Redux Persist
const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['isAuthenticated', 'user'],
};

const inboxPersistConfig = {
  key: 'inbox',
  storage,
  whitelist: ['mails'],
};

// Combine reducers
const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  inbox: persistReducer(inboxPersistConfig, inboxReducer),
  // Add other reducers here if needed
});

// Create Redux store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Ignore checks for redux-persist
    }),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store);

export default store;
