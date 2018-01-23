// https://www.sitepoint.com/mean-stack-angular-2-angular-cli/

// We will declare all our dependencies here]
import * as express from 'express'; 
import * as  bodyParser from 'body-parser'; 
import * as cors from 'cors'; 
import * as mongoose from 'mongoose'; 
import * as morgan from 'morgan'; 
import * as path from 'path'; 
import { } from './user/user.testing';
import { } from './order/order.testing';
import { } from './integration_testing/item-order.testing';
import { initRouting } from './helper/routing';



// 27017 is the default port number. 
export let config = {
  database: 'mongodb://localhost:27017/devDB',
};

// Connect mongoose to our database
mongoose.connect(config.database);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("CONNECTED!");
  // we're connected!
});

// Declaring Port
const port = 3000;

// Initialize our app variable
const app = express();

// Middleware for CORS
app.use(cors());

// Middlewares for bodyparsincorsg using both json and urlencoding
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

app.use(morgan('tiny'));

/*express.static is a built in middleware function to serve static files.
We are telling express server public folder is the place to look for the static files
*/
app.use(express.static(path.join(__dirname, 'public')));

initRouting(app);


// Listen to port 3000
app.listen(port, () => {
  console.log(`Starting the server at port ${port}`);
});








