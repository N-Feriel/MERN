const initialState = {
  clients: null,
  status: "loading",
  error: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_CLIENT_DATA": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "RECEIVE_CLIENT_DATA": {
      return {
        ...state,
        status: "idle",
        clients: [...action.data],
      };
    }

    case "UPDATE_CLIENT_DATA": {
      const updated = state.clients.map((elm) =>
        elm._id === action.item._id ? { ...elm, ...action.item } : { ...elm }
      );

      return {
        ...state,
        status: "idle",
        clients: [...updated],
      };
    }
    case "EMOVE_CLIENT": {
      return {
        ...state,
        clients: state.clients.filter((item) => item._id !== action.item._id),
      };
    }

    case "ECEIVE_CLIENT_DATA_ERROR": {
      return {
        ...state,
        status: "error",
        error: {
          ...state.error,
          error: action.error.message,
        },
      };
    }

    default: {
      return state;
    }
  }
}
