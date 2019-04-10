import {
  SET_RIFTS,
  SET_RIFT,
  LIKE_RIFT,
  UNLIKE_RIFT,
  LOADING_DATA,
  DELETE_RIFT,
  POST_RIFT,
  SUBMIT_COMMENT
} from "../types";

const initialState = {
  rifts: [],
  rift: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_RIFTS:
      return {
        ...state,
        rifts: action.payload,
        loading: false
      };
    case SET_RIFT:
      return {
        ...state,
        rift: action.payload
      };
    case LIKE_RIFT:
    case UNLIKE_RIFT:
      let index = state.rifts.findIndex(
        rift => rift.riftId === action.payload.riftId
      );
      state.rifts[index] = action.payload;
      if (state.rift.riftId === action.payload.riftId) {
        state.rift = action.payload;
      }
      return {
        ...state
      };
    case DELETE_RIFT:
      index = state.rifts.findIndex(rift => rift.riftId === action.payload);
      state.rifts.splice(index, 1);
      return {
        ...state
      };
    case POST_RIFT:
      return {
        ...state,
        rifts: [action.payload, ...state.rifts]
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        rift: {
          ...state.rift,
          comments: [action.payload, ...state.rift.comments]
        }
      };
    default:
      return state;
  }
}
