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
        dataStore: dataStore.reducer
    }
});