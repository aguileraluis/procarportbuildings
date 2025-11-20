import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from './cartRedux';

// Redux persist configuration
const persistConfig = {
    key: 'root',
    storage,
    version: 1,
};

// Create a persisted reducer
const persistedCartReducer = persistReducer(persistConfig, cartReducer);

// Configure store with persisted reducer
export const store = configureStore({
    reducer: {
        cart: persistedCartReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

// Create persistor
export const persistor = persistStore(store);

// Keep default export for backwards compatibility if needed
export default store;