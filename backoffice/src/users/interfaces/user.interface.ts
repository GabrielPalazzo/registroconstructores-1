import { Types } from 'mongoose';

export interface IUser {
  readonly _id?: Types.ObjectId;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly company: string;
  readonly password: string;
  readonly encode: string;
}
