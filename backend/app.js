const express = require('express');
const app = express();
const cors = require('cors');
const recipeRouter = require('./routes/recipeRoutes');
const globalErrorHandler = require('./controllers/errorController');

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

app.use(globalErrorHandler);

module.exports = app;
