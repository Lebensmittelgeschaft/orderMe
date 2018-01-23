
import * as enums from '../ENUMS';
import { IItem } from '../item/item.interface';


export function itemGenerator(id : number) {
  const item = <IItem>{
    _id: id,
    category: enums.ItemCategory.FURNITURE,
    name: 'Item1',
    description:'this is a table for a workstation',
    sizes: enums.ItemSizes.NONE,
  };
  return item;
}

function getRandomCategory() {
  console.log(enums.ItemSizes[getRandomInt(3)]);
  return enums.ItemSizes[getRandomInt(3)];
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
