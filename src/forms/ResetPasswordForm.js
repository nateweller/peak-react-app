import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useAlerts, useAuth } from './../hooks';

import Input from './../components/Input';
import Button from './../components/Button';

function ResetPasswordForm(props) {

    const { token } = props;

    const alerts = useAlerts();

    const { resetPassword } = useAuth();

    const initialValues = {
        password: '',
        password_confirmation: ''
    };

    const validationSchema = Yup.object().shape({
        password: Yup.string().required('Password is required.'),
        password_confirmation: Yup.string().required('Confirm Password is required.')
    });

    const onSubmit = ({ password, password_confirmation: passwordConfirmation }, { setSubmitting }) => {
        resetPassword(password, passwordConfirmation, token)
            .then((response) => {
                alerts.replace({
                    type: 'success',
                    message: response?.data?.message || 'Success',
                    isDismissable: true
                });
            })
            .catch((error) => {
                alerts.replace({
                    type: 'danger',
                    message: error?.response?.data?.message || 'Error',
                    isDismissable: true
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

                        <div>
                            <Input
                                name="password"
                                type="password"
                                label="New Password"
                                required 
                            />
                        </div>

                        <div>
                            <Input
                                name="password_confirmation"
                                type="password"
                                label="Confirm New Password"
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

export default ResetPasswordForm;