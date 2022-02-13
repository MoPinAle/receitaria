import {
  GET_ALL_RECIPES,
  GET_RECIPE,
  ADD_RECIPE,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_RECIPE,
  DELETE_RECIPE,
  SEARCH_RECIPE,
  CLEAR_FILTER,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return {
        ...state,
        recipes: action.payload,
      };
    case ADD_RECIPE:
      return {
        ...state,
        recipes: [action.payload, ...state.recipes],
      };
    case GET_RECIPE:
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case UPDATE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.map((recipe) =>
          recipe._id === action.payload._id ? action.payload : recipe
        ),
        current: null,
      };
    case DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter(
          (recipe) => recipe._id !== action.payload
        ),
      };
    case SEARCH_RECIPE:
      return {
        ...state,
        filtered: state.recipes.filter((recipe) =>
          recipe.name.toLowerCase().includes(action.payload)
        ),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    default:
      return state;
  }
};
