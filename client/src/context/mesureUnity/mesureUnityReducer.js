import {
    GET_ALL_MESURE_UNITIES,
    GET_MESURE_UNITY,
    ADD_MESURE_UNITY,
    UPDATE_MESURE_UNITY,
    DELETE_MESURE_UNITY
} from '../types';

export default (state, action) => {
    switch(action.type) {
        case GET_ALL_MESURE_UNITIES:
            return {
                ...state,
                mesureUnities: action.payload
            }
        default: 
            return state;
    }
}