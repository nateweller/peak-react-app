import AdminLayout from '../../../layouts/AdminLayout';
import ClimbForm from '../../../forms/ClimbForm';
import Button from '../../../components/Button';

function EditClimbPage(props) {

    const pageHeader = (
        <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">
                    Edit Climb
                </h2>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
                <Button form="climb-form" type="submit" className="inline-flex items-center">
                    Update Climb
                </Button>
            </div>
        </div>
    );

    return (
        <AdminLayout header={ pageHeader }>
            <ClimbForm climbId={ props.match.params.climbId }  />
        </AdminLayout>
    );
}

export default EditClimbPage;