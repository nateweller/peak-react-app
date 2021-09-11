import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { API } from './../api';

import Alert from './../components/Alert';

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
                            <label htmlFor="name" className="form-label">
                                Organization Name
                            </label>
                            <Field 
                                type="text" 
                                name="name" 
                                className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} 
                                aria-describedby="name-validation" 
                            />
                            <ErrorMessage name="name" id="name-validation" component="div" className="invalid-feedback d-block" />
                        </div>

                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            Update
                        </button>

                    </Form>
                )}
            </Formik>
        </>
    );
}

export default OrganizationForm;