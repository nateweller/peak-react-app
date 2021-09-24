// import ClimbColorsForm from '../../../forms/OrganizationForm';
import AdminSettingsLayout from '../../../layouts/AdminSettingsLayout';

import Button from './../../../components/Button';

function ClimbColorsPage() {

    return (
        <AdminSettingsLayout>

            <div className="pb-5 border-b border-gray-200 mb-6 sm:flex sm:items-center sm:justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Climb Color Settings
                </h3>
                <div className="mt-3 sm:mt-0 sm:ml-4">
                    <Button 
                        type="button" 
                    >
                        Save
                    </Button>
                </div>
            </div>

            {/* <ClimbColorsForm /> */}

        </AdminSettingsLayout>
    );
}

export default ClimbColorsPage;