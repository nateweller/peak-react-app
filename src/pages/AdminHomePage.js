import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setScreenTitle } from '../redux-store';

import DashboardLayout from '../layouts/DashboardLayout';

function AdminHomePage() {

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
        <DashboardLayout header={pageHeader}>
            <p>Admin Home</p>
        </DashboardLayout>
    );
}

export default AdminHomePage;