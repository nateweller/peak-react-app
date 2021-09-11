import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOrganization } from './../redux-store';
import { API } from './../api';
import { developmentLog } from '../utils';

function OrganizationProvider(props) {

    const dispatch = useDispatch();
    const user = useSelector(state => state.global.user);
    // const organization = useSelector(state => state.global.organization);

    useEffect(() => {
        API.get('organizations')
            .then(response => {
                // to do: add support for multiple organizations per user
                dispatch(setOrganization(response.data[0]));

                developmentLog('Organization fetched by OrganizationProvider:');
                developmentLog(response.data[0]);
            })
            .catch(error => console.log(error));

        return () => {};

    }, [user?.id, dispatch]);

    return (
        <>
            { props.children }
        </>
    );
}

export default OrganizationProvider;