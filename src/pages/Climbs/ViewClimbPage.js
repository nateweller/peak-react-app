import DashboardLayout from '../../layouts/DashboardLayout';
import Button from '../../components/Button';

function ViewClimb() {

    const pageHeader = (
        <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">
                    Name of Climb
                </h2>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
                <Button className="inline-flex items-center">
                    Edit
                </Button>
            </div>
        </div>
    );

    return (
        <DashboardLayout header={pageHeader}>
            Climb Info
        </DashboardLayout>
    );
}

export default ViewClimb;