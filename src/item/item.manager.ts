
import * as mongoose from 'mongoose'; 
import { itemSchema, itemsModel } from './item.model'; 
import { IItem } from './item.interface';


mongoose.Promise = global.Promise;

export class ItemManager {
  
  public static getItemById(id : string) {
    try {
      return itemsModel.findOne({ _id: id });
    } catch (exception) {
      return Promise.reject(exception);
    }
  }

  public static getItemByName (myName : string) {
    try {
      return itemsModel.findOne({ name: myName });
    } catch (exception) {
      return Promise.reject(exception);
    }
  }
  
  public static getAllItems(id : string) {
    try {
      return itemsModel.findOne({});
    } catch (exception) {
      return Promise.reject(exception);
    }
  }

  public static addItem = (newItem, callback) => {
    console.log('hello22');
    newItem.save(callback);
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

// Items.find() returns all the lists
const getAllItems = (callback) => {
  itemsModel.find(callback);
};

// Return item by its id
const getItemById = (callback, id) => {
  itemsModel.find({ _id: id },callback);
};

// newList.save is used to insert the document into MongoDB
const addItem = (newItem, callback) => {
  newItem.save(callback);
};

// Here we need to pass an id parameter to Items.remove
const deleteItemById = (id, callback) => {
  const query = { _id: id };
  itemsModel.remove(query, callback);
};

const deleteAllItems = (callback) => {
  itemsModel.remove({}, callback);
};

export const itemMethods = {
  getAllItems,
  getItemById,
  addItem,
  deleteItemById,
  deleteAllItems,
};
