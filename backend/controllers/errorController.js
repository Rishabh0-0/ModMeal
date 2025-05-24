// TODO: ADD DIFFERENT ERROR FOR OPERATIONAL ERRORS

//////////////////////////////////////////////////////////////
/////////////////////// PRODUCTION ERROR MESSAGE
const errorProd = (err, res) => {
  console.log(err);
  res.status(err.statusCode).json({
    status: err.status,
    message: 'Something went wrong!',
  });
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
/////////////////////// ERROR HANDLING MIDDLEWARE

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV == 'development') {
    errorDev(err, res);
  } else if (process.env.NODE_ENV == 'production') {
    errorProd(err, res);
  }
};
