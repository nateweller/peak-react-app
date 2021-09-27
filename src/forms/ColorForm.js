import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useAlerts, useDataStore, useDataStoreItem } from './../hooks';
import { API } from './../api';

import LoadingIcon from './../components/LoadingIcon';
import Input from './../components/Input';
import Button from '../components/Button';

function ColorForm({ colorId, afterSubmit }) {

    const isNew = ! parseInt(colorId);

    const alerts = useAlerts();

    const dataStore = useDataStore();

    const { useData: colorData, isLoading } = useDataStoreItem(isNew ? undefined : `climb_colors/${colorId}`);

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

                    setSubmitting(false);
                    
                    if (typeof afterSubmit === 'function') {
                        afterSubmit(response);
                    }
                })
                .catch((error) => {
                    alerts.add({
                        message: error?.data?.message || 'Error',
                        type: 'danger'
                    });
                    setSubmitting(false);
                });
        } else {
            API.patch(`climb_colors/${colorId}`, values)
                .then((response) => {
                    if (response?.data?.id) {
                        dataStore.set(`colors/${response.data.id}`, response.data);
                    }

                    setSubmitting(false);
                    
                    if (typeof afterSubmit === 'function') {
                        afterSubmit(response);
                    }
                })
                .catch((error) => {
                    alerts.add({
                        message: error?.data?.message || 'Error',
                        type: 'danger'
                    });
                    setSubmitting(false);
                });
        }
    };

    if (! isNew && (isLoading || colorData === undefined)) {
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