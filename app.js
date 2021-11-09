const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitier = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const viewRoutes = require('./routes/viewRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const { webhookCheckout } = require('./controllers/bookingcontroller');

const app = express();
app.enable('trust proxy');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// 1) MIDDLEWARES
app.use(cors());
app.options('*', cors());
// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// Stripe WebHook chould be called Before bodyParser

app.post(
  '/webhook-checkout',
  bodyParser.raw({ type: 'application/json' }),
  webhookCheckout
);

const limiter = rateLimit({
  max: 20,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});

// Set security HTTP headers
app.use(
  helmet({
    contentSecurityPolicy: false,
    referrerPolicy: { policy: 'no-referrer' },
  })
);

// Limite request
app.use('/api', limiter);
//Body & Cookie parser, reading data from body
// app.use(
//   express.json({
//     limit: '10kb',
//   })
// );
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

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

// Test middleware
// app.use((req, res, next) => {
//   console.log(req.cookies);
//   next();
// });

app.use(compression());

// 2) ROUTE HANDLERS
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/', viewRoutes);

// Handle 404 not found routes
app.all('*', (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on thus server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
