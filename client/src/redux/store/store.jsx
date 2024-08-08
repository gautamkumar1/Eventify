import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducer from '../auth/authSlice';
import eventsSlice from '../event/eventsSlice';

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  events: eventsSlice,
});

// Configuration for Redux Persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // specify which slices you want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer, // use the persisted reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

const persistor = persistStore(store);

export { store, persistor };
