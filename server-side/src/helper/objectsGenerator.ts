
import * as enums from '../ENUMS';
import { IItem } from '../item/item.interface';
import { itemsModel } from '../item/item.model';
import { ItemManager } from '../item/item.manager';

export function itemGenerator(
  myId : Number,
  myName: string,
  myCategory: enums.ItemCategory,
  myDescription: string,
  mySizes: enums.ItemSizes) {
    
  const item = {
    _id: myId,
    category: myCategory,
    name: myName,
    description: myDescription,
    sizes: mySizes,
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
