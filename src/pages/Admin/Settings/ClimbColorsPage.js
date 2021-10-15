import { useState } from 'react';
import { useAlerts, useDataStore, useDataStoreItem } from '../../../hooks';
import AdminSettingsLayout from '../../../layouts/AdminSettingsLayout';

import Button from './../../../components/Button';
import Table from './../../../components/Table';
import Dialog from './../../../components/Dialog';
import ColorForm from '../../../forms/ColorForm';

function ClimbColorsPage() {

    const alerts = useAlerts();

    const dataStore = useDataStore();

    const { useData: colorsData, isLoading } = useDataStoreItem('climb_colors', { useCache: true, alwaysFetch: true });

    const [addEditId, setAddEditId] = useState(false);

    const getColorsTableData = () => {
        if (! colorsData || ! colorsData.length) return colorsData;

        return colorsData.map(colorData => ({
            columns: [
                {
                    label: 'Color',
                    value: (
                        <span className="text-sm">
                            { colorData.name }
                        </span>
                    )
                },
                {
                    label: '',
                    value: (
                        <div className="text-right">
                            <Button onClick={ () => setAddEditId(colorData.id) }>Edit</Button>
                        </div>
                    )
                }
            ]
        }));
    };

    return (
        <>
            <AdminSettingsLayout>

                <div className="pb-5 border-b border-gray-200 mb-6 sm:flex sm:items-center sm:justify-between">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Climb Color Settings
                    </h3>
                    <div className="mt-3 sm:mt-0 sm:ml-4">
                        <Button 
                            type="button" 
                            onClick={ () => setAddEditId('new') }
                            >
                            + New Color
                        </Button>
                    </div>
                </div>

                { alerts.render('mb-4') }

                <Table 
                    data={ getColorsTableData() } 
                    isLoading={ isLoading } 
                />

            </AdminSettingsLayout>
            
            <Dialog isOpen={ Boolean(addEditId) } setIsOpen={ setAddEditId }>
                <ColorForm 
                    id={ addEditId !== 'new' ? addEditId : null } 
                    key={ String(addEditId) }
                    onSuccess={ () => {
                        dataStore.get('climb_colors');
                        setAddEditId(null);
                        alerts.replace({
                            type: 'success',
                            message: 'Color saved.',
                            isDismissable: true
                        });
                    } } 
                />
            </Dialog>
        </>
    );
}

export default ClimbColorsPage;