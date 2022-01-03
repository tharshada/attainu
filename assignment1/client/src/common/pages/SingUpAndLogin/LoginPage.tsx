import { useContext, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import Form from "../../components/Form/Form";
import { IButtonProps } from "../../components/Form/Form.types";
import { UserContext } from "../../components/UserContext/UserContext";
import { DEFAULT_USER, IUser } from "../../interfaces";
import "./LoginPage.css";
import { ILoginPageProps, ILoginPageState } from "./LoginPage.types";
import config from "../../../config/config";
import logging from "../../../config/logging";
import { Authorize } from "../../datasource/auth";

export const LoginPage: React.FunctionComponent<ILoginPageProps> = (props) => {
  const [state, setState] = useState<ILoginPageState>({
    type: props.type || "Login",
  });

  const userContext = useContext(UserContext);
  let user: IUser = DEFAULT_USER;

  const handleSubmit = (data: any) => {
    console.log(data);
    initializeApp(config.firebase);
    getAuth().setPersistence({ type: "NONE" });
    const func =
      state.type === "Login"
        ? signInWithEmailAndPassword
        : createUserWithEmailAndPassword;
    func(getAuth(), data.username, data.password)
      .then((userCredential: UserCredential) => {
        user.name = userCredential.user.email || "";
        user.uid = userCredential.user.uid;
        return userCredential.user.getIdToken(true);
      })
      .then((idToken: string) => {
        Authorize(idToken, (error: string | null, user: IUser | null) => {
          if (error) {
            logging.error(
              `Could not authenticate user using idToken. Error: ${error}`
            );
          } else if (user) {
            console.log(user);
            logging.info("setting firebase token in local storage");
            logging.info("sending to /home page");
            userContext.userDispatch({
              type: "login",
              payload: { user, firebase_token: idToken },
            });
            window.location.assign("/");
          }
        });
      })
      .then(() => {
        logging.info("Signing out from firebase");
        return getAuth().signOut(); // firebase
      })
      .catch((reason: any) => {
        logging.error(
          `Could not obtain idToken for the signed in user. Error: ${reason}`
        );
        return;
      });
  };

  const buttonProps: IButtonProps = {
    buttonText: state.type === "Login" ? "SignIn!" : "SignUp!",
  };
  logging.info("Rendering login/singup");
  console.log(state);
  console.log(buttonProps);
  return (
    <div className={"formWrapper"}>
      <Form onSubmit={handleSubmit} buttonProps={buttonProps} />
      <div>
        <b>OR</b>
        <br />
        <button
          className={"buttonSignUpIn"}
          onClick={() => {
            if (state.type === "Login") {
              setState({ type: "Signup" });
            } else if (state.type === "Signup") {
              setState({ type: "Login" });
            }
          }}
        >
          {state.type === "Login" ? "SignUp!" : "SingIn!"}
        </button>
      </div>
    </div>
  );
};
