import _ from 'lodash';
import passport from 'passport';
import passportLocal from 'passport-local';
import { RequestHandler } from 'express';
import User from '../models/user';
import UserDocument from '../models/userDocument';

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser<UserDocument, any>((user, done) => {
  done(undefined, user.id);
});

passport.deserializeUser<UserDocument, any>((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

/**
 * Sign in using Email and Password.
 */
passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email: email.toLowerCase() }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(undefined, false, { message: `Email ${email} not found.` });
      }
      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          return done(err);
        }
        if (isMatch) {
          return done(undefined, user);
        }
        done(undefined, false, { message: 'Invalid email or password.' });
      });
    });
  })
);

/**
 * Login Required middleware.
 */
export let isAuthenticated: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
};

/**
 * Authorization Required middleware.
 */
export let isAuthorized: RequestHandler = (req, res, next) => {
  const provider = req.path.split('/').slice(-1)[0];

  if (_.find(req.user.tokens, { kind: provider })) {
    next();
  }
};
