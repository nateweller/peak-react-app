import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setScreenTitle } from '../../../redux-store';

import ClimbForm from '../../../forms/ClimbForm';

function EditClimbPage(props) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setScreenTitle('Edit Climb'));
    }, [dispatch]);

    return (
        <ClimbForm climbId={props.match.params.climbId} />
    );
}

export default EditClimbPage;