import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setScreenTitle } from '../../redux-store';

import AdminLayout from '../../layouts/AdminLayout';

function HomePage() {

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(setScreenTitle('Dashboard'));
    }, [dispatch]);
    
    const pageHeader = (
        <h1 className="text-3xl font-bold text-white">
            Dashboard
        </h1>
    );

    return (
        <AdminLayout header={pageHeader}>
            <p>Admin Home</p>
        </AdminLayout>
    );
}

export default HomePage;