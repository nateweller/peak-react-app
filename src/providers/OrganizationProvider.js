import { createContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { API } from './../api';
import { developmentLog } from '../utils';

export const OrganizationContext = createContext(undefined);

function OrganizationProvider(props) {

    const user = useSelector(state => state.auth.user);

    const [organization, setOrganization] = useState(undefined);

    useEffect(() => {
        API.get('organizations')
            .then(response => {
                // to do: add support for multiple organizations per user
                setOrganization(response.data[0]);

                developmentLog('Organization fetched by OrganizationProvider:');
                developmentLog(response.data[0]);
            })
            .catch(error => {
                console.error(error);
                setOrganization(null);
            });

        return () => {};

    }, [user]);

    return (
        <OrganizationContext.Provider value={{ organization, setOrganization }}>
            { props.children }
        </OrganizationContext.Provider>
    );
}

export default OrganizationProvider;