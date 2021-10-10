class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);
    // 2) Advenced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const field = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(field);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 5;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}
// BUILD QUERY

// 1) Filtering
// const queryObj = { ...req.query };
// const excludeFields = ['page', 'sort', 'limit', 'fields'];
// excludeFields.forEach((el) => delete queryObj[el]);

// // 2) Advenced Filtering
// let queryStr = JSON.stringify(queryObj);
// queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
// let query = Tour.find(JSON.parse(queryStr));

// 3) Sorting
// const { sort, fields } = req.query;
// if (sort) {
//   const sortBy = sort.split(',').join(' ');
//   query = query.sort(sortBy);
// } else {
//   query = query.sort('-createdAt');
// }

// 4) Field limiting
// if (fields) {
//   const field = fields.split(',').join(' ');
//   query = query.select(field);
// } else {
//   query = query.select('-__v');
// }

// 5) Pagination
// const page = req.query.page * 1 || 1;
// const limit = req.query.limit * 1 || 5;
// const skip = (page - 1) * limit;
// if (req.query.page) {
//   const toursNum = await Tour.countDocuments();
//   if (skip >= toursNum) throw new Error('this page does not exist');
// }
// query = query.skip(skip).limit(limit);
// EXECUTE QUERY
// query.sort().select().skip().limit()
module.exports = APIFeatures;
