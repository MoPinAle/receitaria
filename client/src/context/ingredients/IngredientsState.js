import React, { useReducer } from 'react';
import axios from 'axios';
import IngredientsContext from './ingredientsContext';
import ingredientsReducer from './ingredientsReducer';
import { GET_ALL_INGREDIENTS } from '../types';

const IngredientsState = props => {
    const initialState = {
        ingredientsList: [],
        currentIngredient: null
    };

    const [state, dispatch] = useReducer(ingredientsReducer, initialState);

    // Get all ingredients
    const getAllIngredients = async () => {
        try {
            const res = await axios.get('/api/ingredients');
            dispatch({
                type: GET_ALL_INGREDIENTS,
                payload: res.data
            })
        } catch(err) {

        }
    }

    return (
        <IngredientsContext.Provider
            value={{
                ingredientsList: state.ingredientsList,
                getAllIngredients
            }}
        >
            {props.children}
        </IngredientsContext.Provider>
    )
}

export default IngredientsState;