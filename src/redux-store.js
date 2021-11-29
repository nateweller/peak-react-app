import { configureStore, createSlice } from '@reduxjs/toolkit';

/**
 * Authentication Slice
 */
const auth = createSlice({
    name: 'auth',
    initialState: {
        user: undefined
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        }
    }
});

export const { setUser } = auth.actions;

/**
 * App Slice
 */
const app = createSlice({
    name: 'app',
    initialState: {
        toasts: []
    },
    reducers: {
        addToast: (state, action) => {
            state.toasts = [ action.payload, ...state.toasts ]
        },
        clearToasts: (state) => {
            state.toasts = []
        }
    }
});

export const { addToast, clearToasts } = app.actions;

/**
 * Data Store Slice
 */
const dataStore = createSlice({
    name: 'dataStore',
    initialState: {},
    reducers: {
        setDataStoreItem: (state, action) => {
            state[action.payload.key] = action.payload.value;
        }
    }
});

export const { setDataStoreItem } = dataStore.actions;

/**
 * Redux Store
 */
export const store = configureStore({
    reducer: {
        auth: auth.reducer,
        app: app.reducer,
        dataStore: dataStore.reducer
    }
});