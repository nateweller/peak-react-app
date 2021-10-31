import { useEffect, useState } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { App as CapacitorApp } from '@capacitor/app';

import { setUser } from './redux-store';
import { useAuth } from './hooks';
import { developmentLog } from './utils';

import OrganizationProvider from './providers/OrganizationProvider';

import AuthRoute from './components/AuthRoute';
import LoadingIcon from './components/LoadingIcon';

import './styles/app.scss';

/**
 * Import Pages
 */
import NotFoundPage from './pages/NotFoundPage';
// Auth
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import ResetPasswordPage from './pages/Auth/ResetPasswordPage';
import LogoutPage from './pages/Auth/LogoutPage';
// Public
import HomePage from './pages/HomePage';
import ClimbPage from './pages/ClimbPage';
import ScanPage from './pages/ScanPage';
// Admin
import { default as AdminHomePage } from './pages/Admin/HomePage';
import { default as AdminClimbsPage } from './pages/Admin/Climbs/ClimbsPage';
import { default as AdminEditClimbPage } from './pages/Admin/Climbs/EditClimbPage';
import { default as AdminViewClimbPage } from './pages/Admin/Climbs/ViewClimbPage';
import { default as AdminNewClimbPage } from './pages/Admin/Climbs/NewClimbPage';
import { default as AdminOrganizationPage } from './pages/Admin/Settings/OrganizationPage';
import { default as AdminLocationsPage } from './pages/Admin/Settings/LocationsPage';
import { default as AdminGradingSystemsPage } from './pages/Admin/Settings/GradingSystemsPage';
import { default as AdminClimbColorsPage } from './pages/Admin/Settings/ClimbColorsPage';

/**
 * App
 */
function App(props) {

  const dispatch = useDispatch();
  const history = props.history;
  const { user, initializeCurrentUser } = useAuth();

  const [userLoaded, setUserLoaded] = useState(false);
  const [appInitialized, setAppInitialized] = useState(false);

  /**
   * App Initialization Hook
   */
  useEffect(() => {

    if (!appInitialized) {

      if (!user && !localStorage.getItem('token')) {
        // signed out - no user to load
        setUserLoaded(true);
      }

      if (!user && localStorage.getItem('token')) {
        // token in local storage, set into state
        dispatch(setUser({ token: localStorage.getItem('token') }));
      }

      if (user && user.token && !user.id) {
        // user data missing in state
        initializeCurrentUser()
          .catch(() => {})
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

  }, [user, dispatch, userLoaded, appInitialized, initializeCurrentUser]);

  /**
   * Back Button Listener
   */
  useEffect(() => {
    CapacitorApp.addListener('backButton', () => {
      history.goBack()
    });

    return () => {
      CapacitorApp.removeAllListeners();
    };
    
  }, [history])

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
          <AuthRoute exact path="/admin/climbs" component={AdminClimbsPage} />
          <AuthRoute exact path="/admin/climbs/new" component={AdminNewClimbPage} />
          <AuthRoute exact path="/admin/climbs/:climbId(\d+)" component={AdminViewClimbPage} />
          <AuthRoute exact path="/admin/climbs/:climbId(\d+)/edit" component={AdminEditClimbPage} />
          <AuthRoute exact path="/admin/settings/organization" component={AdminOrganizationPage} />
          <AuthRoute exact path="/admin/settings/locations" component={AdminLocationsPage} />
          <AuthRoute exact path="/admin/settings/grading" component={AdminGradingSystemsPage} />
          <AuthRoute exact path="/admin/settings/colors" component={AdminClimbColorsPage} />
          <AuthRoute exact path="/admin/settings" component={AdminOrganizationPage} />
          <AuthRoute exact path="/admin" component={AdminHomePage} />
        </OrganizationProvider>
      </Route>

      <Route path="/" component={NotFoundPage} />

    </Switch>
  );
}

export default withRouter(App);
