
import { Document } from 'mongoose';


export interface IItem extends Document {
  _id: string;
  category: String;
  name: String;
  description: String;
  sizes: String;
}
