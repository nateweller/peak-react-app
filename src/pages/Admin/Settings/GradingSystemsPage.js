import { useState } from 'react';
import { useAlerts, useDataStore, useDataStoreItem } from './../../../hooks';
import AdminSettingsLayout from '../../../layouts/AdminSettingsLayout';
import GradingSystemForm from '../../../forms/GradingSystemForm';
import Button from './../../../components/Button';
import Dialog from '../../../components/Dialog';
import Table from './../../../components/Table';
import { PlusIcon } from '@heroicons/react/solid';

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

                { alerts.render('mb-4') }

                <Table
                    isLoading={ gradingSystemsData === undefined }
                    data={ gradingSystemsData && gradingSystemsData.map(gradingSystemData => ({
                        columns: [
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
                        ]
                    }))}
                    emptyContent={ (
                        <div className="text-center py-10">
                            <h3 className="mt-2 text-sm font-medium text-gray-900">
                                No grading systems found.
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Start by selecting a standardized system, or add your own.
                            </p>
                            <div className="mt-6">
                                <Button 
                                    onClick={ () => {
                                        setAddEditId('new');
                                    } }
                                    className="inline-flex items-center"
                                >
                                    <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                                    Add a Grading System
                                </Button>
                            </div>
                        </div>
                    ) }
                />

            </AdminSettingsLayout>

            <Dialog isOpen={addEditId} setIsOpen={setAddEditId}>
                <GradingSystemForm 
                    id={ addEditId !== 'new' ? addEditId : null } 
                    key={ String(addEditId) }
                    onSuccess={ () => {
                        dataStore.get('grading_systems');
                        setAddEditId(null);
                        alerts.replace({
                            type: 'success',
                            message: 'Grading system saved.',
                            isDismissable: true
                        });
                    } } 
                />
            </Dialog>
        </>
    );
}

export default GradingSystemsPage;