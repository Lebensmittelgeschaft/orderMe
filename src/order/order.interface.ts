import { Document } from 'mongoose';
import { OrderStatus } from '../../ENUMS';

export interface IOrder extends Document {
  id: Number;
  date: Number;
  itemsIds: [Number];
  status: OrderStatus;
}
