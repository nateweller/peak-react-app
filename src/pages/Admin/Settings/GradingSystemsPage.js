import AdminSettingsLayout from '../../../layouts/AdminSettingsLayout';
import { useDataStoreItem } from './../../../hooks';

import Button from './../../../components/Button';
import Table from './../../../components/Table';

function GradingSystemsPage() {

    const { data: gradingSystemsData } = useDataStoreItem('grading_systems');

    return (
        <AdminSettingsLayout>

            <div className="pb-5 border-b border-gray-200 mb-6 sm:flex sm:items-center sm:justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Grading System Settings
                </h3>
                <div className="mt-3 sm:mt-0 sm:ml-4">
                    {/* <Button 
                        type="button" 
                    >
                        Save
                    </Button> */}
                </div>
            </div>

            <Table
                data={ gradingSystemsData && gradingSystemsData.map(gradingSystemData => ([
                    {
                        label: 'System',
                        value: <span className="text-sm">{ gradingSystemData.name }</span>
                    },
                    {
                        label: '',
                        value: <div className="text-right"><Button onClick={() => {}}>Edit</Button></div>
                    }
                ]))}
            />

        </AdminSettingsLayout>
    );
}

export default GradingSystemsPage;