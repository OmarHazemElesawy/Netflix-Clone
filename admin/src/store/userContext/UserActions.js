//Get Users
export const getUsersStart = () => {
  return {
    type: "GET_USERS_START",
  };
};
export const getUsersSuccess = (users) => {
  return {
    type: "GET_USERS_SUCCESS",
    payload: users,
  };
};

export const getUsersFailure = () => {
  return {
    type: "GET_USERS_FAILURE",
  };
};

//Create User
export const createUserStart = () => {
  return {
    type: "CREATE_START",
  };
};
export const createUserSuccess = (user) => {
  return {
    type: "CREATE_SUCCESS",
    payload: user,
  };
};

export const createUserFailure = () => {
  return {
    type: "CREATE_FAILURE",
  };
};

//Delete User
export const deleteUserStart = () => {
  return {
    type: "DELETE_START",
  };
};
export const deleteUserSuccess = (id) => {
  return {
    type: "DELETE_SUCCESS",
    payload: id,
  };
};

export const deleteUserFailure = () => {
  return {
    type: "DELETE_FAILURE",
  };
};

//Update User
export const updateUserStart = () => {
  return {
    type: "UPDATE_START",
  };
};
export const updateUserSuccess = (user) => {
  return {
    type: "UPDATE_SUCCESS",
    payload: user,
  };
};

export const updateUserFailure = () => {
  return {
    type: "UPDATE_FAILURE",
  };
};
