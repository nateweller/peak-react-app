import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AuthRoute({ component: Component, ...rest }) {

    // to do: user permission levels
    const user = useSelector(state => state.global.user);

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