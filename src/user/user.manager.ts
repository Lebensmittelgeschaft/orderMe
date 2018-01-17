import * as mongoose from 'mongoose'; 
import { userSchema, usersModel } from './user.model'; 
import { IUser } from './user.interface';
import {  } from '../../ENUMS';

export class UserManager{
  
  public static getUserById(myId : Number) {
    try {
      return usersModel.findOne({ id: myId });
    } catch (exception) {
      console.log('EXCEPTION: ' + exception);
      return Promise.reject(exception);
    }
  }
  
  public static getUserByName (myFirstName : String, myLastName : String) {
    try {
      return usersModel.findOne({ firstName: myFirstName, lastName: myLastName });
    } catch (exception) {
      return Promise.reject(exception);
    }
  }
  
  public static getAllUsers () {
    try {
      return usersModel.find({});
    } catch (exception) {
      return Promise.reject(exception);
    }
  }
  
  public static addUser = (newUser) => {
    try {
      return newUser.save();
    } catch (exception) {
      return Promise.reject(exception);
    }
  }
  
  public static deleteUserById = (myId: Number) => {
    try {
      return usersModel.remove({ id : myId });
    } catch (exception) {
      return Promise.reject(exception);
    }
  }
  // Should be used only indevelopment!
  public static deleteAllUsers = () => {
    try {
      return usersModel.remove({});
    } catch (exception) {
      return Promise.reject(exception);
    }
  }
  
  
}
