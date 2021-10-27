const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();
  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const { review, rating, auther, tour } = req.body;
  const newReview = await Review.create({
    review,
    rating,
    auther,
    tour,
  });
  res.status(201).json({
    status: 'success',
    data: {
      newReview,
    },
  });
});
