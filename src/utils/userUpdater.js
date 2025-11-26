import jwtDecode from "jwt-decode";

let externalSetUser = null;

export const setUserSetter = (fn) => {
  externalSetUser = fn;
};

export const updateUserFromToken = (token) => {
  if (!externalSetUser) return;
  const decoded = jwtDecode(token);
  console.log("Update", decoded);
  externalSetUser({
    email: decoded.sub,
    nickname: decoded.nickname,
    role: decoded.role,
  });
};
