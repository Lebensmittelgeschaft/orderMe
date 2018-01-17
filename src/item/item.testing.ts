import { itemMethods, itemsModel } from './item.model';
import { expect } from 'chai';
import * as mocha from 'mocha';
import { IItem } from './item.interface';
import { ItemCategory } from '../../ENUMS';
import { ItemManager } from './item.manager';
import * as mongoose from 'mongoose'; 
import { config } from '../../app';

// Delete all items before the test begins
itemMethods.deleteAllItems((err, ret) => {
  // errorPrinter(err, ret, 1);
});


const item1 : IItem = <IItem>{
  id: 101,
  category: ItemCategory.FURNITURE,
  name: 'Item1',
  description:'this is a table for a workstation',
  sizes: 'M',
};

const item2 : IItem = <IItem>{
  id: 102,
  category: ItemCategory.CLOTHING,
  name: 'Item2',
  description:'this is a madey-alef shirt',
  sizes: 'S',
};



describe('Find Item by Id', () => {
  
  before(async () => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/bucketlist', { useMongoClient: true });
    await ItemManager.addItem(new itemsModel(item1));
    await ItemManager.addItem(new itemsModel(item2));
  });
  
  it('should find item by id', async () => {
    const result = await ItemManager.getItemByName(item1.name);
    // console.log(result);
    expect(result).to.exist;
    expect(result).to.have.property('id', item1.id);
    expect(result).to.have.property('category', item1.category);
    expect(result).to.have.property('name', item1.name);
    expect(result).to.have.property('description', item1.description);
    expect(result).to.have.property('sizes', item1.sizes);
  });



  after((done) => {
    mongoose.disconnect();
    done();
  });

});

mongoose.disconnect();

// TEST1: ceate and delete an item

// describe('#createAndDestroyUser', () => {
//   it('Should create a user and then destroy it', async () => {
//     const tItem = await new itemsModel(item1);

//     // itemMethods.addItem(tItem, (err, ret) => { errorPrinter(err, ret, 0);});
//     // console.log(ItemManager.getItemById('Table'));
//     // console.log(tItem);

//     expect(tItem).to.exist;
//     expect(tItem).to.have.property('category', ItemCategory.FURNITURE);
//     expect(tItem).to.have.property('name', 'Table');
//     expect(tItem).to.have.property('description');
//     expect(tItem).to.have.property('_id');
//     expect(tItem).to.not.have.property('id2');

//     // itemMethods.deleteItemById(
//     //   tItem._id, 
//     //   (err, ret) => { errorPrinter(err, ret, 2);});

//     // expect(tItem).to.not.exist;AT
//   });
// });



// new itemsModel({
//   category:req.body.category,
//   name:req.body.name,
//   description: req.body.description,
//   sizes:req.body.sizes,  
// }); 


//   itemMethods.addItem(newItem,     (err, ret) => {
//     errorPrinter(err, ret, 2);
//   });

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


