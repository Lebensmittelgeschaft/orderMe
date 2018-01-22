
import * as express from 'express'; 

import { ordersModel } from './order.model'; 
import { OrderManager } from './order.manager';
export const orderRouter: express.Router = express.Router();

orderRouter.get('/', async (req, res) => {
  const ret = await OrderManager.getAllOrders();
  for (const order in ret) {
  }
  res.write(JSON.stringify({ success:true, returned: ret }, null, 2));
  res.end();
});

orderRouter.get('/:id', (req, res) => {
  OrderManager.getOrderById(req.params.id);
});

orderRouter.post('/', (req, res, next) => {
  const newOrder = new ordersModel({
    id: req.body.id,
    date: req.body.date,
    itemsIds: req.body.itemsIds,
    status: req.body.status,
  }); 
  OrderManager.addOrder(newOrder);
});

orderRouter.delete('/:id', (req, res, next) => {
  // access the parameter which is of the order to be deleted
  const id = req.params.id;
  OrderManager.deleteOrderById(id);
});

function errorHandler(res, err, ret) {
  if (err) {
    res.json({ success:false, message: `Failed to load the order. Error: ${err}` });
  } else {
    res.write(JSON.stringify({ success:true, returned: ret }, null, 2));
    res.end();
  }
}
