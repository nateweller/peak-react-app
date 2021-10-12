import { Formik, Form, useFormikContext } from 'formik';
import * as Yup from 'yup';
import LoadingIcon from './../components/LoadingIcon';
import { disciplines } from './../enums';
import { useForm, useDataStoreItem } from './../hooks';

import ColorPicker from './../components/ColorPicker';
import Input from './../components/Input';
import Select from './../components/Select';

function ClimbForm(props) {

    const { 
        id = null,
        onSuccess = () => {}
     } = props;

    const form = useForm({
        id,
        apiCommand: 'climbs',
        onSuccess
    });

    const { useData: locations } = useDataStoreItem('locations');

    const { useData: gradeSystems } = useDataStoreItem('grading_systems');

    const initialValues = {
        name: '',
        discipline: '',
        grade_id: '',
        color_id: '',
        location_id: ''
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Climb name is required.'),
        discipline: Yup.string(),
        grade_id: Yup.number().nullable(),
        color_id: Yup.number().nullable(),
        location_id: Yup.number().required('Location is required.')
    });

    const GradeSelect = () => {
        const { values } = useFormikContext();

        let gradeOptions = [];
        if (gradeSystems) {
            const gradeSystem = gradeSystems.filter(gradeSystem => gradeSystem?.discipline === values.discipline)[0];
            if (gradeSystem) {
                gradeOptions = gradeSystem.grades.map(grade => ({
                    label: grade.name,
                    value: grade.id
                }));
            }
        }

        return (
            <Select 
                name="grade_id"
                label="Grade"
                options={gradeOptions}
            />
        );
    };

    if (id && form.data === undefined) {
        return <LoadingIcon isLarge={true} />;
    }

    return (
        <Formik 
            initialValues={ form.data || initialValues } 
            validationSchema={ validationSchema } 
            onSubmit={ form.onSubmit }
        >
            { () => (
                <Form id="climb-form">

                    { form.alerts.render() }

                    <Input 
                        name="name"
                        label="Name"
                        type="text"
                    />

                    <div className="mt-4">
                        <Select 
                            name="discipline"
                            label="Discipline"
                            options={Object.keys(disciplines).map((key) => ({ value: key, label: disciplines[key] }))}
                        />
                    </div>

                    <div className="mt-4">
                        <GradeSelect />
                    </div>

                    <div className="mt-4">
                        <ColorPicker 
                            name="color_id"
                            label="Hold Color"
                        />
                    </div>
                    
                    <div className="mt-4">
                        <Select 
                            name="location_id"
                            label="Location"
                            options={locations ? locations.map(location => ({ value: location.id, label: location.name })) : []}
                        />
                    </div>
                    
                </Form>
             ) }
        </Formik>
    );
}

export default ClimbForm;