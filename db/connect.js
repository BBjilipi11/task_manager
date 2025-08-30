const mongoose = require("mongoose");

// const connectionString =

const connectDB = () => {
  return mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
};

// mongoose
//     .connect(connectionString,{
//         useNewUrlParser: true,
//         useCreateIndex: true,
//         useFindAndModify: false,
//         useUnifiedTopology: true,
//     })
// .then(()=>console.log('Connected Successfully'))
// .catch((err)=>console.log(err))

module.exports = connectDB;
