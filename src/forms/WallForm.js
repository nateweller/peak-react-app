import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDataStoreItem, useForm } from './../hooks';

import Button from '../components/Button';
import Input from './../components/Input';
import Select from '../components/Select';
import LoadingIcon from '../components/LoadingIcon';

export default function WallForm(props) {

    const {
        id = null,
        onSuccess = () => {}
    } = props;

    const { useData: locations = [] } = useDataStoreItem('locations');

    const form = useForm({
        id,
        apiCommand: 'walls',
        onSuccess
    });

    const initialValues = {
        name: '',
        location_id: '',
        order: ''
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required.'),
        location_id: Yup.number().required('Location is required.'),
        order: Yup.number()
    });

    if (id && form.data === undefined) {
        return <LoadingIcon isLarge={ true } />;
    }

    return (
        <Formik 
            initialValues={ form.data || initialValues }
            validationSchema={ validationSchema }
            onSubmit={ form.onSubmit }
        >
            { ({ isSubmitting }) => (
                <Form id="wall-form" className="space-y-6">

                    { form.alerts.render() }

                    <Input 
                        name="name"
                        label="Wall Name"
                        placeholder="East Cave"
                        type="text"
                    />

                    <div>
                        <Select 
                            name="location_id"
                            label="Location"
                            options={ [
                                { value: '', label: '' },
                                ...locations.map(location => ({ value: location.id, label: location.name }))
                            ] }
                        />
                    </div>

                    <Button type="submit" isLoading={ isSubmitting }>
                        Save
                    </Button>

                </Form>
            ) }
        </Formik>
    );
}