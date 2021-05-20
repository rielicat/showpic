import { Route, Redirect, RouteProps } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import useAuthListener from "hooks/use-auth-listener";

interface ProtectedRouteProps extends RouteProps {
  component: any;
}

export default function ProtectedRoute({
  children,
  component: Component,
  ...rest
}: ProtectedRouteProps) {
  const { user } = useAuthListener();

  return (
    <Route
      {...rest}
      render={(props) =>
        user.uid ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: ROUTES.LOGIN, state: { from: props.location } }}
          />
        )
      }
    >
      {children}
    </Route>
  );
}
