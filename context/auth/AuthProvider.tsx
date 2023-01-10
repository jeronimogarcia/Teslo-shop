import { FC, useReducer } from "react";
import { tesloApi } from "../../api";
import { IUser } from "../../interfaces";
import { AuthContext, authReducer } from "./";
import Cookie from "js-cookie";
import axios from "axios";

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

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<{hasError: boolean; message?: string}> => {
    try {
      const { data } = await tesloApi.post("user/register", {
        name,
        email,
        password,
      });
      const { token, user } = data;
      Cookie.set("token", token);
      dispatch({ type: "[Auth] - Login", payload: user });
      return {
        hasError: false
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message
        }
      }
      return {
        hasError: true,
        message: 'No se pudo crear el usuario - intente de nuevo'
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        //Methods
        loginUser,
        registerUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
