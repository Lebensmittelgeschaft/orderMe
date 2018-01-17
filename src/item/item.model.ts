
import * as mongoose from 'mongoose'; 
import * as testing from './item.testing';
import { ItemCategory, ItemSizes } from '../../ENUMS';

export const itemSchema = mongoose.Schema({
  id:{
    type: Number,
    required: true,
  },
  category:{
    type: ItemCategory,
    required: true,
    // enum:['Clothing', 'Furniture', 'Other'],
  },
  name:{
    type: String,
    reqired: true,
  },
  description: {
    type: String,
    required: true,
  },
  sizes:{
    type: String,
    enum:[ItemSizes.SMALL, ItemSizes.MEDIUM, ItemSizes.LARGE, ItemSizes.NONE],
    required: {function () {
      return this.category === 'Clothing';
    }},       
  },
});

export const itemsModel = mongoose.model('Items', itemSchema);
