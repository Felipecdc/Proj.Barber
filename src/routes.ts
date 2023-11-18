import { Router, Request, Response } from 'express';

import { CreateUserController } from './Controllers/user/CreateUserController';
import { CreateServicesController } from './Controllers/services/CreateServicesController';
import { CreateEmployeeController } from './Controllers/employee/CreateEmployeeController';

const router = Router();

// -- Rotas Users --
router.post('/users', new CreateUserController().handle);

// -- Rotas Services --
router.post('/services', new CreateServicesController().handle);

// -- Rotas Employee --
router.post('/employee', new CreateEmployeeController().handle);

export { router };