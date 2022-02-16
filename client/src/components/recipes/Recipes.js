import React, { useContext, useEffect, Fragment } from 'react';
import RecipeContext from '../../context/recipe/recipeContext';

import RecipeItem from '../recipes/RecipeItem';
import RecipeFilter from './RecipeFilter';

const Recipes = () => {
  const recipeType = window.location.pathname.replace('/', '');
  const recipeContext = useContext(RecipeContext);

  const { recipes, getAllRecipesByType, clearCurrent, filtered } =
    recipeContext;

  useEffect(() => {
    getAllRecipesByType(recipeType);
    // eslint-disable-next-line
  }, [recipes]);


  return (
    <Fragment>
      <div className='container content pt-4'>
        <RecipeFilter />
      </div>
      <div className='container mt-4 mb-4 grid-2 content'>
        {filtered !== null
          ? filtered.map((recipe) => (
              <RecipeItem key={recipe._id} recipe={recipe} />
            ))
          : recipes.map((recipe) => (
              <RecipeItem key={recipe._id} recipe={recipe} />
            ))}
      </div>
    </Fragment>
  );
};

export default Recipes;
