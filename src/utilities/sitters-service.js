import debug from "debug";
import * as sittersAPI from "./sitters-api";

const log = debug("mern:utilities:sitters-service");

export function getToken() {
  const token = localStorage.getItem("sitter-token");
  if (!token) return null;
  const payload = JSON.parse(atob(token.split(".")[1]));
  if (payload.exp < Date.now() / 1000) {
    localStorage.removeItem("sitter-token");
    return null;
  }
  return token;
}

export function getSitter() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split(".")[1])).sitter : null;
}

export const loginSitter = async (email, password) => {
  log("%s, %s", email, password);
  const sitter = { email, password };

  const token = await sittersAPI.loginSitter(sitter);
  log("token: %o", token);

  localStorage.setItem("sitter-token", token);
  return getSitter();
};

export const checkToken = async () => {
  const dateStr = await sittersAPI.checkToken();
  return new Date(dateStr);
};
