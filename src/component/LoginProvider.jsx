import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const LoginContext = createContext(null);

export function LoginProvider({ children }) {
  const [id, setId] = useState("");
  const [nickName, setNickName] = useState("");
  const [expired, setExpired] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      return;
    }
    login(token);
  }, []);

  // isLoggedIn
  function isLoggedIn() {
    return Date.now() < expired * 1000;
  }

  // 권한 있는 지? 확인
  function hasAccess(param) {
    return id == param;
  }

  // login
  function login(token) {
    localStorage.setItem("token", token);
    const payload = jwtDecode(token);
    setExpired(payload.exp);
    setId(payload.sub);
    setNickName(payload.nickName);
  }
  // logout
  function logout() {
    localStorage.removeItem("token");
    setExpired(0);
    setId("");
    setNickName("");
  }

  return (
    <LoginContext.Provider
      value={{
        id: id,
        nickName: nickName,
        login: login,
        logout: logout,
        isLoggedIn: isLoggedIn,
        hasAccess: hasAccess,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}
