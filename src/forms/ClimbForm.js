import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import LoadingIcon from './../components/LoadingIcon';
import { disciplines } from './../enums';
import { API } from './../api';

import { useAlerts, useDataStoreItem } from './../hooks';

import ColorPicker from './../components/ColorPicker';
import Input from './../components/Input';
import Select from './../components/Select';

function ClimbForm(props) {

    const { climbId } = props;

    const isNew = ! parseInt(climbId);

    const alerts = useAlerts();

    const [redirect, setRedirect] = useState(null);

    const { useData: climbData } = useDataStoreItem(isNew ? undefined : `climbs/${climbId}`);

    const { useData: locations } = useDataStoreItem('locations');

    /** @todo select grading system based on discipline */
    const { useData: gradeOptions } = useDataStoreItem('grading_grades');

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Climb name is required.'),
        discipline: Yup.string(),
        grade_id: Yup.number(),
        color_id: Yup.number(),
        location_id: Yup.number().required('Location is required.')
    });

    const onSubmit = (values, { setSubmitting }) => {
        if (climbId === 'new') {
            API.post('climbs', values)
                .then((response) => setRedirect(`/admin/climbs/${response.data.id}`))
                .catch(() => alerts.add({
                    message: 'Error.',
                    type: 'danger',
                    isDismissable: true
                }))
                .finally(() => {
                    setSubmitting(false);
                });
        } else {
            API.patch(`climbs/${climbId}`, values)
                .then((response) => setRedirect(`/admin/climbs/${response.data.id}`))
                .catch(error => alerts.add({
                    message: 'Error.',
                    type: 'danger',
                    isDismissable: true
                }))
                .finally(() => {
                    setSubmitting(false);
                });
        }
    };

    if (redirect) {
        return <Redirect to={ redirect } />;
    }

    if (! isNew && climbData === undefined) {
        return <LoadingIcon isLarge={true} />;
    }

    return (
        <Formik initialValues={climbData || {}} validationSchema={validationSchema} onSubmit={onSubmit}>
            {() => (
                <Form id="climb-form">

                    { alerts.render() }

                    <Input 
                        name="name"
                        label="Name"
                        type="text"
                    />

                    <div className="mt-4">
                        <Select 
                            name="discipline"
                            label="Discipline"
                            options={Object.values(disciplines).map((discipline) => ({ value: discipline, label: discipline }))}
                        />
                    </div>

                    <div className="mt-4">
                        <Select 
                            name="grade_id"
                            label="Grade"
                            options={[]}
                        />
                    </div>

                    <div className="mt-4">
                        <ColorPicker 
                            name="color_id"
                            label="Hold Color"
                        />
                    </div>
                    
                    <div className="mt-4">
                        <Select 
                            name="location_id"
                            label="Location"
                            options={locations ? locations.map(location => ({ value: location.id, label: location.name })) : []}
                        />
                    </div>
                    
                </Form>
             ) }
        </Formik>
    );
}

export default ClimbForm;