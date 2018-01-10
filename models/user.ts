const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
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

const users = module.exports = mongoose.model('Users', userSchema);

// //Items.find() returns all the lists
module.exports.getAllUsers = (callback) => {
  users.find(callback);
};


// //newList.save is used to insert the document into MongoDB
// module.exports.addList = (newList, callback) => {
//     newList.save(callback);
// }


// //Here we need to pass an id parameter to BUcketList.remove
// module.exports.deleteListById = (id, callback) => {
//     let query = {_id: id};
//     Items.remove(query, callback);
// }
