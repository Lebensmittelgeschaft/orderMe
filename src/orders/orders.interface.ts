import { Document } from 'mongoose';
import { OrderStatus } from '../../ENUMS';

export interface IOrder extends Document {
  id: Number;
  date: Date;
  itemsIds: [Number];
  status: OrderStatus;
  isAdmin: Boolean;
}
