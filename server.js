console.clear();
require('dotenv').config({ path: './config.env' });
const mongoose = require('mongoose');
const app = require('./app');

const URI = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB Connection successfull'))
  .catch((err) => console.log(err));

const port = process.env.PORT || 3000;

app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log(`App running on port ${port}...`);
});
