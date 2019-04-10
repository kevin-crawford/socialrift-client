import {
  SET_RIFTS,
  LOADING_DATA,
  LIKE_RIFT,
  POST_RIFT,
  UNLIKE_RIFT,
  DELETE_RIFT,
  LOADING_UI,
  STOP_LOADING_UI,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_RIFT,
  SUBMIT_COMMENT
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
export const getRift = riftId => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/rift/${riftId}`)
    .then(res => {
      dispatch({
        type: SET_RIFT,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => console.log(err));
};
// Post a Rift
export const postRift = newRift => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/rift", newRift)
    .then(res => {
      dispatch({
        type: POST_RIFT,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
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
// submit a comment
export const submitComment = (riftId, commentData) => dispatch => {
  axios
    .post(`/rift/${riftId}/comment`, commentData)
    .then(res => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const deleteRift = riftId => dispatch => {
  axios
    .delete(`/rift/${riftId}`)
    .then(() => {
      dispatch({ type: DELETE_RIFT, payload: riftId });
    })
    .catch(err => console.log(err));
};

export const getUserData = userHandle => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then(res => {
      dispatch({
        type: SET_RIFTS,
        payload: res.data.rifts
      });
    })
    .catch(() => {
      dispatch({
        type: SET_RIFTS,
        payload: null
      });
    });
};

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};
