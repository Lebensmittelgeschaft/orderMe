import { itemsModel } from './item.model';
import { expect } from 'chai';
import { IItem } from './item.interface';
import { ItemCategory, ItemSizes } from '../../ENUMS';
import { ItemManager } from './item.manager';
import * as mongoose from 'mongoose'; 
import { config } from '../../app';

export const testingItems = {
  item1 : <IItem>{
    id: 101,
    category: ItemCategory.FURNITURE,
    name: 'Item1',
    description:'this is a table for a workstation',
    sizes: ItemSizes.NONE,
  },
  item2 : <IItem>{
    id: 102,
    category: ItemCategory.CLOTHING,
    name: 'Item2',
    description:'this is a madey-alef shirt',
    sizes: ItemSizes.SMALL,
  },
  
  item3 : <IItem>{
    id: 103,
    category: ItemCategory.OTHER,
    name: 'Item3',
    description:'this is a locker',
    sizes: ItemSizes.NONE,
  },
  
  item4 : <IItem>{
    id: 104,
    category: ItemCategory.CLOTHING,
    name: 'Item4',
    description:'this is a madey-alef pair of pants',
    sizes: ItemSizes.SMALL,
  },
  
  item5 : <IItem>{
    id: 105,
    category: ItemCategory.FURNITURE,
    name: 'Item5',
    description:'ITEM5DESC',
    sizes: ItemSizes.NONE,
  },
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
    const result = await ItemManager.getItemById(testingItems.item1.id);
    expect(result).to.not.exist;
  });
  
  it('check if item db is empty', async () => {
    const result = await ItemManager.getAllItems();
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
  
  it('find item by id', async () => {
    const result = await ItemManager.getItemById(testingItems.item2.id);
    // console.log(result);
    expect(result).to.exist;
    expect(result).to.have.property('id', testingItems.item2.id);
    expect(result).to.have.property('category', testingItems.item2.category);
    expect(result).to.have.property('name', testingItems.item2.name);
    expect(result).to.have.property('description', testingItems.item2.description);
    expect(result).to.have.property('sizes', testingItems.item2.sizes);
  });
  
  it('find item by name', async () => {
    const result = await ItemManager.getItemByName(testingItems.item1.name);
    // console.log(result);
    expect(result).to.exist;
    expect(result).to.have.property('id', testingItems.item1.id);
    expect(result).to.have.property('category', testingItems.item1.category);
    expect(result).to.have.property('name', testingItems.item1.name);
    expect(result).to.have.property('description', testingItems.item1.description);
    expect(result).to.have.property('sizes', testingItems.item1.sizes);
  });
  
  it('find items by category', async () => {
    const itemsReturned = await ItemManager.getAllItemsByCategory(testingItems.item2.category);
    expect(itemsReturned).to.have.lengthOf(2);
    for (const item in itemsReturned) {
      expect(item).to.not.have.property('category', testingItems.item2.category);
    }
  });

  it('update an item by id', async () => {
    const before = await ItemManager.getItemById(testingItems.item2.id);

    const newCategury = (before.category === ItemCategory.CLOTHING) ?
    ItemCategory.FURNITURE : ItemCategory.CLOTHING;

    const result = await ItemManager.updateItem( 
      testingItems.item2.id, 
      { category: newCategury },
    );
    const result2 = await ItemManager.getItemById(testingItems.item2.id);
    expect(result).to.not.have.property('category', before.category);
    expect(result2).to.have.property('category', newCategury);
  });
  
  
  it('delete a single item', async () => {
    const itemsReturnedBefore = await ItemManager.getAllItems();
    const result = await ItemManager.deleteItemById(testingItems.item1.id);
    const itemsReturnedAfter = await ItemManager.getAllItems();
    expect(itemsReturnedAfter).to.have.lengthOf(itemsReturnedBefore.length - 1);
    for (const item in itemsReturnedAfter) {
      expect(item).to.not.have.property('id', testingItems.item1.id);
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


