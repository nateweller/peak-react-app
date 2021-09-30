import { useState } from 'react';
import { useAlerts, useDataStore, useDataStoreItem } from './../../../hooks';
import AdminSettingsLayout from '../../../layouts/AdminSettingsLayout';
import GradingSystemForm from '../../../forms/GradingSystemForm';
import Button from './../../../components/Button';
import Dialog from '../../../components/Dialog';
import Table from './../../../components/Table';

function GradingSystemsPage() {

    const alerts = useAlerts();

    const dataStore = useDataStore();

    const { useData: gradingSystemsData } = useDataStoreItem('grading_systems', { useCache: true });

    // ID of color to edit, or 'new' to insert a new system
    const [addEditId, setAddEditId] = useState(false);

    return (
        <>
            <AdminSettingsLayout>

                <div className="pb-5 border-b border-gray-200 mb-6 sm:flex sm:items-center sm:justify-between">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Grading System Settings
                    </h3>
                    <div className="mt-3 sm:mt-0 sm:ml-4">
                        <Button 
                            type="button" 
                            onClick={ () => setAddEditId('new') }
                        >
                            + New System
                        </Button>
                    </div>
                </div>

                <Table
                    data={ gradingSystemsData && gradingSystemsData.map(gradingSystemData => ([
                        {
                            label: 'System',
                            value: (
                                <span className="text-sm">
                                    { gradingSystemData.name }
                                </span>
                            )
                        },
                        {
                            label: '',
                            value: (
                                <div className="text-right">
                                    <Button onClick={ () => setAddEditId(gradingSystemData.id) }>
                                        Edit
                                    </Button>
                                </div>
                            )
                        }
                    ]))}
                />

            </AdminSettingsLayout>

            <Dialog isOpen={addEditId} setIsOpen={setAddEditId}>
                <GradingSystemForm 
                    colorId={addEditId} 
                    key={String(addEditId)}
                    afterSubmit={() => {
                        dataStore.get('grading_systems');
                        setAddEditId(null);
                        alerts.replace({
                            type: 'success',
                            message: 'Grading system saved.'
                        });
                    }} 
                />
            </Dialog>
        </>
    );
}

export default GradingSystemsPage;