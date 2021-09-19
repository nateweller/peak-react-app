import { configureStore, createSlice } from '@reduxjs/toolkit';

/*
 * Global Application State via Redux
 */

const globalState = createSlice({
    name: 'global',
    initialState: {
        isLoading: false,
        menuIsActive: false,
        screenTitle: '',
        user: null,
        organization: null
    },
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = Boolean(action.payload);
        },
        setMenuIsActive: (state, action) => {
            state.menuIsActive = Boolean(action.payload);
        },
        setScreenTitle: (state, action) => {
            state.screenTitle = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setOrganization: (state, action) => {
            state.organization = action.payload;
        }
    }
});

export const { setIsLoading, setMenuIsActive, setScreenTitle, setUser, setOrganization } = globalState.actions;

export const store = configureStore({
    reducer: {
        global: globalState.reducer
    }
});