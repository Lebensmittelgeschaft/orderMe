import * as mongoose from 'mongoose'; 
import { OrderStatus } from '../../ENUMS';

export const orderSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
  itemsIds: {
    type: [Number],
    required: true,
  },
  status: {
    type: OrderStatus,
    required: true,
  },
});

export const ordersModel = mongoose.model('orders', orderSchema);
