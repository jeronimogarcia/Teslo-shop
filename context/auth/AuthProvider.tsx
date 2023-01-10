import { FC, useReducer } from "react";
import { tesloApi } from "../../api";
import { IUser } from "../../interfaces";
import { AuthContext, authReducer } from "./";
import Cookie from "js-cookie";

export interface AuthState {
  children?: React.ReactNode | undefined;
  isLoggedIn: boolean;
  user?: IUser;
}

const Auth_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

export const AuthProvider: FC<AuthState> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, Auth_INITIAL_STATE);

  const loginUser = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const { data } = await tesloApi.post("user/login", { email, password });
      const { token, user } = data;

      Cookie.set("token", token);

      dispatch({ type: "[Auth] - Login", payload: user });

      return true;

    } catch (error) {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        //Methods
        loginUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
