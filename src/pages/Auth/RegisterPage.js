import RegisterForm from '../../forms/RegisterForm';
import { Redirect, Link } from 'react-router-dom';
import { useAuth } from './../../hooks';
import AuthLayout from '../../layouts/AuthLayout';

function RegisterPage() {

    const { user } = useAuth();

    if (user) {
        return (
            <Redirect to="/" />
        );
    }

    return (
        <AuthLayout>
            <div>
                <img
                    className="h-12 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow"
                />
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                    Create an account
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    Been here before?
                    {' '}
                    <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Sign in
                    </Link>
                </p>
            </div>

            <div className="mt-8">
                <RegisterForm />
            </div>
        </AuthLayout>
    );
}

export default RegisterPage;