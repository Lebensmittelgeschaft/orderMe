
import { routeEnum } from '../ENUMS';
import { userRouter } from '../user/user.router';
import { itemRouter } from '../item/item.router';
import { orderRouter } from '../order/order.router';


export function initRouting(app) {
  app.use(routeEnum.USERS, userRouter);
  app.use(routeEnum.ITEMS, itemRouter);
  app.use(routeEnum.ORDERS, orderRouter);
  
  app.get('/', (req,res) => {
    res.send('Invalid page');
  });
}


