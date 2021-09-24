import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { setUser } from './../redux-store';
import { useAlerts } from './../hooks';
import { API } from './../api';

import Input from './../components/Input';
import Button from './../components/Button';

function RegisterForm() {

    const dispatch = useDispatch();

    const alerts = useAlerts();

    const initialValues = {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required.'),
        email: Yup.string().required('Email address is required.'),
        password: Yup.string().required('Password is required.'),
        password_confirmation: Yup.string().required('Confirm Password is required.')
    });

    const onSubmit = (values, { setSubmitting }) => {
        API.post('register', values)
            .then((response) => {
                localStorage.setItem('token', response.data.token);
                dispatch(setUser({ ...response.data.user, token: response.data.token }));
            })
            .catch((error) => {
                alerts.replace({
                    type: 'danger',
                    message: error?.response?.data?.message || 'Error'
                });
                setSubmitting(false);
            });
    };

    return (
        <>
            { alerts.render() }

            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ isSubmitting }) => (
                    <Form className="space-y-6">

                        <div className="mt-1">
                            <Input 
                                type="text"
                                name="name"
                                label="Name"
                                required
                            />
                        </div>

                        <div>
                            <Input 
                                name="email"
                                type="email"
                                label="Email Address"
                                autoComplete="email"
                                required 
                            />
                        </div>

                        <div>
                            <Input 
                                name="password"
                                label="Password"
                                type="password"
                                required
                            />
                        </div>

                        <div>
                            <Input 
                                name="password_confirmation"
                                label="Confirm Password"
                                type="password"
                                required
                            />
                        </div>

                        <div>
                            <Button type="submit" disabled={ isSubmitting } className="w-full flex justify-center">
                                Create Account 
                            </Button>
                        </div>

                    </Form>
                )}
            </Formik>
        </>
    );
}

export default RegisterForm;