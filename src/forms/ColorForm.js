import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useForm } from './../hooks';

import LoadingIcon from './../components/LoadingIcon';
import Input from './../components/Input';
import Button from '../components/Button';

function ColorForm(props) {

    const { 
        id = null, 
        onSuccess = () => {}
    } = props;

    const form = useForm({
        id,
        apiCommand: 'climb_colors',
        onSuccess
    });

    const initialValues = { 
        name: '', 
        color: '#6366F1' 
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Color name is required.'),
        color: Yup.string().required('Color is required')
    });

    if (id && form.data === undefined) {
        return <LoadingIcon isLarge={true} />;
    }

    return (
        <Formik 
            initialValues={ form.data || initialValues } 
            validationSchema={ validationSchema } 
            onSubmit={ form.onSubmit }
        >
            { ({ isSubmitting }) => (
                <Form id="climb-form" className="space-y-6">

                    { form.alerts.render() }

                    <Input 
                        name="name"
                        label="Name"
                        type="text"
                    />

                    <div>
                        <Input 
                            name="color"
                            type="color"
                            label="Color"
                        />
                    </div>
                    
                    <Button type="submit" isLoading={isSubmitting}>
                        Save
                    </Button>
                    
                </Form>
             ) }
        </Formik>
    );
}

export default ColorForm;