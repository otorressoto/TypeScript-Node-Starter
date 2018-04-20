import bodyParser from 'body-parser';
import compression from 'compression';
import mongo from 'connect-mongo';
import express from 'express';
import session from 'express-session';
import expressValidator from 'express-validator';
import lusca from 'lusca';
import mongoose from 'mongoose';
import passport from 'passport';
import path from 'path';
import { MONGODB_URI, SESSION_SECRET } from './utils/secrets';

// API keys and Passport configuration
import * as passportConfig from './config/passport';

// Controllers (route handlers)
// import * as userController from './controllers/user';
// import * as apiController from './controllers/api';

// Connect to MongoDB
const mongoUrl = MONGODB_URI;
mongoose.Promise = Promise;
mongoose
  .connect(mongoUrl)
  .then(() => {
    // Connected, the `mongoose.connect()` promise resolves to undefined.
  })
  .catch(err => {
    console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
  });

// Create Express server
const app = express();

// Express configuration
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(passport.initialize());
app.use(passport.session());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));

app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

// Mongo session storage
const MongoStore = mongo(session);
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    store: new MongoStore({
      url: mongoUrl,
      autoReconnect: true,
    }),
  })
);

// API routes.
// app.get('/api', apiController.getApi);

export default app;
