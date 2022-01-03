import { createContext } from 'react';
import logging from '../../../config/logging';
import { DEFAULT_FIRE_TOKEN, DEFAULT_USER, IUser } from '../../interfaces';

export interface IUserState {
    user: IUser;
    firebase_token: string;
}

export interface IUserActions {
    type: 'login' | 'logout' | 'authenticate';
    payload: {
        user: IUser;
        firebase_token: string;
    };
}

export const initialUserState: IUserState = {
    user: DEFAULT_USER,
    firebase_token: DEFAULT_FIRE_TOKEN
};

export const firebase_token_key: string = 'firebase_token';

export const userReducer = (state: IUserState, action: IUserActions) => {

    const {user, firebase_token} = action.payload;
    logging.info('user dispatch');
    console.log(action.type);
    console.log(user);
    
    switch (action.type) {
        case 'login':
            localStorage.setItem(firebase_token_key, firebase_token);

            return { user, firebase_token };
        case 'logout':
            localStorage.removeItem(firebase_token_key);

            return initialUserState;
        default:
            return state;
    }
};

export interface IUserContextProps {
    userState: IUserState;
    userDispatch: React.Dispatch<IUserActions>;
}

export const UserContext = createContext<IUserContextProps>({
    userState: initialUserState,
    userDispatch: () => {}
});
;