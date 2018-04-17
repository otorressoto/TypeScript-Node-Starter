export const environment = {
  target: process.env.NODE_ENV,
  isProduction: process.env.NODE_ENV === 'production',
  isDebug: process.env.NODE_ENV !== 'production',
};
