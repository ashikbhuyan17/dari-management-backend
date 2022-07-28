const mongoose = require('mongoose');

const dbConnect = async () => {
  // console.log("DATABASE_NAME", process.env.DATABASE_NAME);
  // mongoose.connect(`mongodb+srv://ashik17:${process.env.PASSWORD}@cluster0.df83a.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  //   // userCreateIndex: true,

  // });
  // const db = mongoose.connection
  // // console.log(db);
  // db.on('error', (err) => {
  //   console.log(err);
  //   console.log('this is error');
  // })
  // db.once('open', () => {
  //   console.log("database connection done");
  // })

  mongoose
    .connect(process.env.DBURI)
    .then(() => console.log('Database Connected'))
    .catch(err => console.log(err));

};

module.exports = dbConnect;