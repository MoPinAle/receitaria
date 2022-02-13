import {
    GET_ALL_INGREDIENTS,
    GET_INGREDIENT,
    GET_INGREDIENT_BY_RECIPE,
    ADD_INGREDIENT,
    UPDATE_INGREDIENT,
    DELETE_INGREDIENT
} from '../types';

export default (state, action) => {
    switch(action.type) {
        case GET_ALL_INGREDIENTS:
            return {
                ...state,
                ingredientsList: action.payload
            }
        default:
            return state;
    }
}