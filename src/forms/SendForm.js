import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import LoadingIcon from './../components/LoadingIcon';
import { grades } from './../enums';
import { API } from './../api';
import { useAlerts, useLoadingMonitor } from './../hooks';
import RegisterForm from './RegisterForm';

import Input from './../components/Input';
import Select from './../components/Select';
import Button from '../components/Button';

function SendForm({ sendId, climbId, afterSubmit }) {

    const alerts = useAlerts();
    
    const isNew = ! parseInt(sendId);
    
    const [sendData, setSendData] = useState(undefined);

    const loader = useLoadingMonitor([ sendData ]);

    const [gradeOptions] = useState(grades.BOULDER.V);

    const user = useSelector(state => state.auth.user);

    const validationSchema = Yup.object().shape({
        grade: Yup.string(),
        rating: Yup.number(),
        feedback: Yup.string()
    });

    const onSubmit = (values, { setSubmitting }) => {
        if (sendId === 'new') {
            API.post(`sends`, { ...values, climb_id: climbId })
                .then((response) => afterSubmit(response))
                .catch(() => {
                    alerts.add({
                        'message': 'Error.',
                        'type': 'danger',
                        isDismissable: true
                    })
                })
                .finally(() => {
                    setSubmitting(false);
                });
        } else {
            API.patch(`sends/${sendId}`, { ...values, climb_id: climbId })
                .then((response) => afterSubmit(response))
                .catch(() => alerts.add({
                    message: 'Error.',
                    type: 'danger',
                    isDismissable: true
                }))
                .finally(() => {
                    setSubmitting(false);
                });
        }
    };

    const loadClimbSend = useCallback(() => {
        API.get(`sends/${sendId}`)
            .then(response => {
                setSendData(response.data);
            })
            .catch(error => {
                alerts.add({
                    message: error.message,
                    type: 'danger'
                });
            });
    }, [alerts, sendId]);

    useEffect(() => {
        // set default send data 
        if (isNew && sendData === undefined) {
            setSendData({
                grade: '',
                rating: '',
                feedback: ''
            });
        }
        // load send data
        if (! isNew && sendData === undefined && ! loader.isLoading) {
            loadClimbSend();
        }
    }, [climbId, loader.isLoading, isNew, loadClimbSend, sendData]);

    if (! loader.requirementsLoaded) {
        return <LoadingIcon isFullScreen={true} />;
    }

    if (! user) {
        return (
            <div>
                <h2>Create an account</h2>
                <RegisterForm />
            </div>
        );
    }

    return (
        <Formik initialValues={ sendData || {} } validationSchema={ validationSchema } onSubmit={ onSubmit }>
            {({ isSubmitting }) => (
                <Form id="send-form">

                    { alerts.render() }

                    {/* <div className="mt-4">
                        <Select 
                            name="climb_id"
                            label="Climb"
                            initialValue={ climbId }
                            options={[]}
                        />
                    </div> */}

                    <div className="mt-4">
                        <Select
                            name="grade"
                            label="Grade"
                            options={Object.keys(gradeOptions).map(gradeKey => ({ label: gradeOptions[gradeKey], value: gradeKey }))}
                        />
                    </div>

                    <div className="mt-4">
                        <Select
                            name="rating"
                            label="Rating"
                            options={[
                                { label: '5 Stars', value: 5 },
                                { label: '4 Stars', value: 4 },
                                { label: '3 Stars', value: 3 },
                                { label: '2 Stars', value: 2 },
                                { label: '1 Star', value: 1 },
                            ]}
                        />
                    </div>

                    <div className="mt-4">
                        <Input
                            name="feedback"
                            label="Feedback"
                            as="textarea"
                            rows={ 3 }
                        />
                    </div>

                    <div className="mt-4">
                        <Button 
                            type="submit"
                            disabled={ isSubmitting }    
                        >
                            Submit
                        </Button>
                    </div>

                </Form>
             ) }
        </Formik>
    );
}

export default SendForm;