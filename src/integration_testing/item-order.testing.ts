import { testingItems } from '../item/item.testing';
import { testingOrders } from '../order/order.testing';
import * as mongoose from 'mongoose'; 
import { expect } from 'chai';

import { OrderManager } from '../order/order.manager';
import { ordersModel } from '../order/order.model';
import { ItemManager } from '../item/item.manager';
import { itemsModel } from '../item/item.model';



describe('Test Integration: Orders + Items', () => {
  before(async () => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/bucketlist', { useMongoClient: true });
    mongoose.connection.once('connected', () => {
      mongoose.connection.db.dropCollection('items');
    });
    mongoose.connection.once('connected', () => {
      mongoose.connection.db.dropCollection('orders');
    });
  });
  
  it('check if item db is empty', async () => {
    const result = await ItemManager.getAllItems();
    expect(result).to.be.empty;
  });
  
  it('check if order db is empty', async () => {
    const result = await OrderManager.getAllOrders();
    expect(result).to.be.empty;
  });
  
  it('add items to the collection', async () => {
    await ItemManager.addItem(new itemsModel(testingItems.item1));
    await ItemManager.addItem(new itemsModel(testingItems.item2));
    await ItemManager.addItem(new itemsModel(testingItems.item3));
    await ItemManager.addItem(new itemsModel(testingItems.item4));
    const itemsReturned = await ItemManager.getAllItems();
    expect(itemsReturned).to.not.be.empty;
    expect(itemsReturned).to.have.lengthOf(4);
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
  
  // findByIdAndUpdate
  it('add item to an order', async () => {
    const item = await ItemManager.getItemById(testingItems.item1._id);
    const order = await OrderManager.getOrderById(testingOrders.order1._id);
    order.itemsIds.push(item.id);
    await OrderManager.updateOrder(order.id, { itemsIds :  order.itemsIds });
    const newOrder = await OrderManager.getOrderById(order.id);
    expect(newOrder.itemsIds.includes(item._id)).to.be.true;
  });
  
  
  it('get an item from its id in order', async () => {
    // should return item1
    const order = await OrderManager.getOrderById(testingOrders.order1._id);
    // console.log(order);
    const itemFromOrder = await ItemManager.getItemById(await order.itemsIds[0]);
    // console.log(itemFromOrder);
    expect(itemFromOrder).to.have.property('_id', testingItems.item1._id);
  
  });
  
  
  after((done) => {
    mongoose.disconnect();
    done();
  });
  
});


