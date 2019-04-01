import {
  SET_RIFTS,
  LIKE_RIFT,
  UNLIKE_RIFT,
  LOADING_DATA,
  DELETE_RIFT
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
    case LIKE_RIFT:
    case UNLIKE_RIFT:
      let index = state.rifts.findIndex(
        rift => rift.riftId === action.payload.riftId
      );
      state.rifts[index] = action.payload;
      return {
        ...state
      };
    case DELETE_RIFT:
      index = state.rifts.findIndex(rift => rift.riftId === action.payload);
      state.rifts.splice(index, 1);
      return {
        ...state
      };
    default:
      return state;
  }
}
