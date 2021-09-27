import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux-store';

function LogoutPage() {

    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.removeItem('token');
        dispatch(setUser(null));
    }, [dispatch]);

    return null;
}

export default LogoutPage;