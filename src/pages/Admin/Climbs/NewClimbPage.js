import { useState } from 'react';
import { Redirect } from 'react-router-dom';

import AdminLayout from '../../../layouts/AdminLayout';
import ClimbForm from '../../../forms/ClimbForm';
import Button from '../../../components/Button';
import { addToast } from '../../../redux-store';
import { useDispatch } from 'react-redux';

function ViewClimb() {

    const dispatch = useDispatch();

    const [redirect, setRedirect] = useState();

    const pageHeader = (
        <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">
                    New Climb
                </h2>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
                <Button form="climb-form" type="submit" className="inline-flex items-center">
                    Publish Climb
                </Button>
            </div>
        </div>
    );

    if (redirect) {
        return <Redirect to={ redirect } />;
    }

    return (
        <AdminLayout header={pageHeader}>
            <ClimbForm 
                climbId="new"  
                onSuccess={ (response) => {
                    dispatch(addToast({ children: 'Climb saved.', color: 'green', duration: 5000 }));
                    if (response?.data?.id) {
                        setRedirect(`/admin/climbs/${response.data.id}`);
                    }
                } }
            />
        </AdminLayout>
    );
}

export default ViewClimb;