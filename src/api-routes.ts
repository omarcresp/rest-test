import * as express from 'express'

import userController from './controllers/userController';

const router = express.Router();

router.use('/user', userController)

export default router
