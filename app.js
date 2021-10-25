const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitier = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 20,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});

// Set security HTTP headers
app.use(helmet());

// Limite request
app.use('/api', limiter);

//Body parser, reading data from body
app.use(
  express.json({
    limit: '10kb',
  })
);

// Data sanitization against NoSQL query  injection
app.use(mongoSanitier());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'price',
      'difficulty',
    ],
  })
);

// Data sanitization against XXS
app.use(xss());

// Serving static files
app.use(express.static(`${__dirname}/public`));

// 2) ROUTE HANDLERS
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
// Handle 404 not found routes
app.all('*', (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on thus server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
