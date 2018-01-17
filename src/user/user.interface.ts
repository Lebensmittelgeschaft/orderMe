
import { Document } from 'mongoose';


export interface IUser extends Document {
  _id: String;
  id: String;
  orders: [String];
  isOfficer: Boolean;
  isAdmin: Boolean;
}
