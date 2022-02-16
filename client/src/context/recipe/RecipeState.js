import React, { useReducer } from 'react';
import RecipeContext from './recipeContext';
import recipeReducer from './recipeReducer';
import {
  GET_ALL_RECIPES,
  GET_RECIPE,
  ADD_RECIPE,
  UPDATE_RECIPE,
  SET_CURRENT,
  CLEAR_CURRENT,
  DELETE_RECIPE,
  SEARCH_RECIPE,
  CLEAR_FILTER,
} from '../types';
import axios from 'axios';

const RecipeState = (props) => {
  const initialState = {
    recipes: [],
    current: null,
    filtered: null,
  };

  const [state, dispatch] = useReducer(recipeReducer, initialState);

  // Get all recipes by type
  const getAllRecipesByType = async (type) => {
    try {
      const res = await axios.get('/api/recipeTypes');
      const recipeTypeId = res.data.filter(
        (recipeType) => recipeType.name === type
      );

      const allRecipesByType = await axios.get(
        `/api/recipe/${recipeTypeId[0]._id}`
      );
      dispatch({
        type: GET_ALL_RECIPES,
        payload: allRecipesByType.data,
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  // Get recipe by Id
  const getRecipeById = async (id) => {
    try {
      const recipe = await axios.get(`/api/recipe/detail/${id}`);
      dispatch({
        type: GET_RECIPE,
        payload: recipe.data,
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  // Add recipe
  const addRecipe = async (recipe) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      console.log(recipe)
      const addRecipeToDb = await axios.post('/api/recipe', recipe, config);

      recipe.ingredients.map((ingredient) =>
        axios.post('/api/recipeIngredients', ingredient, config)
      );

      dispatch({
        type: ADD_RECIPE,
        payload: recipe,
      });
    } catch (err) {}
  };

  // Update recipe
  const updateRecipe = async (recipe) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try { 
      const res = await axios.put(`/api/recipe/${recipe._id}`, recipe, config);
 
      // await axios.delete(`/api/recipeIngredients/${recipe._id}`);

      // recipe.ingredients.map(ingredient => axios.post('/api/recipeIngredients', ingredient, config));

      dispatch({
        type: UPDATE_RECIPE,
        payload: res.data,
      });
    } catch (err) { 
    }
  };

  // Set current recipe
  const filterRecipes = (search) => {
    dispatch({ type: SEARCH_RECIPE, payload: search });
  };

  // Set current recipe
  const setCurrent = (recipe) => {
    dispatch({ type: SET_CURRENT, payload: recipe });
  };

  // Clear Curret
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Delete Recipe
  const deleteRecipe = async (id) => {
    try {
      await axios.delete(`/api/recipe/${id}`);
      dispatch({
        type: DELETE_RECIPE,
        payload: id,
      });
    } catch (err) {}
  };

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <RecipeContext.Provider
      value={{
        current: state.current,
        recipes: state.recipes,
        filtered: state.filtered,
        getAllRecipesByType,
        getRecipeById,
        deleteRecipe,
        setCurrent,
        clearCurrent,
        addRecipe,
        updateRecipe,
        filterRecipes,
        clearFilter,
      }}
    >
      {props.children}
    </RecipeContext.Provider>
  );
};

export default RecipeState;
