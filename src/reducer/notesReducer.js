import * as actionTypes from "../actions/actionTypes";

const intialState = {
  notes: [],
  error: false,
};

const notesReducer = (state = intialState, action) => {
  let x = [...state.notes];
  switch (action.type) {
    case actionTypes.ADD_NOTES:
      x.push(action.payload);
      return {
        ...state,
        notes: [...x],
      };

    case actionTypes.REMOVE_NOTES:
      let id = action.payload;
      return {
        ...state,
        notes: [
          ...x.filter((f) => {
            return f.id !== id.id;
          }),
        ],
      };

    default:
      return state;
  }
};

export default notesReducer;
