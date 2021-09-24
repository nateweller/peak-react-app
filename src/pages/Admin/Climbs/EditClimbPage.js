import ClimbForm from '../../../forms/ClimbForm';

function EditClimbPage(props) {
    return (
        <ClimbForm climbId={props.match.params.climbId} />
    );
}

export default EditClimbPage;