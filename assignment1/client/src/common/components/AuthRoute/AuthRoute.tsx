import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import logging from '../../../config/logging';
import { UserContext } from '../UserContext/UserContext';

export interface IAuthRouteProps {}

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = props => {
    const { children } = props;

    const userContext = useContext(UserContext);

    if (userContext.userState.user.uid === '')
    {
        logging.info('Unauthorized, redirecting to login.');
        console.log(props.children);
        return <Redirect to='/login'  />
    }
    else
    {
        return <>{children}</>
    }
}

export default AuthRoute;