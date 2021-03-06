
import * as mongoose from 'mongoose'; 
import { itemSchema, itemsModel } from './item.model'; 
import { IItem } from './item.interface';
import { ItemCategory } from '../ENUMS';


mongoose.Promise = global.Promise;

export class ItemManager {
  
  public static getItemById(myId : Number) {
    try {
      return itemsModel.findOne({ _id: myId });
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

  public static getAllItemsByCategory(mycategory: ItemCategory) {
    try {
      return itemsModel.find({ category: mycategory });
    } catch (exception) {
      return Promise.reject(exception);
    }
  }

  public static addItem = (newItem) => {
    try {
      return newItem.save();
    } catch (exception) {
      return Promise.reject(exception);
    }
  }

  public static updateItem = (myId: Number, newItem: Partial<IItem>) => {
    try {
      // {new:true} mesans to return the new value instead of the old one.
      return itemsModel.findOneAndUpdate({ _id: myId }, newItem, { new : true });
    } catch (exception) {
      return Promise.reject(exception);
    }
  }
  
  public static deleteItemById = (myId: Number) => {
    try {
      return itemsModel.remove({ _id : myId });
    } catch (exception) {
      return Promise.reject(exception);
    }
  }
  
  public static deleteAllItems = () => {
    try {
      return itemsModel.remove({});
    } catch (exception) {
      return Promise.reject(exception);
    }
  }
}

