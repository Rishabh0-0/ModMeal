const express = require('express');
const app = express();
const cors = require('cors');
const recipeRouter = require('./routes/recipeRoutes');

////////////////////////////////////////////////////
/////////////////// MIDDLEWARES
app.use(cors());
app.use(express.json());

////////////////////////////////////////////////////
/////////////////// ROUTES
app.use('/api/v1/recipes', recipeRouter);

app.get('/', (req, res) => {
  res.send('ModMeals api is running...');
});

module.exports = app;
