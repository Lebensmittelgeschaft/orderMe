
import { Document } from 'mongoose';
import { ItemCategory, ItemSizes } from '../ENUMS';

export interface IItem extends Document {
  _id: Number;
  category: ItemCategory;
  name: String;
  description: String;
  sizes: ItemSizes;
}
