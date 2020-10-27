import { PassportLocalDocument } from 'passport-local-mongoose';
import { Types } from 'mongoose';

export interface IUser extends PassportLocalDocument {
  readonly _id?: Types.ObjectId;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;
  readonly encode: string;
}
