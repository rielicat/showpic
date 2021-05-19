import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import * as ROUTES from "constants/routes";
import UserContext from "context/user";
import AssetsContext from "context/assets";
import useAuthListener from "hooks/use-auth-listener";
import useImageListener from "hooks/use-image-listener";

const Authentication = lazy(() => import("views/authentication"));
const NotFound = lazy(() => import("views/not-found"));
const Dashboard = lazy(() => import("views/dashboard"));

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
              <Route path={ROUTES.DASHBOARD} component={Dashboard} />
              <Route path={ROUTES.NOT_FOUND} component={NotFound} />
            </Switch>
          </Suspense>
        </Router>
      </AssetsContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
