import React from "react";
import { IButtonProps, IFormProps } from "./Form.types";
import "./Form.css";

const Form: React.FunctionComponent<IFormProps> = (props) => {
  const usernameRef = React.createRef<HTMLInputElement>();
  const passwordRef = React.createRef<HTMLInputElement>();

  const { onSubmit } = props;

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = {
      username: usernameRef?.current?.value,
      password: passwordRef?.current?.value,
    };
    onSubmit(data);
  };
  const defaultRenderer = (props?: IButtonProps) => {
    return (
      <button className={"submitStyle"} type="submit">
        {props?.buttonText || "Submit"}
      </button>
    );
  };

  return (
    <div className={"appStyle"}>
      <form className={"formStyle"} onSubmit={handleSubmit}>
        <div className={"inputLabelStyle"}>
          <label className={"labelStyle"}>{"Username:"}</label>
          <input ref={usernameRef} type={"text"} style={{...inputStyles}} placeholder="Enter email or username"/>
        </div>
        <div className={"inputLabelStyle"}>
          <label className={"labelStyle"
        }>{"Password:"}</label>
          <input ref={passwordRef} type={"password"} style={{...inputStyles}} placeholder="Enter password"/>
        </div>
        <div>
          {(props.onRenderSubmitButton &&
            props.onRenderSubmitButton(props.buttonProps, defaultRenderer)) ||
            defaultRenderer(props.buttonProps)}
        </div>
      </form>
    </div>
  );
};
const inputStyles = {margin: '5px 0 10px 0', padding: '5px', border: '1px solid #bfbfbf', borderRadius: '3px', width: '90%'};
export default Form;
