import { useEffect } from 'react';
import { useAuth } from './../../hooks';

function LogoutPage() {

    const { signOut } = useAuth();

    useEffect(() => {
        signOut();
    }, [signOut]);

    return null;
}

export default LogoutPage;