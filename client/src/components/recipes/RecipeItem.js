import React, { useContext, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeContext from '../../context/recipe/recipeContext';
import PropTypes from 'prop-types';

const RecipeItem = ({ recipe }) => {
  const recipeContext = useContext(RecipeContext);

  let history = useHistory();

  const { deleteRecipe, setCurrent, updateRecipe } = recipeContext; 
  
  const onDelete = (e) => {
    deleteRecipe(e.target.value);
  };

  const onDetail = (e) => {
    setCurrent(e);
    history.push('/recipeDetails');
  };

  const onEdit = (e) => {
    setCurrent(e);
    history.push('/editRecipe');
  };

  const setFavorite = () => {  
    let content = {
      ...recipe,
      favorite: !recipe.favorite,
    }
    updateRecipe(content);
  };

  return (
    <Fragment>
      <div className='card mb-2 mb-md-0'>
        <img src={recipe.photo} className='card-img-top p-1' alt='' />
        <div className='card-body'>
          <h3 className='card-title sloganTitle'>{recipe.name}</h3>
          <p>{recipe.description}</p>
        </div>
        <div className='text-right'>
          {recipe.favorite === true ? (
              <i
                className='fad fa-hat-chef fa-2x recipe-favorite mr-3'
                onClick={() => setFavorite()}
              ></i>
            ) : (
              <i
                className='fad fa-hat-chef fa-2x text-muted mr-3'
                onClick={() => setFavorite()}
              ></i>
            )}
        </div>
        <div className='d-flex align-items-center bg-light py-1'>
          <button
            className='btn btn-sm btn-light border mr-auto ml-2'
            onClick={() => onDetail(recipe)}
          >
            <i className='fas fa-search-plus'></i> Detail
          </button>
          <button
            className='btn btn-sm btn-light border'
            onClick={() => onEdit(recipe)}
          >
            <i className='fad fa-edit'></i> Edit
          </button>
          <button
            className='btn btn-sm btn-light border text-danger mx-1'
            onClick={onDelete}
            value={recipe._id}
          >
            <i className='fas fa-minus-circle'></i> Delete
          </button>
        </div>
      </div>
    </Fragment>
  );
};

RecipeItem.propTypes = {
  recipe: PropTypes.object.isRequired,
};

export default RecipeItem;
