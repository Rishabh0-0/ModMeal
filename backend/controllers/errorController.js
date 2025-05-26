//////////////////////////////////////////////////////////////

const AppError = require('../utils/AppError');

/////////////////////// PRODUCTION ERROR MESSAGE
const errorProd = (err, res) => {
  // OPERATIONAL ERRORS
  if (err.isOperational === true) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // UNKNOWN/PROGRAMMING ERRORS
  } else {
    res.status(err.statusCode).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }
};

//////////////////////////////////////////////////////////////
/////////////////////// DEVELOPMENT ERROR MESSAGE
const errorDev = (err, res) => {
  console.log(err);
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

//////////////////////////////////////////////////////////////
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data: ${errors.join('. ')}`;

  return new AppError(message, 400);
};

//////////////////////////////////////////////////////////////
/////////////////////// ERROR HANDLING MIDDLEWARE

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV == 'development') {
    errorDev(err, res);
  } else if (process.env.NODE_ENV == 'production') {
    const error =
      err.name === 'ValidationError'
        ? handleValidationErrorDB(err, res)
        : { ...err };
    errorProd(error, res);
  }
};
