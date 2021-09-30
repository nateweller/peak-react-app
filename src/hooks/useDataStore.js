import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDataStoreItem } from '../redux-store';
import { API } from '../api';

/**
 * useDataStore() Hook
 * 
 * Fetch, cache, and fetch cached API data.
 * 
 * @returns {object} The data store object.
 */
function useDataStore() {

    const dispatch = useDispatch();

    const dataStore = useSelector(state => state.dataStore);

    /**
     * Set
     */
    const set = useCallback((key, value) => {
        dispatch(setDataStoreItem({
            key,
            value
        }));
    }, [dispatch]);

    /**
     * Get
     * 
     * @param {string} key 
     * @param {object} config
     */
    const get = useCallback((key, config = {}) => {
        return new Promise((resolve, reject) => {
            /**
             * Configuration
             * 
             * @property {bool} useCache
             */
            const { 
                useCache = false 
            } = config;

            // return data from redux store / cache if requested and available
            if (useCache && dataStore[key] !== undefined) {
                resolve(dataStore[key]);
            }

            // fetch data from API if cache not requested
            API.get(key)
                .then(response => {
                    // successful API requests should always return an
                    // object with a "data" attribute
                    if (response.data !== undefined) {
                        // update the redux store / cache
                        set(key, response.data);
                        // return the data
                        resolve(response.data);
                    }
                    // treat the lack of "data" attribute as an empty response
                    resolve(null);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }, [dataStore, set]);

    return {
        get,
        set
    };

}

export default useDataStore;