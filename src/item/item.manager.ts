
import * as mongoose from 'mongoose'; 
import { itemSchema, itemsModel } from './item.model'; 
import { IItem } from './item.interface';


mongoose.Promise = global.Promise;

export class ItemManager {
  
  public static getItemById(myId : String) {
    try {
      return itemsModel.findOne({ id: myId });
    } catch (exception) {
      return Promise.reject(exception);
    }
  }

  public static getItemByName (myName : String) {
    try {
      return itemsModel.findOne({ name: myName });
    } catch (exception) {
      return Promise.reject(exception);
    }
  }
  
  public static getAllItems() {
    try {
      return itemsModel.find({});
    } catch (exception) {
      return Promise.reject(exception);
    }
  }

  public static addItem = (newItem) => {
    return newItem.save();
  }

  
  // public static addItem(newItem, callback) {
  //   try {
  //     // console.log("Im here " + item.category);
  //     // const newItem = new itemsModel({
  //     //   category:item.category,
  //     //   name:item.name,
  //     //   description: item.description,
  //     //   sizes:item.sizes,  
  //     // });
  //     console.log('Im here  ' + newItem.category);
  //     newItem.save(callback);
  //   } catch (exception) {
  //     return Promise.reject(exception);
  //   }
  // }
  
  
}

