import React, { useState, useContext, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';

import RecipeContext from '../../context/recipe/recipeContext';
import MenuContext from '../../context/menu/menuContext';

const RecipeForm = () => {
  const recipeContext = useContext(RecipeContext);
  const menuContext = useContext(MenuContext);
  let history = useHistory();

  const { current, addRecipe, updateRecipe } = recipeContext;

  const { types, getAllRecipeTypes } = menuContext;

  useEffect(() => {
    getAllRecipeTypes();

    if (current !== null) {
      setRecipe(current);
    } else {
      setRecipe({
        type: '',
        name: '',
        description: '',
        ingredients: '',
        photo: '',
        prepareMode: '',
        prepareTime: '',
        author: '',
        serves: '',
        favorite: false,
      });
    }
  }, [recipeContext, current]);

  const [page, setPage] = useState('');
  const [recipe, setRecipe] = useState({
    type: '',
    name: '',
    description: '',
    ingredients: '',
    photo: '',
    prepareMode: '',
    prepareTime: '',
    author: '',
    serves: '',
    favorite: false,
  });

  const {
    name,
    description,
    ingredients,
    photo,
    prepareMode,
    prepareTime,
    author,
    serves,
    favorite,
  } = recipe;

  const onChange = (e) => {
    if (e.target.type === 'select-one')
      setPage(types.find((x) => x._id === e.target.value).name);

    let value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setRecipe({ ...recipe, [e.target.name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addRecipe(recipe);
    } else {
      updateRecipe(recipe);
    }
    setRecipe({
      type: '',
      name: '',
      description: '',
      ingredients: '',
      photo: '',
      prepareMode: '',
      prepareTime: '',
      author: '',
      serves: '',
      favorite: false,
    });
    history.push(`/${page}`);
  };

  return (
    <form onSubmit={onSubmit} className='content pt-4'>
      <div className='container-fluid body-none'>
        <h1 className='text-center pt-4 titleForm'>
          {current !== null ? 'Update ' : 'Add '}
          Recipe
        </h1>
        {current === null && (
          <div className='form-group'>
            <label htmlFor=''>Recipe Type:</label>
            <select
              name='type'
              id='type'
              className='custom-select'
              onChange={onChange}
              defaultValue={'DEFAULT'}
            >
              <option value='DEFAULT'>Choose</option>
              {types.map((type) => (
                <option key={type._id} value={type._id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className='form-group'>
          <label htmlFor='recipeName'>Recipe Name: </label>
          <input
            name='name'
            value={name}
            type='text'
            className='form-control'
            id='recipeName'
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='recipeDescription'>Recipe Description: </label>
          <textarea
            name='description'
            id='recipeDescription'
            cols='30'
            rows='3'
            value={description}
            onChange={onChange}
            className='form-control'
          >
            {description}
          </textarea>
        </div>

        <div className='form-group'>
          <label htmlFor='photo'>Photo: </label>
          <input
            name='photo'
            value={photo}
            type='text'
            className='form-control'
            id='photo'
            onChange={onChange}
          />
          <span className='text-muted'>
            ex.: https://images.unsplash.com/photo-1611497438246-dcbb383de3c4
          </span>
        </div>
        {photo && <img src={photo} className='w-25' />}

        <div className='form-group mt-3'>
          <label htmlFor='ingredients'>Ingredients: </label>
          <textarea
            name='ingredients'
            id='ingredients'
            cols='30'
            rows='5'
            value={ingredients}
            className='form-control'
            onChange={onChange}
          >
            {ingredients}
          </textarea>
        </div>

        <div className='form-group mt-3'>
          <label htmlFor='prepareMode'>Prepare Mode: </label>
          <textarea
            name='prepareMode'
            id='prepareMode'
            cols='30'
            rows='5'
            value={prepareMode}
            className='form-control'
            onChange={onChange}
          >
            {prepareMode}
          </textarea>
        </div>
        <div className='row'>
          <div className='col'>
            <div className='form-group'>
              <label htmlFor='prepareTime'>Prepare Time: </label>
              <input
                name='prepareTime'
                value={prepareTime}
                type='time'
                id='prepareTime'
                className='form-control'
                onChange={onChange}
              />
            </div>
          </div>
          <div className='col'>
            <label htmlFor='author'>Author: </label>
            <input
              name='author'
              value={author}
              type='text'
              id='author'
              className='form-control'
              onChange={onChange}
            />
          </div>
          <div className='col'>
            <div className='row'>
              <div className='col'>
                <div className='form-group text-right'>
                  <label htmlFor='serve'>Serves: </label>
                  <input
                    name='serves'
                    value={serves}
                    type='number'
                    min='0'
                    className='form-control'
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className='col p-0'>
                <p className='pt-5'>{serves > 1 ? 'people' : 'person'}</p>
              </div>
            </div>
          </div>
          <div className='col text-center'>
            <label htmlFor='favorite'>Favorite: </label>
            <br />
            <div className='custom-control custom-switch'>
              <input
                type='checkbox'
                className='custom-control-input'
                name='favorite'
                id='favorite'
                onChange={onChange}
                checked={favorite}
              />
              <label
                className='custom-control-label'
                htmlFor='favorite'
              ></label>
            </div>
          </div>
        </div>
        <input
          type='submit'
          value='Save Recipe'
          className='btn bg-btn btn-block text-white mt-3 p-3'
        />
      </div>
    </form>
  );
};

export default RecipeForm;
