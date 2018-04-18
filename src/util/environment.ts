import dotenv from 'dotenv';
import fs from 'fs';

// Load environment variables from .env file, where API keys and passwords are configured
const defaultSource = '.env';
const source = fs.existsSync(defaultSource) ? defaultSource : '.env.example';
dotenv.config({ path: source });

const environment = {
  target: process.env.NODE_ENV,
  isProduction: process.env.NODE_ENV === 'production',
  isDebug: process.env.NODE_ENV !== 'production',
  source: source,
};

export default environment;
