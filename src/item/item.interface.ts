
import { Document } from 'mongoose';
import { ItemCategory } from '../../ENUMS';

export interface IItem extends Document {
  category: String;
  name: String;
  description: String;
  sizes: String;
}
