import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setScreenTitle } from './../redux-store';
import OrganizationForm from '../forms/OrganizationForm';

function OrganizationPage() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setScreenTitle('Organization'));
    }, [dispatch]);

    return (
        <OrganizationForm />
    );
}

export default OrganizationPage;