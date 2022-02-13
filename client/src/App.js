import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Recipes from './components/recipes/Recipes';
import RecipeDetail from './components/recipes/RecipeDetail';
import RecipeForm from './components/recipes/RecipeForm';

import RecipeState from './context/recipe/RecipeState';
import MenuState from './context/menu/MenuState';
import IngredientsState from './context/ingredients/IngredientsState';
import MesureUnityState from './context/mesureUnity/MesureUnityState';

import './App.css';

const App = () => {
  let location = useLocation();
  const showcase = location.pathname.replace('/', '');

  return (
    <RecipeState>
      <MenuState>
        <IngredientsState>
          <MesureUnityState>
            <div
              className={
                showcase.toLowerCase().includes('about') || showcase === ''
                  ? 'body-home'
                  : ''
              }
            >
              <div className='container-fluid p-0'>
                <Navbar />
                <div className='mb-2'>
                  <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/bittersweet' component={Recipes} />
                    <Route exact path='/salty' component={Recipes} />
                    <Route exact path='/sweet' component={Recipes} />
                    <Route
                      exact
                      path='/recipeDetails'
                      component={RecipeDetail}
                    />
                    <Route exact path='/addRecipe' component={RecipeForm} />
                    <Route exact path='/editRecipe' component={RecipeForm} />
                    <Route exact path='/about' component={About} />
                  </Switch>
                </div>
              </div>
            </div>
          </MesureUnityState>
        </IngredientsState>
      </MenuState>
    </RecipeState>
  );
};

export default App;
