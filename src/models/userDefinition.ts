import { AuthToken } from './authToken';

interface UserDefinition {
  cn: string;
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
}

export { UserDefinition };
export default UserDefinition;
