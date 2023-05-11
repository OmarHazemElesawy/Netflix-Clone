import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";
const baseUrl = process.env.REACT_APP_SERVER_URL;

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(baseUrl + "auth/login", user);
    if(res.data.info.Admin)  {
      dispatch(loginSuccess(res.data));
    }
    else dispatch(loginFailure("you are not an admin, you can't login"));
  } catch {
    dispatch(loginFailure("wrong email or password"));
  }
};
