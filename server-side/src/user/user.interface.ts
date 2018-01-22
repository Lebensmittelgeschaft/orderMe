
import { Document } from 'mongoose';

export interface IUser extends Document {
  id: Number;
  firstName: String;
  lastName: String;
  orders: [String];
  isOfficer: Boolean;
  isAdmin: Boolean;
}
