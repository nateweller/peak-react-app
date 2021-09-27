import { useContext } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { API } from './../api';
import { OrganizationContext } from './../providers/OrganizationProvider';
import { useAlerts } from './../hooks';

import Input from './../components/Input';
import LoadingIcon from './../components/LoadingIcon';

function OrganizationForm() {

    const alerts = useAlerts();

    const { organization, setOrganization } = useContext(OrganizationContext);

    const initialValues = {
        name: organization?.name || ''
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Organization name is required.')
    });

    const onSubmit = (values, { setSubmitting }) => {
        API.patch(`organizations/${organization.id}`, values)
            .then((response) => {
                setOrganization(response.data);
                alerts.replace({
                    message: 'Organization updated.',
                    type: 'success'
                })
            })
            .catch((error) => {
                alerts.replace({
                    message: error?.data?.message || 'An error occurred.',
                    type: 'danger'
                })
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    if (! organization) {
        return (
            <LoadingIcon isLarge={ true } />
        );
    }

    return (
        <>
            { alerts.render('mb-4') }

            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ errors, touched, isSubmitting }) => (
                    <Form id="organization-form">
                        
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