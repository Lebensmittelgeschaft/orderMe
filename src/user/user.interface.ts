
import { Document } from 'mongoose';


export interface IUser extends Document {
  _id: string;
  orders: [String];
  isOfficer: Boolean;
  isAdmin: Boolean;
}
