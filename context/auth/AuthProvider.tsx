import { FC, useEffect, useReducer } from "react";
import { AuthContext, authReducer } from "./";
import axios from "axios";
import Cookies from "js-cookie";
import { tesloApi } from "../../api";
import { IUser } from "../../interfaces";
import { useRouter } from "next/router";
import { useSession, signOut } from 'next-auth/react'

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
  const router = useRouter()
  const { data, status } = useSession()

  const checkToken = async () => {
    if (!Cookies.get("token")) {
      return;
    }

    try {
      const { data } = await tesloApi.get("user/validate-token");
      const { token, user } = data;
      Cookies.set("token", token);
      dispatch({ type: "[Auth] - Login", payload: user });
    } catch (error) {
      Cookies.remove("token");
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {

    console.log({user: data?.user})
    dispatch({type: '[Auth] - Login', payload: data?.user as IUser})
    }
    
  }, [status, data])
  

  // useEffect(() => {
  //   checkToken();
  // }, []);

  const loginUser = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const { data } = await tesloApi.post("user/login", { email, password });
      const { token, user } = data;

      Cookies.set("token", token);

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
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = await tesloApi.post("user/register", {
        name,
        email,
        password,
      });
      const { token, user } = data;
      Cookies.set("token", token);
      dispatch({ type: "[Auth] - Login", payload: user });
      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }
      return {
        hasError: true,
        message: "No se pudo crear el usuario - intente de nuevo",
      };
    }
  };

  const logout = () => {
    Cookies.remove('cart')
    Cookies.remove("lastName");
    Cookies.remove("address");
    Cookies.remove("firstName");
    Cookies.remove("address2");
    Cookies.remove("zip");
    Cookies.remove("city");
    Cookies.remove("country");
    Cookies.remove("phone");

    signOut()
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        //Methods
        loginUser,
        registerUser,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
