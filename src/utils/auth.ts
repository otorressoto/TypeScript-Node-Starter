import passport from 'passport';
import { Strategy as ClientCertStrategy } from 'passport-client-cert';

import { User, UserDocument } from '../models/user';

passport.serializeUser<UserDocument, string>((user, done) => {
  done(undefined, user.id);
});

passport.deserializeUser<UserDocument, string>((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

/**
 * Sign in using client certificate authentication.
 */
passport.use(
  new ClientCertStrategy({ passReqToCallback: true }, (req, cert, done) => {
    const cn = (req.headers.cn as string) || cert.subject.CN;

    User.findOne({ cn: cn })
      .then(user => {
        if (user) {
          return user;
        }
        return new User({ cn: cn }).save();
      })
      .then(doc => done(undefined, doc))
      .catch(err => done(err));
  })
);
