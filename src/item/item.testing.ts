import { itemMethods, itemsModel } from './item.model';
import { expect } from 'chai';
import * as mocha from 'mocha';
import { IItem } from './item.interface';
import { ItemCategory } from '../../ENUMS';
import { ItemManager } from './item.manager';
import * as mongoose from 'mongoose'; 
import { config } from '../../app';

mongoose.connect('mongodb://localhost/bucketlist', { useMongoClient: true });

// Delete all items before the test begins
// itemMethods.deleteAllItems((err, ret) => {
//   // errorPrinter(err, ret, 1);
// });

export function runTests() {
  const item1 : IItem = <IItem>{
    category: ItemCategory.FURNITURE,
    name: 'Table',
    description:'this is a table for a workstation',
    sizes: 'M',
  };
  
  const item2 : IItem = <IItem>{
    category: ItemCategory.CLOTHING,
    name: 'Shirt',
    description:'this is a madey-alef shirt',
    sizes: 'S',
  };
  
  // WHY DOESN'T IT WORK HERE, BUT IT DOES IN ROUTER??
  const newItem = new itemsModel({
    category:'Clothing',
    name:'item3.name',
    description: 'item1.description',
    sizes:'M',  
  }); 
  
  console.log('starting to add item!');
  itemMethods.addItem(newItem, (err, list) => {
    if (err) {
      // res.json({ success:false, message: `Failed to create a new list. Error: ${err}` });
    }else {
      // res.json({ success:true, message: 'Added successfully.' });
    }
  });
  
}

runTests();

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

// function errorPrinter(err, ret, number) {
//   console.log('hello');
//   if (err) {
//     console.log(`TESTING FAILED 
//     success: false, 
//     message: Error: ${err}}`);
//   } else if (ret) {
//     console.log(`{ TESTING${number} success: true, message: 'All good' }`);
//   } else {
//     console.log(`{ TESTING${number} success: false }`);
//   }
// }


