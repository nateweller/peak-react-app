import { useContext } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useForm, useDataStoreItem } from './../hooks';
import { disciplines } from '../enums';
import { OrganizationContext } from './../providers/OrganizationProvider';

import Button from './../components/Button';
import Input from './../components/Input';
import Select from './../components/Select';
import LoadingIcon from './../components/LoadingIcon';
import GradesInput from '../components/GradesInput';

function GradingSystemForm(props) {
    
    const { 
        id = null,
        onSuccess = () => {}
    } = props;

    const form = useForm({
        id,
        apiCommand: 'grading_systems',
        onSuccess
    });

    const isNew = ! parseInt(id);

    const { organization } = useContext(OrganizationContext);

    const { useData: gradingSystem } = useDataStoreItem(isNew ? undefined : `grading_systems/${id}`)

    const initialValues = {
        name: gradingSystem?.name || '',
        discipline: gradingSystem?.discipline || '',
        organization_id: organization?.id || '',
        grades: gradingSystem?.grades || []
    };

    const validationSchema = Yup.object().shape({
        organization_id: Yup.number().required('Organization ID is required.'),
        name: Yup.string().required('System name is required.'),
        discipline: Yup.string(),
        grades: Yup.array()
    });

    if (! isNew && gradingSystem === undefined) {
        return (
            <LoadingIcon isLarge={ true } />
        );
    }

    return (
        <>
            { form.alerts.render() }

            <Formik 
                initialValues={ initialValues } 
                validationSchema={ validationSchema } 
                onSubmit={ form.onSubmit }
            >
                {({ isSubmitting }) => (
                    <Form id="grading-system-form" className="space-y-6">

                        <Input 
                            type="hidden"
                            name="organization_id"
                        />
                        
                        <div>
                            <Input
                                type="text" 
                                name="name" 
                                label="System Name"
                                required
                            />
                        </div>

                        <div>
                            { /** @todo this could be a multi-select, i.e. Top Rope and Lead might share a grading system */}
                            <Select
                                name="discipline"
                                label="Discipline"
                                options={ Object.keys(disciplines).map((disciplineKey) => ({
                                    label: disciplines[disciplineKey],
                                    value: disciplineKey
                                })) }
                            />
                        </div>

                        <div>
                            <GradesInput />
                        </div>

                        <Button type="submit" isLoading={ isSubmitting }>
                            Save
                        </Button>

                    </Form>
                )}
            </Formik>
        </>
    );
}

export default GradingSystemForm;