import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import * as ROUTES from "constants/routes";
import UserContext from "context/user";
import AssetsContext from "context/assets";
import useAuthListener from "hooks/use-auth-listener";
import useImageListener from "hooks/use-image-listener";
import ProtectedRoute from "helpers/protected.route";

const Authentication = lazy(() => import("views/authentication"));
const NotFound = lazy(() => import("views/not-found"));
const Dashboard = lazy(() => import("views/dashboard"));
const Profile = lazy(() => import("views/profile"));

function App() {
  const { user } = useAuthListener();
  const { images, addPaths, getAvatar } = useImageListener();

  return (
    <UserContext.Provider value={{ user }}>
      <AssetsContext.Provider value={{ images, addPaths, getAvatar }}>
        <Router>
          <Suspense fallback={<p>Loading...</p>}>
            <Switch>
              <Route
                path={ROUTES.LOGIN}
                render={() => <Authentication action="login" />}
              />
              <Route
                path={ROUTES.SIGNUP}
                render={() => <Authentication action="register" />}
              />
              <ProtectedRoute
                exact
                path={ROUTES.DASHBOARD}
                component={Dashboard}
              />
              <ProtectedRoute path={ROUTES.PROFILE} component={Profile} />
              <Route path={ROUTES.ALL} component={NotFound} />
            </Switch>
          </Suspense>
        </Router>
      </AssetsContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
