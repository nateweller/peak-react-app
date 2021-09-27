import { useCallback, useEffect, useReducer } from 'react'
import { useSelector } from 'react-redux';
import useDataStore from './useDataStore';

/**
 * useDataStoreItem()
 * 
 * @param {string} key
 * @param {object} config
 * @param {bool}   config.useCache 
 * @param {bool}   config.forceDataFetch
 * 
 * @returns {object} 
 */

function useDataStoreItem(key, config) {

    const { 
        /**
         * Use Cache
         * 
         * When enabled, attempts to load data using useDataStore() hook.
         * Will fetch data from API if undefined in the data store.
         * 
         * @type {bool}
         */
        useCache,

        /**
         * Force Data Fetch
         * 
         * When enabled, triggers an API call even when caching is enabled and the 
         * value is available from the data store. Useful for showing cached value
         * immediatley and loading fresh data in the background.
         * 
         * @type {bool}
         */
        forceDataFetch
    } = config || {};

    /**
     * Batch state updates with reducer
     */
    const reducer = (state, action) => {
        switch (action.type) {
            case 'SET_IS_LOADING':
                return {
                    ...state,
                    isLoading: action.payload
                };
            case 'SET_DATA_FROM_FETCH':
                return {
                    ...state,
                    data: action.payload,
                    dataFetched: true,
                    isLoading: false
                };
            case 'SET_DATA_FROM_FORCE_FETCH':
                if (state.data === undefined) {
                    return {
                        ...state,
                        data: action.payload,
                        dataFetched: true,
                        isLoading: false 
                    };
                } else {
                    return {
                        ...state,
                        dataForced: action.payload,
                        dataFetched: true,
                        isLoading: false
                    };
                }
            case 'SET_DATA_FROM_SYNC':
                return {
                    ...state,
                    dataSynced: action.payload
                };
            case 'SET_DATA_FROM_ERROR':
                return {
                    ...state,
                    data: null,
                    dataFetched: true,
                    isLoading: false
                };
            case 'SET_DATA_FROM_KEY_UPDATE':
                return {
                    ...state,
                    dataFetched: false
                };
            default:
                throw new Error();
        }
    };

    const dataStore = useDataStore();

    // load the cached value from the redux dataStore.
    const cacheValue = useSelector(state => state.dataStore[key]);
    const defaultValue = useCache && cacheValue !== undefined ? cacheValue : undefined;

    /**
     * Default State
     */
    const [state, dispatch] = useReducer(reducer, {
        data: defaultValue,
        dataForced: undefined, 
        dataSynced: defaultValue,
        isLoading: false,
        dataFetched: false,
        error: undefined
    });

    /**
     * Should Fetch
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
        if (state.data !== undefined && ! forceDataFetch) return false;
        // forcing a fetch and no force-fetched data set
        if (state.dataForced !== undefined && forceDataFetch) return false;

        return true;
    }, [key, state, forceDataFetch]);

    const fetch = useCallback(() => {
        console.log('FETCH SET IS LOADING');
        dispatch({ type: 'SET_IS_LOADING', payload: true });
        dataStore.get(key, config)
            .then(data => {
                // when using cache, provide the fetched value as "dataForced"
                // so that update can be handled by specific implementations.
                if (forceDataFetch) {
                    dispatch({ type: 'SET_DATA_FROM_FORCE_FETCH', payload: data });
                    return;
                }

                dispatch({ type: 'SET_DATA_FROM_FETCH', payload: data });
            })
            .catch(error => {
                dispatch({ type: 'SET_DATA_FROM_ERROR' });
            });
    }, [ dataStore, key, config, forceDataFetch]);

    useEffect(() => {
        if (! shouldFetch()) return;

        fetch();
    }, [shouldFetch, fetch]);

    useEffect(() => {
        dispatch({ type: 'SET_DATA_FROM_SYNC', payload: cacheValue });
    }, [cacheValue]);

    return state;
}

export default useDataStoreItem;