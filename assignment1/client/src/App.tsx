import React, { useEffect, useReducer, useState } from "react";
import {
  BrowserRouter,
  Route,
  RouteComponentProps,
  Switch,
} from "react-router-dom";
import "./App.css";
import AuthRoute from "./common/components/AuthRoute/AuthRoute";
import { Loading } from "./common/components/Loading/Loading";
import {
  firebase_token_key,
  initialUserState,
  UserContext,
  userReducer,
} from "./common/components/UserContext/UserContext";
import { Authorize } from "./common/datasource/auth";
import logging from "./config/logging";
import { routes } from "./config/routes";

interface IAppState {
  authStage: string;
  loading: boolean;
}

function App() {
  // combining state - loading and authState as below async calls inside useEffect will not batch state update for - setLoading(), setAuthStage();
  const [appState, setAppStage] = useState<IAppState>({
    authStage: "Loading ...",
    loading: true,
  });

  // required for passing value to UserContext.Provider component
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);

  const userContextValues = {
    userState,
    userDispatch,
  };

  useEffect(() => {
    setTimeout(()=>CheckLocalStorageForCredentials(), 2000);
  }, []);

  const CheckLocalStorageForCredentials = () => {
    const firebase_token = localStorage.getItem(firebase_token_key);
    if (firebase_token === null) {
      userDispatch({ type: "logout", payload: initialUserState });
      setAppStage({ authStage: "No credentials found", loading: false });
    } else {
      return Authorize(firebase_token, (error, user) => {
        if (error) {
          logging.error(error);
          userDispatch({ type: "logout", payload: initialUserState });
          setAppStage({ authStage: "Invalid credentials", loading: false });
        } else if (user) {
          userDispatch({ type: "login", payload: { user, firebase_token } });
          setAppStage({ authStage: "Valid credentials found", loading: false });
        }
      });
    }
  };

  logging.info("Rendering App");
  console.log(userState);

  return appState.loading ? (
    <Loading message="..." />
  ) : (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={userContextValues}>
          <Switch>
            {routes.map((route, index) => {
              return (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  render={(routeProps: RouteComponentProps) =>
                    route.auth ? (
                      <AuthRoute>
                        <route.component {...routeProps} />
                      </AuthRoute>
                    ) : (
                      <route.component {...routeProps} />
                    )
                  }
                />
              );
            })}
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
