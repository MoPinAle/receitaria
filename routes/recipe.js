const express = require('express');
const { check, validationResult } = require('express-validator/check');
const router = express.Router();

const Recipe = require('../models/Recipe');

// @route        GET api/recipe
// @desc         Get all recipes
// @ access      Public
router.get('/:id', async (req, res) => {
  try {
    const rcp = await Recipe.find({ type: req.params.id });
    res.json(rcp);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/detail/:id', async (req, res) => {
  try {
    const rcpId = await Recipe.findById(req.params.id);
    res.json(rcpId);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route        POST api/recipe
// @desc         Add a new recipe
// @access       Public
router.post(
  '/',
  [
    check('type', 'Please, add a recipe type').not().isEmpty(),
    check('name', 'Please, add a name of your recipe').not().isEmpty(),
    check('description', 'Please, add a description of you recipe')
      .not()
      .isEmpty(),
    check('photo', 'Please, add a photo of your recipe').not().isEmpty(),
    check('prepareTime', 'Please, add a prepare time').not().isEmpty(),
    check('prepareMode', 'Please, add a prepare mode').not().isEmpty(),
    check('author', 'Please, add the author of your recipe').not().isEmpty(),
    check('ingredients', 'Please, add the ingredients').not().isEmpty(),
    check('serves', 'Please, add how many people this recipe serves')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      type,
      name,
      description,
      photo,
      prepareTime,
      prepareMode,
      author,
      ingredients,
      serves,
      favorite
    } = req.body;

    try {
      let recipe = await Recipe.findOne({ name: name, type: type });

      if (recipe) {
        return res.status(400).json({ msg: 'This recipe already exists' });
      }
      recipe = new Recipe({
        type,
        name,
        description,
        photo,
        prepareTime,
        prepareMode,
        author,
        ingredients,
        serves,
        favorite,
      });

      await recipe.save();

      res.send('Recipe saved');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route         PUT api/recipe/:id
// @desc          Update a recipe
// @access        Public
router.put('/:id', async (req, res) => {
  const {
    name,
    description,
    photo,
    prepareTime,
    prepareMode,
    author,
    ingredients,
    serves,
    favorite,
  } = req.body;

  // Build recipe object
  const recipeFields = {};
  if (name) recipeFields.name = name;
  if (description) recipeFields.description = description;
  if (photo) recipeFields.photo = photo;
  if (prepareTime) recipeFields.prepareTime = prepareTime;
  if (prepareMode) recipeFields.prepareMode = prepareMode;
  if (author) recipeFields.author = author;
  if (ingredients) recipeFields.ingredients = ingredients;
  if (serves) recipeFields.serves = serves;
  if (favorite) recipeFields.favorite = favorite;

  try {
    let recipe = await Recipe.findById(req.params.id);

    if (!recipe) return res.status(404).json({ msg: 'Recipe not found' });

    recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { $set: recipeFields },
      { new: true }
    );

    res.json(recipe);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route          DELETE api/recipe/:id
// @desc           Delete a recipe
// @access         Public
router.delete('/:id', async (req, res) => {
  try {
    let recipe = await Recipe.findById(req.params.id);

    if (!recipe) return res.status(404).json({ msg: 'Recipe nt found' });

    await Recipe.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Recipe removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
