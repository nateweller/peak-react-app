import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { API } from './../api';
import { setUser } from './../redux-store';

import Alert from './../components/Alert';

function RegisterForm() {

    const dispatch = useDispatch();

    const [errorMessage, setErrorMessage] = useState(null);

    const initialValues = {
        name: '',
        email: '',
        password: '',
        confirm_password: ''
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required.'),
        email: Yup.string().required('Email address is required.'),
        password: Yup.string().required('Password is required.'),
        confirm_password: Yup.string().required('Confirm Password is required.')
    });

    const onSubmit = (values, { setSubmitting }) => {
        API.post('register', values)
            .then((response) => {
                dispatch(setUser({ ...response.data.user, token: response.data.token }));
            })
            .catch((error) => {
                setErrorMessage(error.response.data.message);
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    return (
        <>
            { errorMessage ? <Alert type="danger" message={errorMessage} /> : null }

            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ errors, touched, isSubmitting }) => (
                    <Form>

                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Name
                            </label>
                            <Field 
                                type="text"
                                name="name"
                                className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} 
                                aria-describedby="name-validation"
                            />
                            <ErrorMessage name="name" id="name-validation" component="div" className="invalid-feedback d-block" />
                        </div>

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

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <Field 
                                type="password"
                                name="password"
                                className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')}
                                aria-describedby="password_validation"
                            />
                            <ErrorMessage name="password" id="password_validation" component="div" className="invalid-feedback d-block" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password_confirmation" className="form-label">
                                Confirm Password
                            </label>
                            <Field 
                                type="password"
                                name="password_confirmation"
                                className={'form-control' + (errors.password_confirmation && touched.password_confirmation ? ' is-invalid' : '')}
                                aria-describedby="password_confirmatino_validation"
                            />
                            <ErrorMessage name="password_confirmation" id="password_confirmatino_validation" component="div" className="invalid-feedback d-block" />
                        </div>

                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            Register
                        </button>

                    </Form>
                )}
            </Formik>
        </>
    );
}

export default RegisterForm;