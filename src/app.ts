import compression from 'compression';
import mongo from 'connect-mongo';
import express from 'express';
import session from 'express-session';
import expressValidator from 'express-validator';
import lusca from 'lusca';
import mongoose from 'mongoose';
import mongooseHidden from 'mongoose-hidden';
import 'mongoose-throw-if-not-found-plugin';
import passport from 'passport';
import path from 'path';
import { MONGODB_URI, SESSION_SECRET } from './utils/secrets';

// API keys and Passport configuration
import * as passportConfig from './config/passport';

// Routes
import usersRouter from './routes/users';

// Setup Mongoose (MongoDB ORM)
const mongoUrl = MONGODB_URI;
mongoose.Promise = Promise;
mongoose.plugin(mongooseHidden({ defaultHidden: { _id: false } }));
mongoose.connect(mongoUrl).catch(err => {
  console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
});

// Create Express server
const app = express();

// Express configuration
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
app.use('/users', usersRouter);

export default app;
