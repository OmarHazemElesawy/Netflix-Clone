const UserReducer = (state, action) => {
  switch (action.type) {
    case "GET_USERS_START":
      return {
        users: [],
        isFetching: true,
        error: false,
      };
    case "GET_USERS_SUCCESS":
      return {
        users: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_USERS_FAILURE":
      return {
        users: [],
        isFetching: false,
        error: true,
      };
    case "CREATE_START":
      return {
        users: state.users,
        isFetching: true,
        error: false,
      };
    case "CREATE_SUCCESS":
      return {
        users: [...state.users, action.payload],
        isFetching: false,
        error: false,
      };
    case "CREATE_FAILURE":
      return {
        users: state.users,
        isFetching: false,
        error: true,
      };
    case "DELETE_START":
      return {
        users: state.users,
        isFetching: true,
        error: false,
      };
    case "DELETE_SUCCESS":
      return {
        users: state.users.filter((user) => user._id !== action.payload),
        isFetching: false,
        error: false,
      };
    case "DELETE_FAILURE":
      return {
        users: state.users,
        isFetching: false,
        error: true,
      };
    case "UPDATE_START":
      return {
        users: state.users,
        isFetching: true,
        error: false,
      };
    case "UPDATE_SUCCESS":
      return {
        users: state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        ),
        isFetching: false,
        error: false,
      };
    case "UPDATE_FAILURE":
      return {
        users: state.users,
        isFetching: false,
        error: true,
      };
    default:
      return { ...state };
  }
};

export default UserReducer;
