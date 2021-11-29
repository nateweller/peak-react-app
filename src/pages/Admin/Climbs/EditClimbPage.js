import AdminLayout from '../../../layouts/AdminLayout';
import ClimbForm from '../../../forms/ClimbForm';
import Button from '../../../components/Button';
import { addToast } from '../../../redux-store';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

function EditClimbPage(props) {

    const { history } = props;

    const dispatch = useDispatch();

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
            <ClimbForm id={ props.match.params.climbId } onSuccess={(response) => {
                console.log('successsss');
                dispatch(addToast({ children: 'Climb saved.', color: 'green', duration: 5000 }));
                if (response?.data?.id) {
                    history.push(`/admin/climbs/${response.data.id}`);
                }
            }}  />
        </AdminLayout>
    );
}

export default withRouter(EditClimbPage);