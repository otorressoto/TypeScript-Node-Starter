import bcrypt from 'bcrypt-nodejs';
import mongoose from 'mongoose';

export interface AuthToken {
  accessToken: string;
  kind: string;
}

export interface ComparePasswordFunction {
  (candidatePassword: string, cb: (err: Error, isMatch: boolean) => any): void;
}

export interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
  passwordResetToken: string;
  passwordResetExpires: Date;

  tokens: AuthToken[];

  profile: {
    name: string;
    gender: string;
    location: string;
    website: string;
    picture: string;
  };

  comparePassword: ComparePasswordFunction;
}

const userSchema = new mongoose.Schema(
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

const User = mongoose.model<UserDocument>('User', userSchema);
export default User;
