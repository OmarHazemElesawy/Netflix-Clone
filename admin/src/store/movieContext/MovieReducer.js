const MovieReducer = (state, action) => {
  switch (action.type) {
    case "MOVIES_START":
      return {
        movies: [],
        isFetching: true,
        error: false,
      };
    case "MOVIES_SUCCESS":
      return {
        movies: action.payload,
        isFetching: false,
        error: false,
      };
    case "MOVIES_FAILURE":
      return {
        movies: [],
        isFetching: false,
        error: true,
      };
    case "CREATE_START":
      return {
        movies: state.movies,
        isFetching: true,
        error: false,
      };
    case "CREATE_SUCCESS":
      return {
        movies: [...state.movies, action.payload],
        isFetching: false,
        error: false,
      };
    case "CREATE_FAILURE":
      return {
        movies: state.movies,
        isFetching: false,
        error: true,
      };
    case "DELETE_START":
      return {
        movies: state.movies,
        isFetching: true,
        error: false,
      };
    case "DELETE_SUCCESS":
      return {
        movies: state.movies.filter((movie) => movie._id !== action.payload),
        isFetching: false,
        error: false,
      };
    case "DELETE_FAILURE":
      return {
        movies: state.movies,
        isFetching: false,
        error: true,
      };
    case "UPDATE_START":
      return {
        movies: state.movies,
        isFetching: true,
        error: false,
      };
    case "UPDATE_SUCCESS":
      return {
        movies: state.movies.map((movie) =>
          movie._id === action.payload._id ? action.payload : movie
        ),
        isFetching: false,
        error: false,
      };
    case "UPDATE_FAILURE":
      return {
        movies: state.movies,
        isFetching: false,
        error: true,
      };

    default:
      return { ...state };
  }
};

export default MovieReducer;
