import React, { useContext, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeContext from '../../context/recipe/recipeContext';

const RecipeFilter = () => {
  const contactContext = useContext(RecipeContext);
  const text = useRef('');
  let history = useHistory();

  const { filterRecipes, clearFilter, clearCurrent, filtered } = contactContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterRecipes(e.target.value);
    } else {
      clearFilter();
    }
  };

  const onClick = () => {
    clearCurrent();
    history.push('/addRecipe');
  };

  return (
    <form>
      <div className='input-group mb-3'>
        <input
          ref={text}
          type='text'
          className='form-control'
          aria-label="Recipient's username"
          aria-describedby='button-addon2'
          placeholder='Filter Recipes...'
          onChange={onChange}
        />
        <div className='input-group-append'>
          <button
            className='btn bg-btn text-white'
            type='button'
            id='button-addon2'
            onClick={() => onClick()}
          >
            Add New Recipe
          </button>
        </div>
      </div>
    </form>
  );
};

export default RecipeFilter;
