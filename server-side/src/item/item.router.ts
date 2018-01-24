
import * as express from 'express'; 

import { itemsModel } from './item.model'; 
import { ItemManager } from './item.manager';

export const itemRouter: express.Router = express.Router();


itemRouter.get('/', async (req, res) => {
  const ret = await ItemManager.getAllItems();
  res.write(JSON.stringify({ success:true, returned: ret }, null, 2));
  res.end();
});

// GET HTTP method
itemRouter.get('/:id', (req, res) => {
  ItemManager.getItemById(req.params.id);
});

itemRouter.post('/', async (req, res, next) => {
  const newItem = new itemsModel({
    _id: req.body.id,
    category:req.body.category,
    name:req.body.name,
    description: req.body.description,
    sizes:req.body.sizes,  
  }); 
  const item = await ItemManager.addItem(newItem);
  if (item) {
    res.sendStatus(200);
  }else {
    res.sendStatus(500);
  }
});

itemRouter.delete('/:id', (req, res, next) => {
  // access the parameter which is of the item to be deleted
  const id = req.params.id;
  ItemManager.deleteItemById(id);
});

function errorHandler(res, err, ret) {
  if (err) {
    res.json({ success:false, message: `Failed to load the item. Error: ${err}` });
  } else {
    res.write(JSON.stringify({ success:true, returned: ret }, null, 2));
    res.end();
  }
}
