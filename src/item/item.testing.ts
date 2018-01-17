import { itemsModel } from './item.model';
import { expect } from 'chai';
import * as mocha from 'mocha';
import { IItem } from './item.interface';
import { ItemCategory, ItemSizes } from '../../ENUMS';
import { ItemManager } from './item.manager';
import * as mongoose from 'mongoose'; 
import { config } from '../../app';

const item1 : IItem = <IItem>{
  id: 101,
  category: ItemCategory.FURNITURE,
  name: 'Item1',
  description:'this is a table for a workstation',
  sizes: ItemSizes.NONE,
};

const item2 : IItem = <IItem>{
  id: 102,
  category: ItemCategory.CLOTHING,
  name: 'Item2',
  description:'this is a madey-alef shirt',
  sizes: ItemSizes.SMALL,
};

const item3 : IItem = <IItem>{
  id: 103,
  category: ItemCategory.OTHER,
  name: 'Item3',
  description:'this is a locker',
  sizes: ItemSizes.NONE,
};

const item4 : IItem = <IItem>{
  id: 104,
  category: ItemCategory.CLOTHING,
  name: 'Item4',
  description:'this is a madey-alef pair of pants',
  sizes: ItemSizes.SMALL,
};

const item5 : IItem = <IItem>{
  id: 105,
  category: ItemCategory.FURNITURE,
  name: 'Item5',
  description:'ITEM5DESC',
  sizes: ItemSizes.NONE,
};

describe('Test Items', () => {
  
  before(async () => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/bucketlist', { useMongoClient: true });
  });
  
  
  it('drop items collection', async () => {
    mongoose.connection.once('connected', () => {
      mongoose.connection.db.dropCollection('items');
    });
    const result = await ItemManager.getItemById(item1.id);
    expect(result).to.not.exist;
  });
  
  
  it('check if item db is empty', async () => {
    const result = await ItemManager.getAllItems();
    expect(result).to.be.empty;
  });
  
  it('add items to the collection', async () => {
    await ItemManager.addItem(new itemsModel(item1));
    await ItemManager.addItem(new itemsModel(item2));
    await ItemManager.addItem(new itemsModel(item3));
    await ItemManager.addItem(new itemsModel(item4));
    const itemsReturned = await ItemManager.getAllItems();
    expect(itemsReturned).to.not.be.empty;
    expect(itemsReturned).to.have.lengthOf(4);
  });
  
  it('find item by id', async () => {
    const result = await ItemManager.getItemById(item2.id);
    // console.log(result);
    expect(result).to.exist;
    expect(result).to.have.property('id', item2.id);
    expect(result).to.have.property('category', item2.category);
    expect(result).to.have.property('name', item2.name);
    expect(result).to.have.property('description', item2.description);
    expect(result).to.have.property('sizes', item2.sizes);
  });

  it('find item by name', async () => {
    const result = await ItemManager.getItemByName(item1.name);
    // console.log(result);
    expect(result).to.exist;
    expect(result).to.have.property('id', item1.id);
    expect(result).to.have.property('category', item1.category);
    expect(result).to.have.property('name', item1.name);
    expect(result).to.have.property('description', item1.description);
    expect(result).to.have.property('sizes', item1.sizes);
  });

  it('find items by category', async () => {
    const itemsReturned = await ItemManager.getAllItemsByCategory(item2.category);
    expect(itemsReturned).to.have.lengthOf(2);
    for (const item in itemsReturned) {
      expect(item).to.not.have.property('category', item2.category);
    }
  });


  it('delete a single item', async () => {
    const result = await ItemManager.deleteItemById(item1.id);
    const itemsReturned = await ItemManager.getAllItems();
    expect(itemsReturned).to.have.lengthOf(3);
    for (const item in itemsReturned) {
      expect(item).to.not.have.property('id', item1.id);
    }
  });
  
  it('delete all items', async () => {
    const result = await ItemManager.deleteAllItems();
    const itemsReturned = await ItemManager.getAllItems();
    expect(itemsReturned).to.have.lengthOf(0);
  });

  after((done) => {
    mongoose.disconnect();
    done();
  });
  
});


function errorPrinter(err, ret, number) {
  console.log('hello');
  if (err) {
    console.log(`TESTING FAILED 
    success: false, 
    message: Error: ${err}}`);
  } else if (ret) {
    console.log(`{ TESTING${number} success: true, message: 'All good' }`);
  } else {
    console.log(`{ TESTING${number} success: false }`);
  }
}


