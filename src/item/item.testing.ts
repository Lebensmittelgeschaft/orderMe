import { itemMethods, itemsModel } from './item.model';
import { expect } from 'chai';
import * as mocha from 'mocha';

// export function runTests() {

let testingIndex : number = 0;

console.log(`Testing at: ${testingIndex}`);

itemMethods.deleteAllItems((err, ret) => {
  errorPrinter(err, ret, 1);
});

testingIndex += 1;

// TEST1: ceate and delete an item

describe('#createAndDestroyUser', () => {
  it('Should create a user and then destroy it', async () => {
    const tItem = await new itemsModel({
      category: 'Clothing',
      name: 'Borysovski',
      description:'my Description',
      sizes: 'M',
    });
    expect(tItem).to.exist;
    expect(tItem).to.have.property('category', 'Clothing');
    expect(tItem).to.have.property('name', 'Borysovski');
    expect(tItem).to.have.property('description', 'my Description');
    expect(tItem).to.have.property('_id');
    expect(tItem).to.not.have.property('id2');
    
    itemMethods.deleteItemById(
      tItem._id, 
      (err, ret) => { errorPrinter(err, ret, 2);});

    // expect(tItem).to.not.exist;
  });

});
  
  
  
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
    if (err) {
      console.log(`TESTING FAILED AT ${testingIndex}
      success: false, 
      message: Error: ${err}}`);
    } else if (ret) {
      console.log(`{ TESTING${number} success: true, message: 'All good' }`);
    } else {
      console.log(`{ TESTING${number} success: false }`);
    }
  }
  // }
  // testingIndex += 1;
  
  