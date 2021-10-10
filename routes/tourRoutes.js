const express = require('express');
const {
  getAllTours,
  createTour,
  deletetour,
  updateTour,
  getTour,
} = require('../controllers/tourController');

const router = express.Router();

// const checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'bad request',
//     });
//   }
//   next();
// };

// router.param('id', checkId);

router.route('/').get(getAllTours).post(createTour);

router.route('/:id').get(getTour).patch(updateTour).delete(deletetour);

module.exports = router;
