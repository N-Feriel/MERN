import { produce } from "immer";

const initialState = {
  userClientsData: null,
  status: "idle",
  error: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_USER_DATA": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "RECEIVE_USER_DATA": {
      return {
        ...state,
        status: "idle",
        userClientsData: [...action.data],
      };
    }

    case "RECEIVE_USER_DATA_ERROR": {
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
