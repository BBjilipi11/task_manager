const express = require("express");
const app = express();
const index = require("./routes/index");
const connectDB = require("./db/connect");
require("dotenv").config();

app.use(express.static("./public"));
app.use(express.json());
app.use("/api/v1", index);

//Routes
// app.get('/hello',(req,res)=>{
//     res.send('Task Manager App');
// })

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB();
    app.listen(port, console.log(`Server is listening on port ${port}.`));
  } catch (error) {
    console.log(error);
  }
};

start();
