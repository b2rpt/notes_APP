import * as actionTypes from "../actions/actionTypes";

const intialState = {
  notes: [],
  error: false,
};

const notesReducer = (state = intialState, action) => {
  let x = [...state.notes];
  console.log(action);
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

    case actionTypes.UPDATE_NOTES:
      x.find((o, i) => {
        if (o.id === action.payload.id) {
          x[i] = {
            title: action.payload.title,
            body: action.payload.body,
            id: action.payload.id,
          };
          return true; // stop searching
        }
      });
      return {
        ...state,
        notes: [...x],
      };

    default:
      return state;
  }
};

export default notesReducer;
