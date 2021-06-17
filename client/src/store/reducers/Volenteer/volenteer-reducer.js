const initialState = {
  volenteers: null,
  status: "loading",
  error: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_VOLENTEER_DATA": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "RECEIVE_VOLENTEER_DATA": {
      return {
        ...state,
        status: "idle",
        volenteers: [...action.data],
      };
    }

    case "UPDATE_VOLENTEER_DATA": {
      const updated = state.volenteers.map((elm) =>
        elm._id === action.item._id ? { ...elm, ...action.item } : { ...elm }
      );

      return {
        ...state,
        status: "idle",
        volenteers: [...updated],
      };
    }

    case "REMOVE_VOLENTEER": {
      return {
        ...state,
        volenteers: state.volenteers.filter(
          (item) => item._id !== action.item._id
        ),
      };
    }

    case "RECEIVE_VOLENTEER_DATA_ERROR": {
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
