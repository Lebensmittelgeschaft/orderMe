
import * as express from 'express'; 

import { usersModel, userMethods } from './user.model'; 


export const userRouter: express.Router = express.Router();


userRouter.get('/', (req, res) => {
  userMethods.getAllUsers((err, ret) => {
    errorHandler(res, err, ret);
    console.log('res: ' + res + 'ret: ' + ret);
  });
});

// GET HTTP method
userRouter.get('/:id', (req, res) => {
  userMethods.getUserById(
    (err, ret) => {
      errorHandler(res, err, ret);
    },
    req.params.id);
});

userRouter.post('/', (req, res, next) => {
  const newList = new usersModel({
    category:req.body.category,
    name:req.body.name,
    description: req.body.description,
    sizes:req.body.sizes,  
  }); 

  userMethods.addUser(newList, (err, list) => {
    if (err) {
      res.json({ success:false, message: `Failed to create a new list. Error: ${err}` });
    }else {
      res.json({ success:true, message: 'Added successfully.' });
    }
  });
});

userRouter.delete('/:id', (req, res, next) => {
  // access the parameter which is of the User to be deleted
  const id = req.params.id;
  // Call the model method deleteListById
  userMethods.deleteUserById(id, (err, list) => {
    if (err) {
      res.json({
        success: false, 
        message: `Failed to delete the element from the list. Error: ${err}`});
    } else if (list) {
      res.json({ success: true, message: 'Deleted successfully' });
    } else {
      res.json({ success: false });
    }
  });
});




function errorHandler(res, err, ret) {
  if (err) {
    res.json({ success:false, message: `Failed to load the User. Error: ${err}` });
  } else {
    res.write(JSON.stringify({ success:true, returned: ret }, null, 2));
    res.end();
  }
}
