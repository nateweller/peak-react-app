import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useAlerts, useAuth } from './../hooks';

import Input from '../components/Input';
import Button from '../components/Button';

function ForgotPasswordForm() {

    const alerts = useAlerts();

    const { sendPasswordReset } = useAuth();

    const initialValues = {
        email: ''
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address.').required('Email address is required.')
    });

    const onSubmit = ({ email }, { setSubmitting }) => {
        sendPasswordReset(email)
            .then((response) => {
                alerts.replace({
                    type: 'success',
                    message: response?.data?.message || 'Success'
                })
            })
            .catch((error) => {
                alerts.replace({
                    type: 'danger',
                    message: error?.response?.data?.message || 'Error'
                });
            })
            .finally(() => {
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
                                required 
                            />
                        </div>

                        <Button type="submit" disabled={ isSubmitting }>
                            Reset Password
                        </Button>

                    </Form>
                )}
            </Formik>
        </>
    );
}

export default ForgotPasswordForm;