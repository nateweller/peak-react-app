import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { API } from './../api';
import { useAlerts, useDataStore, useDataStoreItem } from './../hooks';

import Button from './../components/Button';
import Input from './../components/Input';
import LoadingIcon from './../components/LoadingIcon';

function GradingSystemForm(props) {
    
    const { 
        gradingSystemId = 'new',
        afterSubmit = () => {}
    } = props;

    const alerts = useAlerts();

    const dataStore = useDataStore();

    const isNew = ! parseInt(gradingSystemId);

    const { useData: gradingSystem } = useDataStoreItem(isNew ? undefined : `grading_system/${gradingSystemId}`)

    const initialValues = {
        name: gradingSystem?.name || ''
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('System name is required.')
    });

    const onSubmit = (values, { setSubmitting }) => {
        API.upsert('grading_systems', gradingSystemId, values)
            .then((response) => {
                if (response?.data?.id) {
                    dataStore.set(`grading_systems/${response.data.id}`, response.data);
                }

                alerts.replace({
                    message: 'Organization updated.',
                    type: 'success',
                    isDismissable: true
                });
                
                setSubmitting(false);

                if (typeof afterSubmit === 'function') {
                    afterSubmit(response);
                }
            })
            .catch((error) => {
                alerts.add({
                    message: API.getErrorMessage(error),
                    type: 'danger',
                    isDismissable: true
                });
                setSubmitting(false);
            });
    };

    if (! isNew && gradingSystem === undefined) {
        return (
            <LoadingIcon isLarge={ true } />
        );
    }

    return (
        <>
            { alerts.render('mb-4') }

            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ isSubmitting }) => (
                    <Form id="grading-system-form">
                        
                        <div className="mb-3">
                            <Input
                                type="text" 
                                name="name" 
                                label="System Name"
                                required
                            />
                        </div>

                        <Button type="submit" isLoading={ isSubmitting }>
                            Save
                        </Button>

                    </Form>
                )}
            </Formik>
        </>
    );
}

export default GradingSystemForm;