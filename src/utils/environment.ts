import dotenv from 'dotenv';
import fs from 'fs';

// Load environment variables from .env file, where API keys and passwords are configured
const defaultSource = '.env';
const source = fs.existsSync(defaultSource) ? defaultSource : '.env.example';
const result = dotenv.config({ path: source });

if (result.error) {
  throw result.error;
}

const target = process.env.NODE_ENV;
const isProduction = target === 'production';

const environment = {
  target: target,
  isProduction: isProduction,
  isDebug: !isProduction,
  source: source,
};

export { environment };
export default environment;
