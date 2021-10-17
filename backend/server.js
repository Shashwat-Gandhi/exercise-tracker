const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const usersRouter = require('./routes/user');
const exercisesRouter = require('./routes/exercise');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const uri = String(process.env.ATLAS_URI);
mongoose.connect(uri, {useNewUrlParser : true});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


const port = process.env.PORT || 5000;

app.use('/users', usersRouter);
app.use('/exercises', exercisesRouter);

app.listen(port, () => console.log('Server listening on port : ' + port));
