import { Document } from 'mongoose';
import { OrderStatus } from '../ENUMS';

export interface IOrder extends Document {
  _id: number;
  date: number;
  itemsIds: [number];
  status: OrderStatus;
}
