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
    enum: ['S', 'M', 'L'],
    required: {function () {
      return this.category = 'Clothing';
    }},       
  },
});

const items = module.exports = mongoose.model('Items', itemSchema);

// Items.find() returns all the lists
module.exports.getAllItems = (callback) => {
  items.find(callback);
  items.find(
    { _id: '5a56377cc4ea9c0a904c5a7b' }, { _id:1 },
    (err, docs) => { console.log(docs); });
};

// newList.save is used to insert the document into MongoDB
module.exports.addItem = (newList, callback) => {
  newList.save(callback);
};


// Here we need to pass an id parameter to Items.remove
module.exports.deleteItemById = (id, callback) => {
  const query = { _id: id };
  items.remove(query, callback);
};
