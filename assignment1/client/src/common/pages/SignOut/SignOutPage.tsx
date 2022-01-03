import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import config from "../../../config/config";
import logging from "../../../config/logging";
import { Loading } from "../../components/Loading/Loading";
import {
  initialUserState,
  UserContext,
} from "../../components/UserContext/UserContext";
import { ISignOutPageProps, ISignoutPageState } from "./SignOut.types";

export const SignOutPage: React.FunctionComponent<ISignOutPageProps> = (
  props
) => {
  const [state, setState] = useState<ISignoutPageState>({
    message: "Trying to sign out...",
    pending: true,
  });
  logging.info("Trying to sign out the user");
  const userContext = useContext(UserContext);

  initializeApp(config.firebase);
  useEffect(() => {
    const auth = getAuth();
      auth.setPersistence({ type: "NONE" });
      signOut(auth)
        .then(() => {
          logging.info("Signing out from firebase");
          return auth.signOut(); // firebase
        })
        .then(() => {
          // Sign-out successful.
          setState({ pending: false, message: "" });
          userContext.userDispatch({
            type: "logout",
            payload: { ...initialUserState },
          });
        })
        .catch((error) => {
          // An error happened.
          setState({ pending: true, message: error });
        });
  }, [userContext]);

  if (state.pending) {
    return <Loading message={state.message} />;
  }

  return <Redirect to="/login" />;
};
