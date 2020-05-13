import * as express from 'express'

import { userService } from '../services/userService';

const userRouter = express.Router()

userRouter.route('/')
  .get(userService.getUsers)
  .post(userService.addUser)

userRouter.route('/:id')
  .delete(userService.removeUser)

export default userRouter
