const express = require('express');
const { check, validationResult } = require('express-validator/check');
const router = express.Router();

const RecipeIngredients = require('../models/RecipeIngredients');

// @route       GET api/recipeIngredients
// @desc        Get all recipeIngredients
// @access      Public
router.get('/:id', async (req, res) => {
  try {
    const rcpIng = await RecipeIngredients.find({ recipe: req.params.id });
    res.json(rcpIng);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       POST api/recipeIngredients
// @desc        Post a recipe ingredient
// @access      Public
router.post(
  '/',
  [
    check('recipe', 'Please, select a recipe').not().isEmpty(),
    check('ingredient', 'Please, select an ingredient').not().isEmpty(),
    check('mesureUnity', 'Please, select a mesure unity').not().isEmpty(),
    check('quantity', 'Please, inform a quantity of the ingredient')
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { recipe, ingredient, mesureUnity, quantity } = req.body;

    try {
      let recipeIngredient = await RecipeIngredients.findOne({
        recipe: recipe,
        ingredient: ingredient,
      });

      if (recipeIngredient) {
        return res
          .status(400)
          .json({ msg: 'Recipe already contains this ingredient' });
      }

      recipeIngredient = new RecipeIngredients({
        recipe,
        ingredient,
        mesureUnity,
        quantity,
      });

      await recipeIngredient.save();

      res.send('Recipe Ingredient saved');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Serve Error');
    }
  }
);

// @route       PUT api/recipeIngredients/:id
// @desc        Update a recipe ingredient
// @access      Public
router.put('/:id', async (req, res) => {
  const { ingredient, mesureUnity, quantity } = req.body;

  // Build recipeIngredient object
  const recipeIngFields = {};
  if (ingredient) recipeIngFields.ingredient = ingredient;
  if (mesureUnity) recipeIngFields.mesureUnity = mesureUnity;
  if (quantity) recipeIngFields.quantity = quantity;

  try {
    let recipeIngredients = await RecipeIngredients.findById(req.params.id);

    if (!recipeIngredients)
      return res.status(404).json({ msg: 'Ingredient not found' });

    recipeIngredients = await RecipeIngredients.findByIdAndUpdate(
      req.params.id,
      { $set: recipeIngFields },
      { new: true }
    );

    res.json(recipeIngredients);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       DELETE api/recipeIngredients
// @desc        Delete a recipe ingredient
// @access      Public
router.delete('/:id', async (req, res) => {
  try {
    let recipeIngredients = await RecipeIngredients.findById(req.params.id);

    if (!recipeIngredients)
      return res.status(404).json({ msg: 'Ingredient not found' });

    await RecipeIngredients.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Ingredient removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
