import bcrypt from 'bcrypt-nodejs';
import { Document, Schema, model } from 'mongoose';
import { Timestamp } from './timestamp';
import { UserDefinition } from './userDefinition';

export interface ComparePasswordFunction {
  (candidatePassword: string, cb: (err: Error, isMatch: boolean) => void): void;
}

export interface UserDocument extends Document, Timestamp, UserDefinition {
  comparePassword: ComparePasswordFunction;
}

const userSchema = new Schema(
  {
    email: { type: String, unique: true },
    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date,

    tokens: Array,

    profile: {
      name: String,
      gender: String,
      location: String,
      website: String,
      picture: String,
    },
  },
  { timestamps: true }
);

/**
 * Password hash middleware.
 */
userSchema.pre<UserDocument>('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, undefined, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

const comparePassword: ComparePasswordFunction = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

userSchema.methods.comparePassword = comparePassword;

const User = model<UserDocument>('User', userSchema);

export { User };
export default User;
