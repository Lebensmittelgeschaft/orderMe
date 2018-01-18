import { ordersModel } from './order.model';
import { expect } from 'chai';
import * as mocha from 'mocha';
import { IOrder } from './order.interface';
import { OrderManager } from './order.manager';
import * as mongoose from 'mongoose'; 
import { config } from '../../app';
import { OrderStatus } from '../../ENUMS';


const currDate = new Date();
const timeInMilliseconds = currDate.getTime();

console.log('currDate: ' + currDate);
console.log('timeInMilliseconds: ' + timeInMilliseconds);

const order1 : IOrder = <IOrder>{
  id: 301,
  date: timeInMilliseconds,
  itemsIds: <[Number]>[101, 102],
  status: OrderStatus.NOT_SENT,
};

const order2 : IOrder = <IOrder>{
  id: 302,
  date: timeInMilliseconds + 3600 * 1000,
  itemsIds: <[Number]>[301, 302],
  status: OrderStatus.NOT_SENT,
};

const order3 : IOrder = <IOrder>{
  id: 303,
  date: timeInMilliseconds + 3600 * 2000,
  itemsIds: <[Number]>[301, 302],
  status: OrderStatus.NOT_SENT,
};

const order4 : IOrder = <IOrder>{
  id: 304,
  date: timeInMilliseconds + 3600 * 3000,
  itemsIds: <[Number]>[301, 302],
  status: OrderStatus.NOT_SENT,
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
    const result = await OrderManager.getOrderById(order1.id);
    expect(result).to.not.exist;
  });
  
  it('check if order db is empty', async () => {
    const result = await OrderManager.getAllOrders();
    expect(result).to.be.empty;
  });
  
  // NOT WORKING
  it('add orders to the collection', async () => {
    await OrderManager.addOrder(new ordersModel(order1));
    await OrderManager.addOrder(new ordersModel(order2));
    await OrderManager.addOrder(new ordersModel(order3));
    await OrderManager.addOrder(new ordersModel(order4));
    const ordersReturned = await OrderManager.getAllOrders();
    expect(ordersReturned).to.not.be.empty;
    expect(ordersReturned).to.have.lengthOf(4);
  });
  
  //   it('find order by id', async () => {
  //     const result = await OrderManager.getOrderById(order2.id);
  //     // console.log(result);
  //     expect(result).to.exist;
  //     expect(result).to.have.property('id', order2.id);
  //     expect(result).to.have.property('firstName', order2.firstName);
  //     expect(result).to.have.property('lastName', order2.lastName);
  //     expect(result).to.have.property('isAdmin', order2.isAdmin);
  //     expect(result).to.have.property('isOfficer', order2.isOfficer);
  //     expect(diffArrays(result.orders, order2.orders)).to.be.true;
  //   });
  
  //   it('find order by name', async () => {
  //     const result = await OrderManager.getOrderByName(order1.firstName, order1.lastName);
  //     expect(result).to.have.lengthOf(2);
  
  //     const res1 = result[0];
  //     expect(res1).to.exist;
  //     expect(res1).to.have.property('id', order1.id);
  //     expect(res1).to.have.property('firstName', order1.firstName);
  //     expect(res1).to.have.property('lastName', order1.lastName);
  
  //     const res2 = result[1];
  //     expect(res2).to.exist;
  //     expect(res2).to.have.property('id', order5.id);
  //     expect(res2).to.have.property('firstName', order5.firstName);
  //     expect(res2).to.have.property('lastName', order5.lastName);
  //   });
  
  //   it('delete a single order', async () => {
  //     const ordersReturnedBefore = await OrderManager.getAllOrders();
  //     const result = await OrderManager.deleteOrderById(order1.id);
  //     const ordersReturnedAfter = await OrderManager.getAllOrders();
  //     expect(ordersReturnedAfter).to.have.lengthOf(ordersReturnedBefore.length - 1);
  //     for (const order in ordersReturnedAfter) {
  //       expect(order).to.not.have.property('id', order1.id);
  //     }
  //   });
  
  //   it('delete all orders', async () => {
  //     const result = await OrderManager.deleteAllOrders();
  //     const ordersReturned = await OrderManager.getAllOrders();
  //     expect(ordersReturned).to.have.lengthOf(0);
  //   });
  
  
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




