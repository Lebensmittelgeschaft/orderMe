
import * as express from 'express'; 

import { itemsModel, itemMethods } from './item.model'; 


export const itemRouter: express.Router = express.Router();


itemRouter.get('/', (req, res) => {
  itemMethods.getAllItems((err, ret) => {
    errorHandler(res, err, ret);
    console.log('res: ' + res + 'ret: ' + ret);
  });
});


// GET HTTP method
itemRouter.get('/:id', (req, res) => {
  itemMethods.getItemById(
    (err, ret) => {
      errorHandler(res, err, ret);
    },
    req.params.id);
});

itemRouter.post('/', (req, res, next) => {
  const newItem = new itemsModel({
    category:req.body.category,
    name:req.body.name,
    description: req.body.description,
    sizes:req.body.sizes,  
  }); 

  itemMethods.addItem(newItem, (err, list) => {
    if (err) {
      res.json({ success:false, message: `Failed to create a new list. Error: ${err}` });
    }else {
      res.json({ success:true, message: 'Added successfully.' });
    }
  });
});

itemRouter.delete('/:id', (req, res, next) => {
  // access the parameter which is of the item to be deleted
  const id = req.params.id;
  // Call the model method deleteListById
  itemMethods.deleteItemById(id, (err, list) => {
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
    res.json({ success:false, message: `Failed to load the item. Error: ${err}` });
  } else {
    res.write(JSON.stringify({ success:true, returned: ret }, null, 2));
    res.end();
  }
}
