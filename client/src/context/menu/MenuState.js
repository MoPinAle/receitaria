import React, { useReducer } from 'react';
import axios from 'axios';

import MenuContext from './menuContext';
import menuReducer from './menuReducer';
import {
    GET_ALL_RECIPETYPES
} from '../types';

const MenuState = props => {
    const initialState = {
        types: []
    }

const [state, dispatch] = useReducer(menuReducer, initialState);

// Get all Recipe Types 
const getAllRecipeTypes = async () => {
    try {
        const res = await axios.get('/api/recipeTypes');
        dispatch({
            type: GET_ALL_RECIPETYPES,
            payload: res.data
        })
    } catch(err) {
        console.error(err.message);
    }
}

return (
    <MenuContext.Provider
        value={{
            types: state.types,
            getAllRecipeTypes
        }}
    >
        { props.children }
    </MenuContext.Provider>
)
}

export default MenuState;