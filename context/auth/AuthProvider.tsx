
import { FC, useReducer } from 'react';
import { IUser } from '../../interfaces';
import { AuthContext, authReducer } from './';

export interface AuthState {
    children?: React.ReactNode | undefined;
    isLoggedIn: boolean;
    user?: IUser
}


const Auth_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined
}


export const AuthProvider:FC<AuthState> = ({ children }) => {

    const [state, dispatch] = useReducer( authReducer , Auth_INITIAL_STATE );

    return (
        <AuthContext.Provider value={{
            ...state,

            //Methods
        }}>
            { children }
        </AuthContext.Provider>
    )
};