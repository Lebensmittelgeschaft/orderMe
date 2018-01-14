
import * as express from 'express'; 
import { itemsModel } from '../models/item'; 
import { usersModel } from '../models/user'; 
import { routeEnum } from '../ENUMS'; 
import { controller } from './controller'; 

const router: express.Router = express.Router();

export const getRouter  = (x: routeEnum) => {

  console.log('gigity ' + x);

  // const genericModel = (x === routeEnum.ITEMS) ? itemsModel : usersModel;
  const genericController = controller(x);
  // GET HTTP method
  router.get('/', (req, res) => {
    genericController.getAll((err, ret) => {
      errorHandler(res, err, ret);
      console.log('res: ' + res + 'ret: ' + ret);
    });
  });

  // GET HTTP method
  router.get('/:id', (req, res) => {
    genericController.getById(
      (err, ret) => {
        errorHandler(res, err, ret);
        
      },
      req.params.id);
  });

  router.post('/', (req, res, next) => {
    const newList = (x === routeEnum.ITEMS) ? 
    new itemsModel({
      category:req.body.category,
      name:req.body.name,
      description: req.body.description,
      sizes:req.body.sizes,  
    }) 
    : 
    new usersModel({
      orders:req.body.orders,
      isOfficer:req.body.isOfficer,
      isAdmin: req.body.isAdmin,
    });

    genericController.add(newList, (err, list) => {
      if (err) {
        res.json({ success:false, message: `Failed to create a new list. Error: ${err}` });
      }else {
        res.json({ success:true, message: 'Added successfully.' });
      }
    });
  });

  router.delete('/:id', (req, res, next) => {
    // access the parameter which is of the item to be deleted
    const id = req.params.id;
    // Call the model method deleteListById
    genericController.deleteById(id, (err, list) => {
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
  return router;

  function errorHandler(res, err, ret) {
    if (err) {
      res.json({ success:false, message: `Failed to load the item. Error: ${err}` });
    } else {
      res.write(JSON.stringify({ success:true, returned: ret }, null, 2));
      res.end();
    }
  }
  
}; 

