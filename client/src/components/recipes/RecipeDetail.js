import React, { useState, useContext, useEffect, Fragment } from 'react';

import RecipeContext from '../../context/recipe/recipeContext';

const RecipeDetail = (props) => {
  const recipeContext = useContext(RecipeContext);

  const { current, updateRecipe } = recipeContext;

  const [detail, setDetail] = useState({
    type: '',
    name: '',
    description: '',
    photo: '',
    ingredients: '',
    prepareTime: '',
    prepareMode: '',
    author: '',
    serves: '',
    favorite: false
  });
  useEffect(() => {
    if (current !== null && !detail.favorite) {
      setDetail(current);
    }
    // eslint-disable-next-line
  }, []);

  const setFavorite = () => { 
    let content = {
      ...detail,
      favorite: !detail.favorite,
    }
    setDetail(content); 
    updateRecipe(content);
  };

  return (
    <Fragment>
      <div className='container-fluid pt-4 content'>
        <div className='row'>
          <div className='col-md-6'>
            <img
              src={detail.photo}
              className='img-thumbnail img-fluid rounded'
              alt=''
            />
          </div>
          <div className='col-md-6'>
            {detail.favorite === true ? (
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
            <span className='recipe-title'>{detail.name}</span>
            <p>{detail.description}</p>
          </div>
        </div>
        <div className='row d-flex flex-md-row flex-column-reverse'>
          <div className='col-md-6 pt-3 new-break-line'>
            <strong>
              <span className='step'>Ingredients</span>
            </strong>
            <br />
            {detail.ingredients}
          </div>
          <div className='col-md-6'>
            <ul className='list-group list-group-flush'>
              <li className='list-group-item'>
                <strong>Author:</strong> {detail.author}
              </li>
              <li className='list-group-item'>
                <strong>Prepare Time:</strong> {detail.prepareTime}
              </li>
              <li className='list-group-item'>
                <strong>Serves:</strong> {detail.serves}{' '}
                {detail.serves > 1 ? 'people' : 'person'}
              </li>
            </ul>
          </div>
        </div>
        <div className='row mt-4'>
          <div className='col new-break-line'>
            <strong>
              <span className='step'>Prepare Mode</span>
            </strong>
            <br />
            {detail.prepareMode}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default RecipeDetail;
