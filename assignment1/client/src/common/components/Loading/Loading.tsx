import './Loading.css';
import { ILoadingProps } from './Loading.types';

export const Loading: React.FunctionComponent<ILoadingProps>  = (props) => {
    const {message} = props;
  return <header className="App-header">
    <img
      src={"https://svgsilh.com/svg/312032.svg"}
      className="App-logo"
      alt="logo"
    />
    <h1 data-text={message}>{message}</h1>
  </header>
};
