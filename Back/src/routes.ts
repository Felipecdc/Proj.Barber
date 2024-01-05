import { Router, Request, Response } from 'express';
import multer from 'multer';

import { CreateUserController } from './Controllers/user/CreateUserController';
import { DeleteUserController } from './Controllers/user/DeleteUserController';
import { DetailUserController } from './Controllers/user/DetailUserController';
import { AuthUserController } from './Controllers/user/AuthUserController';
import { UpdateUserController } from './Controllers/user/UpdateUserController';
import { ListUserController } from './Controllers/user/ListUserController';

import { CreateServicesController } from './Controllers/services/CreateServicesController';
import { ListServicesController } from './Controllers/services/ListServicesController';
import { UpdateServicesController } from './Controllers/services/UpdateServicesController';

import { CreateEmployeeController } from './Controllers/employee/CreateEmployeeController';
import { ListEmployeeController } from './Controllers/employee/ListEmployeeController';
import { DeleteEmployeeController } from './Controllers/employee/DeleteEmployeeController';

import { CreateOrdersController } from './Controllers/Orders/CreateOrdersController';
import { LIstOrdersController } from './Controllers/Orders/LIstOrdersController';
import { SendOrdersController } from './Controllers/Orders/SendOrdersController';
import { DeleteOrdersController } from './Controllers/Orders/DeleteOrdersController';

import { isAuthenticated } from './middlwares/isAuthenticated';

import uploadConfig from './config/multer';

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

// -- Rotas Users --
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.delete('/user', isAuthenticated, new DeleteUserController().handle);
router.put('/user/:user_id', isAuthenticated, upload.single('file'), new UpdateUserController().handle);
router.get('/users/list', isAuthenticated, new ListUserController().handle);

// -- Rotas Details -- 
router.get('/me', isAuthenticated, new DetailUserController().handle);

// -- Rotas Services --
router.post('/services', isAuthenticated, new CreateServicesController().handle);
router.get('/services', isAuthenticated, new ListServicesController().handle);
router.put('/services', isAuthenticated, new UpdateServicesController().handle);

// -- Rotas Employee --
router.post('/employee', isAuthenticated, new CreateEmployeeController().handle);
router.get('/employee', isAuthenticated, new ListEmployeeController().handle);
router.delete('/employee', isAuthenticated, new DeleteEmployeeController().handle);

// -- Rotas Orders --
router.post('/orders', isAuthenticated, new CreateOrdersController().handle);
router.get('/orders', isAuthenticated, new LIstOrdersController().handle);
router.put('/order/send', isAuthenticated, new SendOrdersController().handle);
router.delete('/order', isAuthenticated, new DeleteOrdersController().handle);

export { router };
