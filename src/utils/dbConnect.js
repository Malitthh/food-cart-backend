const mongoose = require('mongoose');
require('dotenv').config()

module.exports = () => {
  console.log('connecting to DB...');
  mongoose
    .connect(process.env.DATABASE_LOCAL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`DB connection successful!`.blue.bold))
    .catch((err) => {
      console.log('DB Connection Failed !');
      console.log(`err`, err);
    });
};
