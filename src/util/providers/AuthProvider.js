import React, { createContext, useState, useEffect } from "react";
import useAuthApi from "../api/aAuth";
import { setAxiosToken } from "../api/base/aBase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  console.log(isLogged);

  const api = useAuthApi();

  useEffect(() => {
    api.checkToken().then((res) => {
      console.log(res);

      if (!!res.token) {
        setAxiosToken(res.token);
        setIsLogged(true);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged }}>
      {children}
    </AuthContext.Provider>
  );
};
