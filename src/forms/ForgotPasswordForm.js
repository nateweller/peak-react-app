import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { API } from './../api';

import Alert from './../components/Alert';

function ForgotPasswordForm() {

    const [alert, setAlert] = useState({
        type: 'info',
        message: ''
    });

    const initialValues = {
        email: ''
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address.').required('Email address is required.')
    });

    const onSubmit = (values, { setSubmitting }) => {
        API.post('forgot', values)
            .then((response) => {
                setAlert({
                    type: 'success',
                    message: response.data.message
                });
            })
            .catch((error) => {
                setAlert({
                    type: 'danger',
                    message: error.response.data.message
                });
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    return (
        <>
            { alert.message ? <Alert type={alert.type} message={alert.message} /> : null }

            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ errors, touched, isSubmitting }) => (
                    <Form>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <Field 
                                type="email"
                                name="email"
                                className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} 
                                aria-describedby="email-validation"
                            />
                            <ErrorMessage name="email" id="email-validation" component="div" className="invalid-feedback d-block" />
                        </div>

                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            Reset Password
                        </button>

                    </Form>
                )}
            </Formik>
        </>
    );
}

export default ForgotPasswordForm;