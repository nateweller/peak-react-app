import { useEffect, useState } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setMenuIsActive, setUser } from './redux-store';
import { developmentLog } from './utils';
import { API } from './api';

import AuthRoute from './components/AuthRoute';
import LoadingIcon from './components/LoadingIcon';

import './styles/app.scss';
// import AdminLayout from './layouts/AdminLayout';

import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import LogoutPage from './pages/LogoutPage';
import HomePage from './pages/HomePage';
import ClimbPage from './pages/ClimbPage';
import ScanPage from './pages/ScanPage';

import { default as AdminClimbsPage } from './pages/Admin/Climbs/ClimbsPage';
import EditClimbPage from './pages/Admin/Climbs/EditClimbPage';
import ViewClimbPage from './pages/Admin/Climbs/ViewClimbPage';
import NewClimbPage from './pages/Admin/Climbs/NewClimbPage';

import OrganizationPage from './pages/OrganizationPage';
import LocationsPage from './pages/LocationsPage';
import { default as AdminHomePage } from './pages/Admin/HomePage';
import OrganizationProvider from './providers/OrganizationProvider';

function App(props) {

  const dispatch = useDispatch();
  const history = props.history;
  const user = useSelector(state => state.global.user);

  const [userLoaded, setUserLoaded] = useState(false);
  const [appInitialized, setAppInitialized] = useState(false);

  useEffect(() => {

    if (!appInitialized) {

      if (!user && !localStorage.getItem('token')) {
        // signed out - no user to load
        setUserLoaded(true);
      }

      if (!user && localStorage.getItem('token')) {
        // token in local storage, set into state
        dispatch(setUser({ ...user, token: localStorage.getItem('token') }));
      }

      if (user && user.token && !user.id) {
        // user data missing in state
        API.get('user')
          .then(response => {
            // set user data into state
            dispatch(setUser({ ...user, ...response.data }));
          })
          .catch(error => {
            // delete user token
            // to do: this is not needed in cases such as network error,
            //        needs more conditionals.
            localStorage.removeItem('token');
            dispatch(setUser(null));

            developmentLog('Error fetching user data:');
            developmentLog(error);
          })
          .finally(() => {
            setUserLoaded(true);
          });
      }
  
      // user must be finished loading to continue
      if (!userLoaded) return;

      setAppInitialized(true);
  
      developmentLog('🕺 App Initialized 🕺');
      developmentLog(user?.id ? `User ID: ${user.id}` : 'Signed Out');
    }

  }, [user, dispatch, userLoaded, appInitialized]);

  /*
   * Navigation Change Listener
   */
  useEffect(() => {
    history.listen((location, action) => {
      // close menu
      dispatch(setMenuIsActive(null));
    });
  }, [history, dispatch]);

  if (!appInitialized) {
    return <LoadingIcon isFullScreen={true} />;
  }

  return (
    <Switch>

      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/reset" component={ResetPasswordPage} />
      <AuthRoute path="/logout" component={LogoutPage} />

      <Route exact path="/" component={HomePage} />
      <Route exact path="/climbs/:climbId(\d+)" component={ClimbPage} />

      <Route exact path="/scan" component={ScanPage} />

      <Route path="/admin">
        <OrganizationProvider>
          <AuthRoute exact path="/admin/organization" component={OrganizationPage} />
          <AuthRoute exact path="/admin/locations" component={LocationsPage} />
          <AuthRoute exact path="/admin/climbs" component={AdminClimbsPage} />
          <AuthRoute exact path="/admin/climbs/new" component={NewClimbPage} />
          <AuthRoute exact path="/admin/climbs/:climbId(\d+)" component={ViewClimbPage} />
          <AuthRoute exact path="/admin/climbs/:climbId(\d+)/edit" component={EditClimbPage} />
          <AuthRoute exact path="/admin" component={AdminHomePage} />
        </OrganizationProvider>
      </Route>

      <Route path="/" component={NotFoundPage} />

    </Switch>
  );
}

export default withRouter(App);
