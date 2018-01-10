const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
    category:{
        type: String,
        required: true,
        enum:['Clothing', 'Furniture', 'Other']
    },
    name:{
        type: String,
        reqired: true
    },
    description: {
        type: String,
        required: true
    },
    sizes:{
        type: String,
        enum: ['S', 'M', 'L'],
        required: function() {
          return this.category = 'Clothing';
        }       
    }
});

const Items = module.exports = mongoose.model('Items', ItemSchema);

//BucketList.find() returns all the lists
module.exports.getAllLists = (callback) => {
    Items.find(callback);
}

//newList.save is used to insert the document into MongoDB
module.exports.addList = (newList, callback) => {
    newList.save(callback);
}


//Here we need to pass an id parameter to BUcketList.remove
module.exports.deleteListById = (id, callback) => {
    let query = {_id: id};
    Items.remove(query, callback);
}