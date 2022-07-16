const express = require('express');
const logger = require('morgan');


const errorHandler = require('./error-handler');

const app = express();

const routers = require('../routes');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routers);

app.use(errorHandler);

app.use(function(req, res, next) {
    // next(createError(404));
    res.status(404).json(
      { 
        statusCode: 404, 
        message: "The endpoint does not exist."
      }
    );
  });

module.exports = app;