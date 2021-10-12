import { useCallback, useEffect, useReducer } from 'react'
import { useSelector } from 'react-redux';
import useDataStore from './useDataStore';

/**
 * useDataStoreItem() Hook
 * 
 * Work with a single item from the data store. 
 * 
 * @param {string} key     The data store item's key.
 * @param {object} config  Configuration settings for the hook instance.
 * 
 * @returns {object}  The hook state. See defaultState for parameters.
 */
function useDataStoreItem(key, config = {}) {

    const dataStore = useDataStore();

    /**
     * Configuration
     * 
     * @param {bool}  useCache     When enabled, attempts to load data using useDataStore() hook. 
     *                             Will fetch data from API if undefined in the data store.
     * 
     * @param {bool}  alwaysFetch  When enabled, triggers an API call even when caching is enabled and the 
     *                             value is available from the data store. Useful for showing cached value
     *                             immediatley and loading fresh data in the background.
     */
    const { 
        useCache = false, 
        alwaysFetch = false 
    } = config;

    /**
     * Load the cached value from the redux dataStore.
     * 
     * @todo add support for falsey cache values
     */
    const cacheValue = useSelector(state => state.dataStore[key]);
    const defaultValue = (useCache && cacheValue) || undefined;

    /**
     * Default State
     * 
     * @type {object} 
     * 
     * @property {*}      data         The data store item's value.
     * @property {*}      useData      The data store item's value, synced with datastore
     * @property {bool}   isLoading    True when a data store request is currently in progress.
     * @property {bool}   dataFetched  True once a request has completed.
     * @property {object} error        Error data returned from the data store request.
     */
    const defaultState = {
        data: defaultValue,
        useData: defaultValue,
        isLoading: false,
        dataFetched: false,
        error: undefined
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case 'SET_IS_LOADING':
                return {
                    ...state,
                    isLoading: action.payload
                };
            case 'DATA_FETCHED':
                return {
                    ...state,
                    data: action.payload,
                    dataFetched: true,
                    isLoading: false
                };
            case 'DATA_FETCHED_IN_BACKGROUND':
                return {
                    ...state,
                    dataFetched: true,
                    isLoading: false
                };
            case 'DATA_SYNCED':
                return {
                    ...state,
                    useData: action.payload
                };
            case 'KEY_CHANGED':
                return {
                    ...state,
                    dataFetched: false
                };
            case 'ERROR':
                return {
                    ...state,
                    data: null,
                    dataFetched: true,
                    isLoading: false,
                    error: action.payload
                };
            default:
                throw new Error();
        }
    };

    const [state, dispatch] = useReducer(reducer, defaultState);

    /**
     * Should Fetch
     * 
     * Determines if a data store request needs to be made.
     * 
     * @returns {bool}
     */
    const shouldFetch = useCallback(() => {
        // no key provided, nothing to fetch
        if (! key) return false;
        // data is only ever fetched once
        if (state.dataFetched) return false;
        // data is already being fetched
        if (state.isLoading) return false;
        // something went wrong
        if (state.error) return false;
        // already have data and not forcing a fetch
        if (state.data !== undefined && ! alwaysFetch) return false;

        return true;
    }, [key, state, alwaysFetch]);

    /**
     * Fetch
     * 
     * Gets the item from the data store.
     * Triggers state updates after the request is complete.
     * 
     * @return {void}
     */
    const fetch = useCallback(() => {
        dispatch({ type: 'SET_IS_LOADING', payload: true });
        dataStore.get(key, config)
            .then(data => {
                if (state.data !== undefined && alwaysFetch) {
                    dispatch({ type: 'DATA_FETCHED_IN_BACKGROUND' });
                    return;
                }

                dispatch({ type: 'DATA_FETCHED', payload: data });
            })
            .catch(error => {
                dispatch({ type: 'ERROR', payload: error });
            });
    }, [alwaysFetch, config, dataStore, key, state.data]);

    /**
     * Fetch data when necessary.
     */
    useEffect(() => {
        if (! shouldFetch()) return;

        fetch();
    }, [fetch, shouldFetch]);

    useEffect(() => {
        dispatch({ type: 'KEY_CHANGED', payload: key });
    }, [key]);

    /**
     * Sync cache updates with state.useData
     */
    useEffect(() => {
        dispatch({ type: 'DATA_SYNCED', payload: cacheValue });
    }, [cacheValue]);

    return state;
}

export default useDataStoreItem;