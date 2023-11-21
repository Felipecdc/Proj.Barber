import { Router, Request, Response } from 'express';

import { CreateUserController } from './Controllers/user/CreateUserController';
import { CreateServicesController } from './Controllers/services/CreateServicesController';
import { CreateEmployeeController } from './Controllers/employee/CreateEmployeeController';
import { AuthUserController } from './Controllers/user/AuthUserController';
import { DetailUserController } from './Controllers/user/DetailUserController';

import { isAuthenticated } from './middlwares/isAuthenticated';

const router = Router();

// -- Rotas Users --
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);

// -- Rotas Services --
router.post('/services', isAuthenticated, new CreateServicesController().handle);

// -- Rotas Employee --
router.post('/employee', isAuthenticated, new CreateEmployeeController().handle);

// -- Rotas Details -- 
router.get('/me', isAuthenticated, new DetailUserController().handle)

export { router };