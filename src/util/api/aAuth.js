import { axiosBase } from "./base/aBase";

export default function useAuthApi() {
  async function signUp(data) {
    try {
      const response = await axiosBase.post("auth/sign-up", data);
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  async function signIn(data) {
    try {
      const response = await axiosBase.post("auth/sign-in", data);
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  async function checkToken() {
    try {
      const response = await axiosBase.get("auth/check-token");
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  return { signUp, signIn, checkToken };
}
