import { useCallback, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import LoadingIcon from './../components/LoadingIcon';
import { disciplines, grades } from './../enums';
import { API } from './../api';

import { useAlerts } from './../hooks';

import Input from './../components/Input';
import Select from './../components/Select';

function ClimbForm({ climbId }) {

    const isNew = ! parseInt(climbId);

    const alerts = useAlerts();

    const [redirect, setRedirect] = useState(null);

    const [climbData, setClimbData] = useState({
        name: '',
        discipline: disciplines.BOULDER,
        grade: grades.BOULDER.V.V0,
        color: '#000000',
        location_id: ''
    });

    const [locations, setLocations] = useState(null);

    const [gradeOptions/*, setGradeOptions*/] = useState(grades.BOULDER.V);

    // const getGradeOptions = (discipline) => {
    //     switch (climbData.discipline) {
    //         case disciplines.BOULDER:
    //             return grades.BOULDER.V;
    //         case disciplines.LEAD:
    //         case disciplines.TOP_ROPE:
    //             // to do:
    //             return []; 
    //         default:
    //             return [];
    //     }
    // };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Climb name is required.'),
        discipline: Yup.string(),
        grade: Yup.string(),
        color: Yup.string(),
        location_id: Yup.number().required('Location is required.')
    });

    const onSubmit = (values, { setSubmitting }) => {
        if (climbId === 'new') {
            API.post('climbs', values)
                .then((response) => setRedirect(`/admin/climbs/${response.data.id}`))
                .catch(() => alerts.add({
                    'message': 'Error.',
                    'type': 'danger'
                }))
                .finally(() => {
                    setSubmitting(false);
                });
        }
    };

    const loadLocations = useCallback(() => {
        API.get('locations')
            .then(response => {
                setLocations(response.data);
            })
            .catch(error => {
                alerts.add({
                    message: error.message,
                    type: 'danger'
                });
            });
    }, [alerts]);

    const loadClimb = useCallback(() => {
        API.get(`climbs/${climbId}`)
            .then(response => {
                setClimbData(response.data);
            })
            .catch(error => {
                alerts.add({
                    message: error.message,
                    type: 'danger'
                });
            });
    }, [alerts, climbId]);

    useEffect(() => {
        // set default climb data
        if (!climbData && !climbId) {
            setClimbData({
                name: '',
                discipline: Object.values(disciplines)[0] || '',
                grade: '',
                color: '#000000',
                location_id: 1
            });
        }
        // load climb data from ID
        if (parseInt(climbId) && !climbData) {
            loadClimb();
        }
        // load locations
        if (!locations) {
            loadLocations();
        }

        return () => {};

    }, [climbId, locations, loadLocations, loadClimb, climbData]);

    if (redirect) {
        return <Redirect to={ redirect } />;
    }

    if (!isNew && !climbData) {
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
                            name="grade"
                            label="Grade"
                            options={Object.values(gradeOptions).map(grade => ({ value: grade, label: grade }))}
                        />
                    </div>

                    <div className="mt-4">
                        <Input 
                            name="color"
                            type="color"
                            label="Color"
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