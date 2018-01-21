import { ordersModel } from './order.model';
import { expect } from 'chai';
import { IOrder } from './order.interface';
import { OrderManager } from './order.manager';
import * as mongoose from 'mongoose'; 
import { config } from '../../app';
import { OrderStatus } from '../../ENUMS';

import { ItemManager } from '../item/item.manager';
import { itemsModel } from '../item/item.model';
import { testingItems } from '../item/item.testing';


const currDate = new Date();
const timeInMilliseconds = currDate.getTime();

console.log('currDate: ' + currDate);
console.log('timeInMilliseconds: ' + timeInMilliseconds);

export const testingOrders = {
  order1 : <IOrder>{
    id: 301,
    date: timeInMilliseconds,
    itemsIds: <[Number]>[101, 102],
    status: OrderStatus.NOT_SENT,
  },
  order2 : <IOrder>{
    id: 302,
    date: timeInMilliseconds + 3600 * 1000,
    itemsIds: <[Number]>[101, 103],
    status: OrderStatus.NOT_SENT,
  },
  
  order3 : <IOrder>{
    id: 303,
    date: timeInMilliseconds + 3600 * 2000,
    itemsIds: <[Number]>[301, 302],
    status: OrderStatus.NOT_SENT,
  },
  
  order4 : <IOrder>{
    id: 304,
    date: timeInMilliseconds + 3600 * 3000,
    itemsIds: <[Number]>[301, 302],
    status: OrderStatus.NOT_SENT,
  },
};



describe('Test Orders', () => {
  before(async () => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/bucketlist', { useMongoClient: true });
  });
  
  it('drop orders collection', async () => {
    mongoose.connection.once('connected', () => {
      mongoose.connection.db.dropCollection('orders');
    });
    const result = await OrderManager.getOrderById(testingOrders.order1.id);
    expect(result).to.not.exist;
  });
  
  it('check if order db is empty', async () => {
    const result = await OrderManager.getAllOrders();
    expect(result).to.be.empty;
  });
  
  it('add orders to the collection', async () => {
    await OrderManager.addOrder(new ordersModel(testingOrders.order1));
    await OrderManager.addOrder(new ordersModel(testingOrders.order2));
    await OrderManager.addOrder(new ordersModel(testingOrders.order3));
    await OrderManager.addOrder(new ordersModel(testingOrders.order4));
    const ordersReturned = await OrderManager.getAllOrders();
    expect(ordersReturned).to.not.be.empty;
    expect(ordersReturned).to.have.lengthOf(4);
  });
  
  
  
  it('find order by id', async () => {
    const result = await OrderManager.getOrderById(testingOrders.order2.id);
    // console.log(result);
    expect(result).to.exist;
    expect(result).to.have.property('id', testingOrders.order2.id);
    expect(result).to.have.property('date', testingOrders.order2.date);
    expect(result).to.have.property('status', testingOrders.order2.status);
    expect(diffArrays(result.itemsIds, testingOrders.order2.itemsIds)).to.be.true;
  });
  
  
  it('update an order by id', async () => {
    const before = await OrderManager.getOrderById(testingOrders.order2.id);

    const newStatus = (before.status === OrderStatus.NOT_SENT) ?
    OrderStatus.SENT : OrderStatus.NOT_SENT;

    const result = await OrderManager.updateOrder( 
      testingOrders.order2.id, 
      { status: newStatus },
    );
    const result2 = await OrderManager.getOrderById(testingOrders.order2.id);
    expect(result).to.not.have.property('status', before.status);
    expect(result2).to.have.property('status', newStatus);
  });
  
  it('delete a single order', async () => {
    const ordersReturnedBefore = await OrderManager.getAllOrders();
    const result = await OrderManager.deleteOrderById(testingOrders.order1.id);
    const ordersReturnedAfter = await OrderManager.getAllOrders();
    expect(ordersReturnedAfter).to.have.lengthOf(ordersReturnedBefore.length - 1);
    for (const order in ordersReturnedAfter) {
      expect(order).to.not.have.property('id', testingOrders.order1.id);
    }
  });
  
  it('delete all orders', async () => {
    const result = await OrderManager.deleteAllOrders();
    const ordersReturned = await OrderManager.getAllOrders();
    expect(ordersReturned).to.have.lengthOf(0);
  });
  
  after((done) => {
    mongoose.disconnect();
    done();
  });
  
});

function diffArrays(array1, array2) {
  if (array1.length === array2.length) {
    array1.sort();
    array2.sort();
    for (let i = 0 ; i < array1.length ; i += 1) {
      if (array1[i] !== array2[i]) { 
        return false;
      }
    }
    return true;
  }
  return false;
}




