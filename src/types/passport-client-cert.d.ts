import { Request } from 'express';

import passport = require('passport');
import { PeerCertificate } from 'tls';

export interface StrategyOptions {
  passReqToCallback?: false;
}

export interface StrategyOptionsWithRequest {
  passReqToCallback: true;
}

export interface VerifyOptions {
  message: string;
}

export interface VerifyCallback {
  (error: any, user?: any, options?: VerifyOptions): void;
}

export interface VerifyFunctionWithRequest {
  (req: Request, clientCert: PeerCertificate, done: VerifyCallback): void;
}

export interface VerifyFunction {
  (clientCert: PeerCertificate, done: VerifyCallback): void;
}

declare class Strategy implements Strategy {
  constructor(options: StrategyOptionsWithRequest, verify: VerifyFunctionWithRequest);
  constructor(options: StrategyOptions, verify: VerifyFunction);
  constructor(verify: VerifyFunction);

  name: string;
  authenticate: (req: Request, options?: Object) => void;
}
