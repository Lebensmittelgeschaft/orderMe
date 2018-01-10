//Require the express package and use express.Router()
const express = require('express');
const router = express.Router();
const bucketlist = require('../models/list');


// GET HTTP method to /bucketlist
router.get('/', (req, res) =>{
    bucketlist.getAllLists((err, lists) => {
        if(err){
            res.json({success:false, message: `Failed to load all lists. Error: ${err}`});
        } else {
            res.write(JSON.stringify({success: true, lists: lists}, null, 2));
            res.end();
        }
    });
});


router.post('/', (req, res, next) => {
    let newList = new bucketlist({
        title: req.body.title, 
        description: req.body.description,
        category: req.body.category
    });
    bucketlist.addList(newList, (err, list) => {
        if(err){
            res.json({success: false, message: `Failed to create a new list. Error: ${err}`});
        }else{
            res.json({success:true, message: "Added successfully."});
        }
    });
});


router.delete('/:id', (req, res, next) => {
    //access the parameter which is of the item to be deleted
    let id = req.params.id;
    //Call the model method deleteListById
    bucketlist.deleteListById(id, (err, list) => {
        if(err) {
            res.json({success: false, message: `Failed to delete the element from the list. Error: ${err}`});
        }
        else if(list){
            res.json({success: true, message: "Deleted successfully"});
        } else{
            res.json({success: false});
        }
    });
});

// //GET HTTP method to /bucketlist
// router.get('/',(req,res) => {
//     res.send("This is the GET Page");
// });

//POST HTTP method to /bucketlist

router.post('/', (req,res,next) => {
    res.send("POST Page");
    
});

//DELETE HTTP method to /bucketlist. Here, we pass in a params which is the object id.
router.delete('/:id', (req,res,next)=> {
    res.send("DELETE Page");
    
})

module.exports = router;



