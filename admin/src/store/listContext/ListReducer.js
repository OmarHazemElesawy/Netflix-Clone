const ListReducer = (state, action) => {
  switch (action.type) {
    case "GET_LISTS_START":
      return {
        lists: [],
        isFetching: true,
        error: false,
      };
    case "GET_LISTS_SUCCESS":
      return {
        lists: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_LISTS_FAILURE":
      return {
        lists: [],
        isFetching: false,
        error: true,
      };

    case "DELETE_START":
      return {
        lists: state.lists,
        isFetching: true,
        error: false,
      };
    case "DELETE_SUCCESS":
      return {
        lists: state.lists.filter((list) => list._id !== action.payload),
        isFetching: false,
        error: false,
      };
    case "DELETE_FAILURE":
      return {
        lists: state.lists,
        isFetching: false,
        error: true,
      };

    case "CREATE_START":
      return {
        lists: state.lists,
        isFetching: true,
        error: false,
      };
    case "CREATE_SUCCESS":
      return {
        lists: [...state.lists, action.payload],
        isFetching: false,
        error: false,
      };
    case "CREATE_FAILURE":
      return {
        lists: state.lists,
        isFetching: false,
        error: true,
      };

    case "UPDATE_START":
      return {
        lists: state.lists,
        isFetching: true,
        error: false,
      };
    case "UPDATE_SUCCESS":
      return {
        lists: state.lists.map((list) =>
          list._id === action.payload._id ? action.payload : list
        ),
        isFetching: false,
        error: false,
      };
    case "UPDATE_FAILURE":
      return {
        lists: state.lists,
        isFetching: false,
        error: true,
      };

    default:
      return { ...state };
  }
};

export default ListReducer;
