import { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { API } from '../api';
import { setScreenTitle } from './../redux-store';

function LocationsPage() {

    const dispatch = useDispatch();
    const [locations, setLocations] = useState(null);

    const loadLocations = useCallback(() => {
        API.get('locations')
            .then(response => {
                setLocations(response.data);
            })
            .catch(error => console.log(error))
            .finally(() => {

            });
    }, []);

    useEffect(() => {
        dispatch(setScreenTitle('Locations'));
    }, [dispatch]);

    useEffect(() => {
        loadLocations();
    }, [loadLocations]);

    console.log(locations);

    return (
        <p>Locations</p>
    );
}

export default LocationsPage;