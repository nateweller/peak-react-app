import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useAuth, useDataStoreItem, useForm } from './../hooks';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

import Input from './../components/Input';
import Select from './../components/Select';
import Button from '../components/Button';

function SendForm({ id, climbId, onSuccess }) {

    const form = useForm({
        id,
        apiCommand: 'sends',
        onSuccess
    });
    
    const { useData: climbData } = useDataStoreItem(`climbs/${climbId}`);
    const { useData: gradingSystems } = useDataStoreItem('grading_systems');

    const { user } = useAuth();

    const [showLogin, setShowLogin] = useState(false);

    const getGradeOptions = () => {
        if (! climbData || ! gradingSystems) return [];
        
        const gradesData = gradingSystems.filter(system => system.discipline === climbData.discipline)[0].grades;
        return [
            { value: '', label: '' },
            ...gradesData.map(grade => ({ label: grade.name, value: grade.id }))
        ];
    };

    const validationSchema = Yup.object().shape({
        climb_id: Yup.number().required('Climb ID is required.'),
        grade_id: Yup.number(),
        rating: Yup.number(),
        feedback: Yup.string()
    });

    const initialValues = {
        climb_id: climbId,
        grade_id: '',
        rating: '',
        feedback: ''
    };

    if (! user) {
        if (showLogin) {
            return (
                <div>
                    <h2 className="text-xl font-semibold mb-2">Sign in</h2>
                    <p className="mb-6">
                        Or 
                        {' '}
                        <button class="font-medium text-indigo-600 hover:text-indigo-500" onClick={() => setShowLogin(false)}>
                            sign up
                        </button>
                        {' '}
                        for a new account.
                    </p>
                    <LoginForm />
                </div>
            )
        }

        return (
            <div>
                <h2 className="text-xl font-semibold mb-2">Create an account to get started</h2>
                <p className="mb-6">
                    Or 
                    {' '}
                    <button class="font-medium text-indigo-600 hover:text-indigo-500" onClick={() => setShowLogin(true)}>
                        sign in
                    </button>
                    {' '}
                    to your existing account.
                </p>
                <RegisterForm />
            </div>
        );
    }


    return (
        <Formik 
            initialValues={ initialValues } 
            validationSchema={ validationSchema } 
            onSubmit={ form.onSubmit }
        >
            {({ isSubmitting }) => (
                <Form id="send-form">

                    { form.alerts.render() }

                    <div className="mt-4">
                        <Input
                            name="climb_id"
                            type="hidden"
                            value={ climbId }
                        />
                    </div>

                    <div className="mt-4">
                        <Select
                            name="grade_id"
                            label="Grade"
                            options={ getGradeOptions() }
                        />
                    </div>

                    <div className="mt-4">
                        <Select
                            name="rating"
                            label="Rating"
                            options={[
                                { label: '', value: '' },
                                { label: '5 Stars', value: 5 },
                                { label: '4 Stars', value: 4 },
                                { label: '3 Stars', value: 3 },
                                { label: '2 Stars', value: 2 },
                                { label: '1 Star', value: 1 },
                            ]}
                        />
                    </div>

                    <div className="mt-4">
                        <Input
                            name="feedback"
                            label="Feedback"
                            as="textarea"
                            rows={ 3 }
                        />
                    </div>

                    <div className="mt-4">
                        <Button 
                            type="submit"
                            disabled={ isSubmitting }  
                            isLoading={ isSubmitting }  
                        >
                            Submit
                        </Button>
                    </div>

                </Form>
             ) }
        </Formik>
    );
}

export default SendForm;