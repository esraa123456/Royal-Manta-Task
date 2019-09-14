const express = require('express')
const Cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('morgan')
const pg = require('pg');
const passport = require('passport')
const accountRouter = require('./routes/accountRouter')
const tourRouter = require('./routes/AddTourGuide')
require('./config/jwtConf')
const app = express();
	
const connectionString = "postgres://israa:123456@localhost:5432/travel";

const API_PORT = process.env.API_PORT || 3001

app.use(Cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(passport.initialize());
app.use(passport.session());

app.use('/accounts', accountRouter);
app.use('/guide', tourRouter);

app.listen(API_PORT,()=>{
    console.log(`Server Started at port ${API_PORT}`);
  });