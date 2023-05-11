export const loginStart = () => ({
  type: "LOGIN_START",
});

export const loginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const loginFailure = (message) => ({
  type: "LOGIN_FAILURE",
  payload: message,
});

export const logout = () => ({
  type: "LOGOUT",
});
