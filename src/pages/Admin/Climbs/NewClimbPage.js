import AdminLayout from '../../../layouts/AdminLayout';
import ClimbForm from '../../../forms/ClimbForm';
import Button from '../../../components/Button';

function ViewClimb() {

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

    return (
        <AdminLayout header={pageHeader}>
            <ClimbForm climbId="new"  />
        </AdminLayout>
    );
}

export default ViewClimb;