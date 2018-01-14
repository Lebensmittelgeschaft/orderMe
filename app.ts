// https://www.sitepoint.com/mean-stack-angular-2-angular-cli/

// We will declare all our dependencies here]
import * as express from 'express'; 
// const express = require('express');
import * as path from 'path'; 
// const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
// const config = require('./config/database');
import { config } from './config/database'; 
// const bucketlist = require('./controllers/bucketlist');
// const itemController = require('./controllers/itemController');
import * as itemController from './controllers/itemController';
const morgan = require('morgan');

// Connect mongoose to our database
mongoose.connect(config.database);

// Declaring Port
const port = 3000;

// Initialize our app variable
const app = express();
// app.use('/bucketlist',bucketlist);
// Middleware for CORS
app.use(cors());

// Middlewares for bodyparsincorsg using both json and urlencoding
app.use(bodyParser.urlencoded({ extenbucketlistded:true }));
app.use(bodyParser.json());

app.use(morgan('tiny'));
/*express.static is a built in middleware function to serve static files.
We are telling express server public folder is the place to look for the static files

*/
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res) => {
  res.send('Invalid page');
});

// Routing all HTTP requests to /bucketlist to bucketlist controller
// app.use('/bucketlist',bucketlist);


// Routing all HTTP requests to /bucketlist to bucketlist controller
app.use('/items', itemController);

// Listen to port 3000
app.listen(port, () => {
  console.log(`Starting the server at port ${port}`);
});
