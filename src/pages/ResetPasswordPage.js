import ResetPasswordForm from '../forms/ResetPasswordForm';
import ForgotPasswordForm from '../forms/ForgotPasswordForm';
import { Link, useLocation } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';

function ResetPasswordPage() {

    const query = new URLSearchParams(useLocation().search);

    return (
        <AuthLayout>
            <div>
                <img
                    className="h-12 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow"
                />
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                    Reset your password
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    Remembered?
                    {' '}
                    <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Sign in
                    </Link>
                </p>
                <p className="mt-2 text-sm text-gray-600">
                    New here?
                    {' '}
                    <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Create an account
                    </Link>
                </p>
            </div>

            <div className="mt-8">
                { 
                    query.get('token')
                        ? <ResetPasswordForm token={query.get('token')} />
                        : <ForgotPasswordForm />
                }
            </div>
        </AuthLayout>
    );
}

export default ResetPasswordPage;