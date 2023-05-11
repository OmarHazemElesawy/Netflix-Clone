//Get actions
export const getMoviesStart = () => ({
  type: "MOVIES_START",
});

export const getMoviesSuccess = (movies) => ({
  type: "MOVIES_SUCCESS",
  payload: movies,
});

export const getMoviesFailure = () => ({
  type: "MOVIES_FAILURE",
});

//Create actions
export const createMovieStart = () => ({
  type: "CREATE_START",
});

export const createMovieSuccess = (movie) => ({
  type: "CREATE_SUCCESS",
  payload: movie,
});

export const createMovieFailure = () => ({
  type: "CREATE_FAILURE",
});

//Delete action
export const deleteMoviesStart = () => ({
  type: "DELETE_START",
});

export const deleteMoviesSuccess = (id) => ({
  type: "DELETE_SUCCESS",
  payload: id,
});

export const deleteMoviesFailure = () => ({
  type: "DELETE_FAILURE",
});

//Update action
export const updateMoviesStart = () => ({
  type: "UPDATE_START",
});

export const updateMoviesSuccess = (movie) => ({
  type: "UPDATE_SUCCESS",
  payload: movie,
});

export const updateMoviesFailure = () => ({
  type: "UPDATE_FAILURE",
});
