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

    /**
     * @todo sort walls by location
     */
    const { useData: walls = [] } = useDataStoreItem('walls');

    const { useData: gradeSystems } = useDataStoreItem('grading_systems');

    const { useData: colors } = useDataStoreItem('climb_colors', { useCache: true });

    const initialValues = {
        name: '',
        discipline: '',
        grade_id: '',
        color_id: '',
        wall_id: ''
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Climb name is required.'),
        discipline: Yup.string(),
        grade_id: Yup.number().nullable(),
        color_id: Yup.number().nullable(),
        wall_id: Yup.number().required('Wall is required.')
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
                options={[ { value: '', label: '' }, ...gradeOptions ]}
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
            allowReinitialization={ true }
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
                            options={ [
                                { name: '', label: '' },
                                ...Object.keys(disciplines).map((key) => ({ value: key, label: disciplines[key] }))
                            ] }
                        />
                    </div>

                    <div className="mt-4">
                        <GradeSelect />
                    </div>

                    <div className="mt-4">
                        <ColorPicker 
                            name="color.id"
                            label="Hold Color"
                            colors={ colors }
                        />
                    </div>
                    
                    <div className="mt-4">
                        <Select 
                            name="wall.id"
                            label="Wall"
                            options={ [
                                { value: '', label: '' },
                                ...walls.map(wall => ({ value: wall.id, label: wall.name }))
                            ] }
                        />
                    </div>
                    
                </Form>
             ) }
        </Formik>
    );
}

export default ClimbForm;