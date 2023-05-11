import axios from "axios";
import {
  getMoviesStart,
  getMoviesSuccess,
  getMoviesFailure,
  deleteMoviesStart,
  deleteMoviesSuccess,
  deleteMoviesFailure,
  createMovieStart,
  createMovieSuccess,
  createMovieFailure,
  updateMoviesStart,
  updateMoviesSuccess,
  updateMoviesFailure,
} from "./MovieActions";

const baseUrl = process.env.REACT_APP_SERVER_URL;

//Get Movies
export const getMovies = async (dispatch) => {
  dispatch(getMoviesStart());
  try {
    const res = await axios.get(baseUrl + "movies/", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getMoviesSuccess(res.data));
  } catch {
    dispatch(getMoviesFailure());
  }
};

//Create Movie
export const createMovie = async (movie, dispatch) => {
  dispatch(createMovieStart());
  try {
    const res = await axios.post(baseUrl + "movies/", movie, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(createMovieSuccess(res.data));
  } catch {
    dispatch(createMovieFailure());
  }
};

//Update Movie
export const updateMovie = async (id, movie, dispatch) => {
  dispatch(updateMoviesStart());
  try {
    const res = await axios.put(baseUrl + "movies/" + id, movie, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(updateMoviesSuccess(res.data));
  } catch {
    dispatch(updateMoviesFailure());
  }
};

//Delete Movie
export const deleteMovie = async (id, dispatch) => {
  dispatch(deleteMoviesStart());
  try {
    await axios.delete(baseUrl + "movies/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteMoviesSuccess(id));
  } catch {
    dispatch(deleteMoviesFailure());
  }
};
