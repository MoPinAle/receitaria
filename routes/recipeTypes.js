const express = require('express');
const { check, validationResult } = require('express-validator/check');
const router = express.Router();

const RecipeType = require('../models/RecipeType');

// @route       GET api/recipeType
// @desc        Get all recipe types
// @access      Public
router.get('/', async (req, res) => {
  try {
    const recType = await RecipeType.find({}).sort({
      name: 1,
    });
    res.json(recType);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       POST api/recipeType
// @desc        Post all recipe types
// @access      Public
router.post(
  '/',
  [check('name', 'Please, add a recipe type').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;

    try {
      let type = await RecipeType.findOne({ name });

      if (type) {
        return res.status(400).json({ msg: 'Type already exists' });
      }

      type = new RecipeType({
        name,
      });

      await type.save();

      res.send('Type saved');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route       PUT api/recipeType/:id
// @desc        Update recipe type
// @access      Public
router.put('/:id', async (req, res) => {
  const { name } = req.body;

  // Build recipe type object
  const recTypeFields = {};
  if (name) recTypeFields.name = name;

  try {
    let recType = await RecipeType.findById(req.params.id);

    if (!recType) return res.status(404).json({ msg: 'Type not found' });

    recType = await RecipeType.findByIdAndUpdate(
      req.params.id,
      { $set: recTypeFields },
      { new: true }
    );

    res.json(recType);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       DELETE api/recipeType/:id
// @desc        Delete recipe type
// @access      Public
router.delete('/:id', async (req, res) => {
  try {
    let recipeType = await RecipeType.findById(req.params.id);

    if (!recipeType)
      return res.status(404).json({ msg: 'Recipe type not found' });

    await RecipeType.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Recipe type removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
