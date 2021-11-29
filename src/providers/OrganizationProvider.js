import { createContext, useEffect, useState } from 'react';
import { useAuth } from './../hooks';
import { API } from './../api';

export const OrganizationContext = createContext(undefined);

function OrganizationProvider(props) {

    const { user } = useAuth();

    const [organization, setOrganization] = useState(undefined);

    useEffect(() => {
        API.get('organizations')
            .then(response => {
                // to do: add support for multiple organizations per user
                setOrganization(response.data[0]);
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