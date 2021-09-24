import RegisterForm from '../forms/RegisterForm';
import { Redirect, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function RegisterPage() {

    const user = useSelector(state => state.auth.user);

    if (user) {
        return (
            <Redirect to="/" />
        );
    }

    return (
        <div className="bg-light min-vh-100 py-5">
            <div className="container" style={{ maxWidth: '420px' }}>
                <h1 className="h3">
                    Register
                </h1>
                <div className="card">
                    <div className="card-body">
                        <RegisterForm />
                    </div>
                </div>
                <p className="mt-4">
                    <Link to="/login">
                        Login
                    </Link> 
                    {' '}
                    <Link to="/reset">
                        Reset Password
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;