import LoginForm from '../../forms/LoginForm';
import { Redirect, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthLayout from '../../layouts/AuthLayout';

function LoginPage() {

    const user = useSelector(state => state.auth.user);

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
                    Sign in to your account
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    New here?
                    {' '}
                    <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Create an account
                    </Link>
                </p>
            </div>

            <div className="mt-8">
                <LoginForm />
            </div>

        </AuthLayout>
    );
}

export default LoginPage;