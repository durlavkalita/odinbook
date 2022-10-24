const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

var userRouter = require('./routes/user');

const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

app.get('/hello', (req,res)=>{
  res.send('Hello World again');
});

app.use('/', userRouter);

// app.use(function (err, req, res, next) {
//   if (err){
//     console.error(err.stack)
//     res.status(500).send('Something broke!')
//   }
// });

app.listen(port, ()=>{
  console.log(`App is running on port: ${port}`);
});