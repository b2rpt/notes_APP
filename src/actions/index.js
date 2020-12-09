import * as actionTypes from "./actionTypes";

export const addNotes = (payload) => ({
  type: actionTypes.ADD_NOTES,
  payload,
});

export const removeNotes = (payload) => ({
  type: actionTypes.REMOVE_NOTES,
  payload,
});

export const updateNotes = (payload) => ({
  type: actionTypes.UPDATE_NOTES,
  payload,
});
