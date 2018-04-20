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

export default UserDocument;
