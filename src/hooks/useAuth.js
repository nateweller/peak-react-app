import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './../redux-store';
import { API } from './../api';
import { developmentLog } from './../utils';

function useAuth() {

    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.user);

    const initializeCurrentUser = () => {
        return new Promise((resolve, reject) => {
            API.get('user')
                .then(response => {
                    // set user data into state
                    dispatch(setUser({ ...user, ...response.data }));
                    resolve();
                })
                .catch(error => {
                    // sign out if token is invalid
                    if (error?.response?.status === 401) {
                        signOut();
                    }
                    
                    developmentLog('Error initializing user data:');
                    developmentLog(error);

                    reject(error);
                });
        });
    };

    const signUp = (name, email, password, passwordConfirmation) => {
        return new Promise((resolve, reject) => {
            API.post('register', { name, email, password, password_confirmation: passwordConfirmation })
                .then((response) => {
                    const userData = { ...response.data.user, token: response.data.token };
                    localStorage.setItem('token', userData.token);
                    dispatch(setUser(userData));

                    resolve(userData);
                })
                .catch((error) => {
                    reject(API.getErrorMessage(error));
                });
        });
    };

    const signIn = (email, password) => {
        return new Promise((resolve, reject) => {
            API.post('login', { email, password })
                .then((response) => {
                    const userData = { ...response.data.user, token: response.data.token };
                    localStorage.setItem('token', userData.token);
                    dispatch(setUser(userData));

                    resolve(userData);
                })
                .catch((error) => {
                    reject(API.getErrorMessage(error));
                });
        });
    };

    const signOut = () => {
        localStorage.removeItem('token');
        dispatch(setUser(null));
    };

    const sendPasswordReset = (email) => (
        API.post('forgot', { email })
    );

    const resetPassword = (password, passwordConfirmation, token) => (
        API.post('reset', { password, password_confirmation: passwordConfirmation, token })
    );

    return {
        user,
        initializeCurrentUser,
        signUp,
        signIn,
        signOut,
        sendPasswordReset,
        resetPassword
    };

}

export default useAuth;