import { ProjectRepository } from './index';
import { UserModel, IUser } from '../models/userModel';

export const userFacade = ProjectRepository<IUser>(UserModel)
