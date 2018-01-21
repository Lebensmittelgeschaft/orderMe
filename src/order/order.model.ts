import * as mongoose from 'mongoose'; 
import { OrderStatus } from '../ENUMS';
import * as uniqueValidator from 'mongoose-unique-validator';

export const orderSchema = mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
  itemsIds: {
    type: [Number],    
    default: [],
  },
  status: {
    type: OrderStatus,
    required: true,
  },
});

export const ordersModel = mongoose.model('orders', orderSchema);
orderSchema.plugin(uniqueValidator);
