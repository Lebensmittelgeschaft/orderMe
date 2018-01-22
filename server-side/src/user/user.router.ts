
import * as express from 'express'; 

import { usersModel, userMethods } from './user.model'; 
import { UserManager } from './user.manager';

export const userRouter: express.Router = express.Router();


userRouter.get('/', async (req, res) => {
  const ret = await UserManager.getAllUsers();
  res.write(JSON.stringify({ success:true, returned: ret }, null, 2));
  res.end();
});

// GET HTTP method
userRouter.get('/:id', (req, res) => {
  UserManager.getUserById(req.params.id);
});

userRouter.post('/', (req, res, next) => {
  const newUser = new usersModel({
    id: req.body.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    orders: [],
    isOfficer: req.body.isOfficer,
    isAdmin: req.body.isAdmin,
  }); 
  UserManager.addUser(newUser);
});

userRouter.delete('/:id', (req, res, next) => {
  // access the parameter which is of the user to be deleted
  const id = req.params.id;
  UserManager.deleteUserById(id);
});

function errorHandler(res, err, ret) {
  if (err) {
    res.json({ success:false, message: `Failed to load the user. Error: ${err}` });
  } else {
    res.write(JSON.stringify({ success:true, returned: ret }, null, 2));
    res.end();
  }
}
