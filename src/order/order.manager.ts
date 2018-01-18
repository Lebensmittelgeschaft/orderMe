import * as mongoose from 'mongoose'; 
import { orderSchema, ordersModel } from './order.model'; 
import { IOrder } from './order.interface';
import {  } from '../../ENUMS';

export class OrderManager{
  
  public static getOrderById(myId : Number) {
    try {
      return ordersModel.findOne({ id: myId });
    } catch (exception) {
      // console.log('EXCEPTION: ' + exception);
      return Promise.reject(exception);
    }
  }
  
  public static getOrderBetweenDates (firstDate : Date, secondDate : Date) {
    try {
      return ordersModel.find({ date: { $gt : firstDate, $lt: secondDate } });
    } catch (exception) {
      return Promise.reject(exception);
    }
  }
  
  public static getAllOrders () {
    try {
      return ordersModel.find({});
    } catch (exception) {
      return Promise.reject(exception);
    }
  }
  
  public static addOrder = (newOrder) => {
    try {
      return newOrder.save();
    } catch (exception) {
      return Promise.reject(exception);
    }
  }
  
  public static deleteOrderById = (myId: Number) => {
    try {
      return ordersModel.remove({ id : myId });
    } catch (exception) {
      return Promise.reject(exception);
    }
  }

  public static updateOrder = (myId: Number, newOrder: Partial<IOrder>) => {
    try {
      return ordersModel.findOneAndUpdate({ id: myId }, newOrder, { new : true });
    } catch (exception) {
      return Promise.reject(exception);
    }
  }

  // Should be used only indevelopment!
  public static deleteAllOrders = () => {
    try {
      return ordersModel.remove({});
    } catch (exception) {
      return Promise.reject(exception);
    }
  }
  
  
}
