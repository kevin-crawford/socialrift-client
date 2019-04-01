import {
  SET_RIFTS,
  LOADING_DATA,
  LIKE_RIFT,
  UNLIKE_RIFT,
  DELETE_RIFT
} from "../types";
import axios from "axios";

// get all rifts
export const getRifts = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/rifts")
    .then(res => {
      dispatch({
        type: SET_RIFTS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_RIFTS,
        payload: []
      });
    });
};

// Like A Rift
export const likeRift = riftId => dispatch => {
  axios
    .get(`/rift/${riftId}/like`)
    .then(res => {
      dispatch({
        type: LIKE_RIFT,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// Unlike A Rift
export const unlikeRift = riftId => dispatch => {
  axios
    .get(`/rift/${riftId}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_RIFT,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const deleteRift = riftId => dispatch => {
  axios
    .delete(`/rift/${riftId}`)
    .then(() => {
      dispatch({ type: DELETE_RIFT, payload: riftId });
    })
    .catch(err => console.log(err));
};
