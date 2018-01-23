
import * as enums from '../ENUMS';
import { IItem } from '../item/item.interface';
import { itemsModel } from '../item/item.model';
import { ItemManager } from '../item/item.manager';

export function itemGenerator(id : Number) {
  const item = {
    _id: id,
    category: enums.ItemCategory.FURNITURE,
    name: 'Item1',
    description:'this is a table for a workstation',
    sizes: enums.ItemSizes.NONE,
  };
  console.log('adding item');
  ItemManager.addItem(new itemsModel(item));
  return item;
}

function getRandomCategory() {
  console.log(enums.ItemSizes[getRandomInt(3)]);
  return enums.ItemSizes[getRandomInt(3)];
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
