import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { API } from './../api';

import Alert from './../components/Alert';
import Input from './../components/Input';

function OrganizationForm() {

    const organization_id = 0; // to do: this

    const [alert, setAlert] = useState(null);

    const initialValues = {
        name: ''
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Organization name is required.')
    });

    const onSubmit = (values, { setSubmitting }) => {
        API.post(`organization/${organization_id}`)
            .then(response => {
                setAlert({
                    message: 'Organization updated.',
                    type: 'success'
                })
            })
            .catch(error => {
                setAlert({
                    message: error?.data?.message || 'An error occurred.',
                    type: 'danger'
                })
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    return (
        <>
            { alert ? <Alert type={alert.type} message={alert.message} /> : null }

            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ errors, touched, isSubmitting }) => (
                    <Form>
                        
                        <div className="mb-3">
                            <Input
                                type="text" 
                                name="name" 
                                label="Organization Name"
                                className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} 
                                required
                            />
                        </div>

                    </Form>
                )}
            </Formik>
        </>
    );
}

export default OrganizationForm;