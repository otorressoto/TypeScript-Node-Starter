import { Schema } from 'mongoose';

declare function mongooseHidden(defaults?: any): (schema: Schema, options?: any) => void;

export = mongooseHidden;
