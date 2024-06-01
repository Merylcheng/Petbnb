import sendRequest from "./send-request";
const BASE_URL = "/api/users";

export async function loginSitter(sitterData) {
  return sendRequest(`${BASE_URL}/sitter-login`, "POST", sitterData);
}

export async function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);
}
