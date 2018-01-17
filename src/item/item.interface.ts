
import { Document } from 'mongoose';
import { ItemCategory } from '../../ENUMS';

export interface IItem extends Document {
  id: Number;
  category: String;
  name: String;
  description: String;
  sizes: String;
}
