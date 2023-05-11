import axios from "axios";
import {
  getListsStart,
  getListsSuccess,
  getListsFailure,
  deleteListsStart,
  deleteListsSuccess,
  deleteListsFailure,
  createListStart,
  createListSuccess,
  createListFailure,
  updateListStart,
  updateListSuccess,
  updateListFailure,
} from "./ListActions";

const baseUrl = process.env.REACT_APP_SERVER_URL;

//Get Lists
export const getLists = async (dispatch) => {
  dispatch(getListsStart());
  try {
    const res = await axios.get(baseUrl + "lists/", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getListsSuccess(res.data));
  } catch {
    dispatch(getListsFailure());
  }
};

//Delete List
export const deleteList = async (id, dispatch) => {
  dispatch(deleteListsStart());
  try {
    await axios.delete(baseUrl + "lists/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteListsSuccess(id));
  } catch {
    dispatch(deleteListsFailure());
  }
};

//Update List
export const updateList = async (id, list, dispatch) => {
  dispatch(updateListStart());
  try {
    const res = await axios.put(baseUrl + "lists/" + id, list, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(updateListSuccess(res.data));
  } catch {
    dispatch(updateListFailure());
  }
};

//Create List
export const createList = async (list, dispatch) => {
  dispatch(createListStart());
  try {
    const res = await axios.post(baseUrl + "lists/", list, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(createListSuccess(res.data));
  } catch {
    dispatch(createListFailure());
  }
};
