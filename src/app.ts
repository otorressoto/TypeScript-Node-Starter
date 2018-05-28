import compression from 'compression';
import mongo from 'connect-mongo';
import express from 'express';
import session from 'express-session';
import lusca from 'lusca';
import mongoose from 'mongoose';
import mongooseHidden from 'mongoose-hidden';
import 'mongoose-throw-if-not-found-plugin';
import passport from 'passport';
import path from 'path';

// Initialize application configuration
import config from './utils/config';

// Setup Mongoose (MongoDB ORM)
mongoose.Promise = Promise;
mongoose.plugin(mongooseHidden({ defaultHidden: { _id: false } }));
mongoose.connect(config.mongodb.uri).catch(err => {
  console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
});

// Initialize passport authentication
import './utils/auth';

// Routes
import usersRouter from './routes/users';

// Create Express server
const app = express();

// Express configuration
app.set('port', config.server.port);
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));

app.use(express.static(path.join(__dirname, 'public'), { maxAge: 365 * 24 * 60 * 60 }));

// Mongo session storage
const MongoStore = mongo(session);
app.use(
  session({
    name: 'app.sid',
    cookie: { httpOnly: false, secure: true },
    resave: false,
    saveUninitialized: false,
    secret: config.session.secret,
    store: new MongoStore({
      url: config.mongodb.uri,
      autoReconnect: true,
    }),
  })
);

// Passport setup and configuration
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('client-cert'));

// API routes
app.use('/users', usersRouter);

export default app;
