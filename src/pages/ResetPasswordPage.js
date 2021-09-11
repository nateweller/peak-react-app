import ResetPasswordForm from '../forms/ResetPasswordForm';
import ForgotPasswordForm from '../forms/ForgotPasswordForm';
import { Link, useLocation } from 'react-router-dom';

function ResetPasswordPage() {

    const query = new URLSearchParams(useLocation().search);

    return (
        <div className="bg-light min-vh-100 py-5">
            <div className="container" style={{ maxWidth: '420px' }}>
                <h1 className="h3">
                    Reset Password
                </h1>
                <div className="card">
                    <div className="card-body">
                        {query.get('token')
                            ? <ForgotPasswordForm />
                            : <ResetPasswordForm token={query.get('token')} />
                        }
                    </div>
                </div>
                <p className="mt-4">
                    <Link to="/login">
                        Login
                    </Link> 
                    {' '}
                    <Link to="/register">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default ResetPasswordPage;