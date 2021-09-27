import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useAlerts, useDataStore } from './../hooks';
import { API } from './../api';

import LoadingIcon from './../components/LoadingIcon';
import Input from './../components/Input';
import Button from '../components/Button';

function ColorForm({ colorId, afterSubmit }) {

    const isNew = ! parseInt(colorId);

    const alerts = useAlerts();

    const dataStore = useDataStore();

    const [colorData, setColorData] = useState(undefined);

    const initialValues = { 
        name: '', 
        color: '#6366F1' 
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Color name is required.'),
        color: Yup.string().required('Color is required')
    });

    const onSubmit = (values, { setSubmitting }) => {
        if (colorId === 'new') {
            API.post('climb_colors', values)
                .then((response) => {
                    if (response?.data?.id) {
                        dataStore.set(`colors/${response.data.id}`, response.data);
                    }
                    
                    if (typeof afterSubmit === 'function') {
                        afterSubmit(response);
                    }
                })
                .catch((error) => {
                    alerts.add({
                        message: error?.data?.message || 'Error',
                        type: 'danger'
                    });
                })
                .finally(() => {
                    setSubmitting(false);
                });
        } else {
            API.patch(`climb_colors/${colorId}`, values)
                .then((response) => {
                    if (response?.data?.id) {
                        dataStore.set(`colors/${response.data.id}`, response.data);
                    }
                    
                    if (typeof afterSubmit === 'function') {
                        afterSubmit(response);
                    }
                })
                .catch((error) => {
                    alerts.add({
                        message: error?.data?.message || 'Error',
                        type: 'danger'
                    });
                })
                .finally(() => {
                    setSubmitting(false);
                });
        }
    };

    useEffect(() => {
        if (parseInt(colorId) && colorData === undefined) {
            dataStore.get(`climb_colors/${colorId}`)
                .then(data => {
                    setColorData(data);
                })
                .catch(error => {
                    console.error(error);
                    setColorData(null);
                });
        }
    }, [dataStore, colorId, colorData]);

    if (! isNew && colorData === undefined) {
        return <LoadingIcon isLarge={true} />;
    }

    return (
        <Formik initialValues={colorData || initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize={true}>
            {({ isSubmitting }) => (
                <Form id="climb-form" className="space-y-6">

                    { alerts.render() }

                    <Input 
                        name="name"
                        label="Name"
                        type="text"
                    />

                    <div>
                        <Input 
                            name="color"
                            type="color"
                            label="Color"
                        />
                    </div>
                    
                    <Button type="submit" isLoading={isSubmitting}>
                        Save
                    </Button>
                    
                </Form>
             ) }
        </Formik>
    );
}

export default ColorForm;