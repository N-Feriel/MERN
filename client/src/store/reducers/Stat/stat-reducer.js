import { produce } from "immer";

const initialState = {
  stats: [],

  statVolenteers: [],
  statClients: [],
  statOneToOne: [],

  status: "idle",
  error: null,
};

export default function statReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_STAT_DATA": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "RECEIVE_STAT_DATA": {
      return {
        ...state,
        status: "idle",
        stats: [...action.data],
      };
    }
    case "RECEIVE_STAT_ONETOONE_DATA": {
      return {
        ...state,
        status: "idle",
        statOneToOne: [...action.data],
      };
    }

    case "RECEIVE_STAT_VOLENTEER_DATA": {
      return {
        ...state,
        status: "idle",
        statVolenteers: [...action.data],
      };
    }
    case "RECEIVE_STAT_CLIENT_DATA": {
      return {
        ...state,
        status: "idle",
        statClients: [...action.data],
      };
    }

    case "UPDATE_STAT_DATA": {
      return produce(state, (draftState) => {
        const { item } = action;
        draftState[item._id] = item;
      });
    }

    case "REMOVE_STAT": {
      return {
        ...state,
        stats: state.stats.filter((item) => item._id !== action.item._id),
      };
    }

    case "RECEIVE_STAT_ERROR": {
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
