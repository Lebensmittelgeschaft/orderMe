import * as mongoose from 'mongoose';
import { IUser } from './user.interface';

export const userSchema = new mongoose.Schema({
  orders:{
    type: [String],
    required: true, 
  },
  isOfficer:{ 
    type: Boolean, 
    requires: true,
  },
  isAdmin: { 
    type: Boolean, 
    requires: true,
  },
});


export const usersModel = mongoose.model<IUser>('Users', userSchema);

// Users.find() returns all the lists
const getAllUsers = (callback) => {
  usersModel.find(callback);
};

// Return user by its id
const getUserById = (callback, id) => {
  usersModel.find({ _id: id },callback);
};

// newList.save is used to insert the document into MongoDB
const addUser = (newList, callback) => {
  newList.save(callback);
};

// Here we need to pass an id parameter to Users.remove
const deleteUserById = (id, callback) => {
  const query = { _id: id };
  usersModel.remove(query, callback);
};

export const userMethods = {
  getAllUsers,
  getUserById,
  addUser,
  deleteUserById,
};
