const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.json({ msg: 'Welcome to Receitaria API' }));

// Define Routes 
app.use('/api/recipe', require('./routes/recipe'));
app.use('/api/recipeTypes', require('./routes/recipeTypes'));
app.use('/api/ingredients', require('./routes/ingredients'));
app.use('/api/recipeIngredients', require('./routes/recipeIngredients'));
app.use('/api/mesureUnity', require('./routes/mesureUnity'));

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));