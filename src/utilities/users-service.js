import debug from "debug";
import * as usersAPI from "./users-api";

const log = debug("mern:utilities:users-service");

export function getToken() {
  // getItem returns null if there's no string
  const token = localStorage.getItem("token");
  if (!token) return null;
  // Obtain the payload of the token
  const payload = JSON.parse(atob(token.split(".")[1]));
  // A JWT's exp is expressed in seconds, not milliseconds, so convert
  if (payload.exp < Date.now() / 1000) {
    // Token has expired - remove it from localStorage
    localStorage.removeItem("token");
    return null;
  }
  return token;
}

export function getUser() {
  const token = getToken();
  // If there's a token, return the user in the payload, otherwise return null
  return token ? JSON.parse(atob(token.split(".")[1])).user : null;
}

// export function getToken() {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     // Token doesn't exist in localStorage
//     return null;
//   }

//   const tokenParts = token.split(".");

//   if (tokenParts.length !== 3) {
//     // Token doesn't have three parts (header, payload, signature)
//     console.error("Invalid token format");
//     return null;
//   }

//   try {
//     const payload = JSON.parse(atob(tokenParts[1]));
//     // Check token expiration
//     if (payload.exp && payload.exp < Date.now() / 1000) {
//       // Token has expired
//       console.warn("Token has expired");
//       localStorage.removeItem("token");
//       return null;
//     }
//     return token;
//   } catch (error) {
//     console.error("Error decoding token:", error.message);
//     return null;
//   }
// }

// export function getUser() {
//   const token = getToken();

//   if (!token) {
//     return null;
//   }

//   try {
//     const payload = JSON.parse(atob(token.split(".")[1]));
//     return payload.user || null;
//   } catch (error) {
//     console.error("Error decoding user from token:", error.message);
//     return null;
//   }
// }

export const signUp = async (userData) => {
  log("userData: %o", userData);

  const token = await usersAPI.signUp(userData);
  log("token: %o", token);

  localStorage.setItem("token", token);
  return getUser();
};

export const logOut = () => {
  localStorage.removeItem("token");
};

export const login = async (email, password) => {
  log("%s, %s", email, password);
  const user = { email, password };

  const token = await usersAPI.login(user);
  log("token: %o", token);

  localStorage.setItem("token", token);
  return getUser();
};

export const checkToken = async () => {
  const dateStr = await usersAPI.checkToken();
  return new Date(dateStr);
};
