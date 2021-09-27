import AdminSettingsLayout from '../../../layouts/AdminSettingsLayout';
import { useDataStoreItem } from './../../../hooks';
import Table from './../../../components/Table';
import Button from './../../../components/Button';

function LocationsPage() {

    const { data: locationsData } = useDataStoreItem('locations');

    return (
        <AdminSettingsLayout>

            <div className="pb-5 border-b border-gray-200 mb-6 sm:flex sm:items-center sm:justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Locations Settings
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
                data={ locationsData && locationsData.map(locationData => ([
                    {
                        label: 'Location',
                        value: <span className="text-sm">{ locationData.name }</span>
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

export default LocationsPage;