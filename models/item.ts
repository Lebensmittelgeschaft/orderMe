
const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  category:{
    type: String,
    required: true,
    enum:['Clothing', 'Furniture', 'Other'],
  },
  name:{
    type: String,
    reqired: true,
  },
  description: {
    type: String,
    required: true,
  },
  sizes:{
    type: String,
    enum:['S', 'M', 'L'],
    required: {function () {
      return this.category === 'Clothing';
    }},       
  },
});



export const itemsModel = mongoose.model('Items', itemSchema);

// Items.find() returns all the lists
const getAllItems = (callback) => {
  itemsModel.find(callback);
};

// Return item by its id
const getItemById = (callback, id) => {
  itemsModel.find({ _id: id },callback);
};

// newList.save is used to insert the document into MongoDB
const addItem = (newList, callback) => {
  newList.save(callback);
};

// Here we need to pass an id parameter to Items.remove
const deleteItemById = (id, callback) => {
  const query = { _id: id };
  itemsModel.remove(query, callback);
};

export const itemMethods = {
  getAllItems,
  getItemById,
  addItem,
  deleteItemById,
};

