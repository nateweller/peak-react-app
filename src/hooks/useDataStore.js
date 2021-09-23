import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDataStoreItem } from '../redux-store';
import { API } from '../api';

function useDataStore() {

    const dispatch = useDispatch();

    const dataStore = useSelector(state => state.dataStore);

    const set = useCallback((key, value) => {
        dispatch(setDataStoreItem({
            key,
            value
        }));
    }, [dispatch]);

    const get = useCallback((key, config) => {

        return new Promise((resolve, reject) => {
            // return data from redux store / cache if requested and available
            if (config?.useCache && dataStore[key] !== undefined) {
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
                    if (error !== undefined) {
                        reject(error);
                    } else {
                        reject();
                    }
                });
        });
    }, [dataStore, set]);

    return {
        get
    };

}

export default useDataStore;