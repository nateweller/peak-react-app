import { useState } from 'react';
import { useAlerts, useDataStore, useDataStoreItem } from '../../../hooks';
import AdminSettingsLayout from '../../../layouts/AdminSettingsLayout';

import Button from '../../../components/Button';
import Table from '../../../components/Table';
import Dialog from '../../../components/Dialog';
import WallForm from '../../../forms/WallForm';

export default function WallsPage() {

    const alerts = useAlerts();

    const dataStore = useDataStore();

    const { useData: walls, isLoading } = useDataStoreItem('walls', { useCache: true });

    const [addEditId, setAddEditId] = useState(false);

    const getWallsTableData = () => {
        if (! walls || ! walls.length) return walls;

        return walls.map(wall => ({
            columns: [
                {
                    label: 'Wall',
                    value: (
                        <span className="text-sm">
                            { wall?.name }
                        </span>
                    )
                },
                {
                    label: 'Location',
                    value: (
                        <span className="text-sm">
                            { wall?.location?.name }
                        </span>
                    )
                },
                {
                    label: '',
                    value: (
                        <div className="text-right">
                            <Button onClick={ () => setAddEditId(wall.id) }>
                                Edit
                            </Button>
                        </div>
                    )
                }
            ]
        }))
    }

    return (
        <>
            <AdminSettingsLayout>

                <div className="pb-5 border-b border-gray-200 mb-6 sm:flex sm:items-center sm:justify-between">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Wall Settings
                    </h3>
                    <div className="mt-3 sm:mt-0 sm:ml-4">
                        <Button 
                            type="button" 
                            onClick={ () => setAddEditId('new') }
                            >
                            + New Wall
                        </Button>
                    </div>
                </div>

                { alerts.render('mb-4') }

                <Table 
                    data={ getWallsTableData() }
                    isLoading={ walls === undefined }
                />

            </AdminSettingsLayout>

            <Dialog isOpen={ Boolean(addEditId) } setIsOpen={ setAddEditId }>
                <WallForm 
                    id={ addEditId !== 'new' ? addEditId : null }
                    key={ String(addEditId) }
                    onSuccess={ () => {
                        dataStore.get('walls').catch(() => {});
                        setAddEditId(null);
                        alerts.replace({
                            type: 'success',
                            message: 'Wall saved successfully',
                            isDismissible: true
                        });
                    } }
                />
            </Dialog>
        </>
    );
}