import {
    GET_ALL_RECIPETYPES
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_ALL_RECIPETYPES :
            return {
                ...state,
                types: action.payload
        }
        default: 
            return state;
    }
    
};