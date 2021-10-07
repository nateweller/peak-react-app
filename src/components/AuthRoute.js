import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './../hooks';

function AuthRoute({ component: Component, ...rest }) {

    const { user } = useAuth();

    return (
        <Route 
            {...rest}
            render={props => user 
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }
        />
    );
}

export default AuthRoute;