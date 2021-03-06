import { useState } from 'react';

import AdminSettingsLayout from '../../../layouts/AdminSettingsLayout';
import { useDataStore, useDataStoreItem } from './../../../hooks';
import { DataTable } from './../../../components/Table';
import Button from './../../../components/Button';
import Dialog from '../../../components/Dialog';
import LocationForm from '../../../forms/LocationForm';
import { addToast } from '../../../redux-store';
import { useDispatch } from 'react-redux';

function LocationsPage() {

    const dispatch = useDispatch();

    const dataStore = useDataStore();

    const { useData: locationsData, error } = useDataStoreItem('locations', { useCache: true, alwaysFetch: true });

    const [addEditId, setAddEditId] = useState(false);

    return (
        <>
            <AdminSettingsLayout>

                <div className="pb-5 border-b border-gray-200 mb-6 sm:flex sm:items-center sm:justify-between">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Locations Settings
                    </h3>
                    <div className="mt-3 sm:mt-0 sm:ml-4">
                        <Button 
                            type="button" 
                            onClick={ () => setAddEditId('new') }
                        >
                            + New Location
                        </Button>
                    </div>
                </div>

                <DataTable
                    isLoading={ locationsData === undefined }
                    error={ error }
                    data={ locationsData && locationsData.map(locationData => ({
                        columns: [
                            {
                                label: 'Location',
                                value: (
                                    <span className="text-sm">
                                        { locationData.name }
                                    </span>
                                )
                            },
                            {
                                label: '',
                                value: (
                                    <div className="text-right">
                                        <Button onClick={ () => setAddEditId(locationData.id) }>
                                            Edit
                                        </Button>
                                    </div>
                                )
                            }
                        ]
                    }))}
                />

            </AdminSettingsLayout>

            <Dialog isOpen={ Boolean(addEditId) } setIsOpen={ setAddEditId }>
                <LocationForm 
                    id={ addEditId !== 'new' ? addEditId : null } 
                    onSuccess={ () => {
                        dataStore.get('locations').catch(() => {});
                        setAddEditId(false);
                        dispatch(addToast({ children: 'Location saved.', color: 'green', duration: 5000 }));
                    } }
                />
            </Dialog>
        </>
    );
}

export default LocationsPage;