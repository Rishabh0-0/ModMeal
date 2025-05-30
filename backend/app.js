const express = require('express');
const app = express();
const cors = require('cors');
const recipeRouter = require('./routes/recipeRoutes');
const ingredientRouter = require('./routes/ingredientsRoutes');
const userRouter = require('./routes/usersRoutes');
const globalErrorHandler = require('./controllers/errorController');

////////////////////////////////////////////////////
/////////////////// MIDDLEWARES
app.use(cors());
app.use(express.json());

////////////////////////////////////////////////////
/////////////////// ROUTES
app.use('/api/v1/recipes', recipeRouter);
app.use('/api/v1/ingredients', ingredientRouter);
app.use('/api/v1/users', userRouter);

////////////////////////////////////////////////////
/////////////////// ERROR HANDLING MIDDLEWARES
app.use(globalErrorHandler);

module.exports = app;
