// Require the express package and use express.Router()
const express = require('express');
const router = express.Router();
const items = require('../models/item.ts');
 

// GET HTTP method to /items
router.get('/', (req, res) => {
  items.getAllItems((err, lists) => {
    if (err) {
      res.json({ success:false, message: `Failed to load all lists. Error: ${err}` });
    } else {
      res.write(JSON.stringify({ success: true, lists: { lists } }, null, 2));
      res.end();
    }
  });
});

// GET HTTP method to /items
router.get('/:id', (req, res) => {
  items.getItemById(
    (err, ret) => {
      if (err) {
        res.json({ success:false, message: `Failed to load the item. Error: ${err}` });
      } else {
        res.write(JSON.stringify({ success:true, item: ret }), null, 2);
        res.end();
      }
    },
    req.params.id);
});
router.post('/', (req,res,next) => {
  res.send('POST Page');
  
});

// DELETE HTTP method to /bucketlist. Here, we pass in a params which is the object id.
router.delete('/:id', (req,res,next) => {
  res.send('DELETE Page');
});

module.exports = router;
  
router.post('/', (req, res, next) => {
  const newList = new items({
    category:req.body.category,
    name:req.body.name,
    description: req.body.description,
    sizes:req.body.sizes,  
  });
  items.addItem(newList, (err, list) => {
    if (err) {
      res.json({ success: false, message: `Failed to create a new list. Error: ${err}` });
    }else {
      res.json({ success:true, message: 'Added successfully.' });
    }
  });
});
  
  
router.delete('/:id', (req, res, next) => {
  // access the parameter which is of the item to be deleted
  const id = req.params.id;
  // Call the model method deleteListById
  items.deleteListById(id, (err, list) => {
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
  
router.get('/',(req,res) => {
  res.send('This is the GET Page');
});
  
  // POST HTTP method to /bucketlist
  
router.post('/', (req,res,next) => {
  res.send('POST Page');
  
});

// DELETE HTTP method to /bucketlist. Here, we pass in a params which is the object id.
router.delete('/:id', (req,res,next) => {
  res.send('DELETE Page');
});

module.exports = router;
