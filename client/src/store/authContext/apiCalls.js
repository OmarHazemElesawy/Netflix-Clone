import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";
export const login = async (user, dispatch) => {
  const loginUrl =  process.env.REACT_APP_BASE_URL + "/auth/login";
  dispatch(loginStart());
  try {
    console.log("loginUrl",loginUrl)
    const res = await axios.post(loginUrl, user);
    dispatch(loginSuccess(res.data));
  } catch {
    dispatch(loginFailure("wrong email or password"));
  }
};

