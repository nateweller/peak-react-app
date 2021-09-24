import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { API } from './../api';
import { setUser } from './../redux-store';
import { useAlerts } from './../hooks';

import Button from './../components/Button';
import Input from './../components/Input';

function LoginForm() {

    const dispatch = useDispatch();

    const alerts = useAlerts();

    const initialValues = {
        email: '',
        password: ''
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email address is required.'),
        password: Yup.string().required('Password is required.')
    });

    const onSubmit = (values, { setSubmitting }) => {
        API.post('login', values)
            .then((response) => {
                localStorage.setItem('token', response.data.token);
                dispatch(setUser({ ...response.data.user, token: response.data.token }));
            })
            .catch((error) => {
                alerts.replace({
                    type: 'danger',
                    message: error?.response?.data?.message || 'Error'
                })
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
                                name="email"
                                type="email"
                                label="Email Address"
                                autoComplete="email"
                                required 
                            />
                        </div>

                        <div className="space-y-1">
                            <Input 
                                name="password"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-500 focus:ring-indigo-400 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link to="/reset" className="font-medium text-indigo-500 hover:text-indigo-600">
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>

                        <div>
                            <Button type="submit" disabled={isSubmitting} className="w-full flex justify-center">
                                Sign in
                            </Button>
                        </div>

                    </Form>
                )}
            </Formik>
        </>
    );
}

export default LoginForm;