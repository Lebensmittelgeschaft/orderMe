import * as mongoose from 'mongoose';
import { usersModel } from '../models/user';
import { itemsModel } from '../models/item';
import { routeEnum } from '../ENUMS'; 

export const controller  = (x: routeEnum) => {
  let model;
  switch (x){
    case routeEnum.ITEMS: {
      console.log('itemsModel!');
      model = itemsModel;
      break;
    }
    case routeEnum.USERS: {
      console.log('usersModel!');
      model = usersModel;
      break;
    }
  }
  // find() returns all the lists
  const getAll = (callback) => {
    model.find(callback);
  };
  
  // Return object by its id
  const getById = (callback, id) => {
    model.find({ _id: id },callback);
  };
  
  // newList.save is used to insert the document into MongoDB
  const add = (newList, callback) => {
    newList.save(callback);
  };
  
  // Here we need to pass an id parameter to remove()
  const deleteById = (id, callback) => {
    const query = { _id: id };
    model.remove(query, callback);
  };

  return {
    getAll,
    getById,
    add,
    deleteById,
  };
};
