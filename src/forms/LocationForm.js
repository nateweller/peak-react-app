import { useContext } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useForm } from './../hooks';
import { OrganizationContext } from './../providers/OrganizationProvider';
import Button from '../components/Button';
import Input from '../components/Input';
import LoadingIcon from '../components/LoadingIcon';

function LocationForm(props) {

    const {
        id = null,
        onSuccess = () => {}
    } = props;

    const { organization } = useContext(OrganizationContext);

    const form = useForm({
        id,
        apiCommand: 'locations',
        onSuccess
    });

    const initialValues = {
        name: ''
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Location name is required.')
    });

    if (! organization?.id) {
        return (
            <LoadingIcon isLarge={ true } />
        );
    }

    return (
        <Formik 
            initialValues={ initialValues }
            validationSchema={ validationSchema }
            onSubmit={ form.onSubmit }
        >
            { ({ isSubmitting }) => (
                <Form className="space-y-6">

                    { form.alerts.render() }

                    <Input 
                        name="organization_id"
                        type="hidden"
                        value={ organization.id }
                        required
                    />

                    <Input
                        name="name"
                        id="name"
                        label="Location Name"
                        type="text"
                        required
                    />

                    <Button type="submit" isLoading={ isSubmitting }>
                        Save
                    </Button>

                </Form>
            ) }
        </Formik>
    );
}

export default LocationForm;