//get actions
export const getListsStart = () => ({
  type: "GET_LISTS_START",
});

export const getListsSuccess = (lists) => ({
  type: "GET_LISTS_SUCCESS",
  payload: lists,
});

export const getListsFailure = () => ({
  type: "GET_LISTS_FAILURE",
});

//Delete actions
export const deleteListsStart = () => ({
  type: "DELETE_START",
});

export const deleteListsSuccess = (id) => ({
  type: "DELETE_SUCCESS",
  payload: id,
});

export const deleteListsFailure = () => ({
  type: "DELETE_FAILURE",
});

//Create actions
export const createListStart = () => ({
  type: "CREATE_START",
});

export const createListSuccess = (list) => ({
  type: "CREATE_SUCCESS",
  payload: list,
});

export const createListFailure = () => ({
  type: "CREATE_FAILURE",
});

//Update actions
export const updateListStart = () => ({
  type: "UPDATE_START",
});

export const updateListSuccess = (list) => ({
  type: "UPDATE_SUCCESS",
  payload: list,
});

export const updateListFailure = () => ({
  type: "UPDATE_FAILURE",
});
